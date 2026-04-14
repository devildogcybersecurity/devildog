import { NextResponse } from 'next/server';

import { sendContactEmail, getPostmarkConfig } from '@/features/contact/postmark';
import { verifyTurnstileToken } from '@/features/contact/turnstile';
import { validateContactFormInput } from '@/features/contact/contactValidation';

export const runtime = 'nodejs';
const contactDeliveryFailureMessage =
  'Something went wrong while sending your message. Please try again later. If the issue persists, our team will review it.';

function getRequestIp(request: Request) {
  const cloudflareIp = request.headers.get('cf-connecting-ip');

  if (cloudflareIp) {
    return cloudflareIp;
  }

  const forwardedFor = request.headers.get('x-forwarded-for');

  if (!forwardedFor) {
    return null;
  }

  return forwardedFor.split(',')[0]?.trim() ?? null;
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      {
        message: 'The contact request could not be read. Please try again.',
      },
      { status: 400 },
    );
  }

  const validation = validateContactFormInput(payload, { requireTurnstileToken: true });

  if (!validation.isValid) {
    return NextResponse.json(
      {
        message: 'Please review the highlighted fields and try again.',
        fieldErrors: validation.errors,
      },
      { status: 400 },
    );
  }

  const turnstileResult = await verifyTurnstileToken(
    validation.data.turnstileToken,
    getRequestIp(request),
  );

  if (!turnstileResult.isConfigured) {
    console.warn('Contact form is missing Turnstile configuration.', turnstileResult.errorCodes);

    return NextResponse.json(
      {
        message: 'The contact form security check is not configured yet. Please try again after the security settings are added.',
      },
      { status: 500 },
    );
  }

  if (!turnstileResult.success) {
    const verificationMessage = turnstileResult.errorCodes.includes('timeout-or-duplicate')
      ? 'Verification expired. Please complete the challenge again.'
      : 'Verification failed. Please complete the challenge and try again.';

    return NextResponse.json(
      {
        message: verificationMessage,
        fieldErrors: {
          turnstileToken: verificationMessage,
        },
      },
      { status: 400 },
    );
  }

  const configResult = getPostmarkConfig();

  if (!configResult.isConfigured) {
    console.warn('Contact form is missing Postmark configuration.', configResult.missing);

    return NextResponse.json(
      {
        message: contactDeliveryFailureMessage,
      },
      { status: 500 },
    );
  }

  try {
    await sendContactEmail({
      name: validation.data.name,
      email: validation.data.email,
      companyName: validation.data.companyName,
      message: validation.data.message,
    });
  } catch (error) {
    console.error('Failed to send contact form email.', error);

    return NextResponse.json(
      {
        message: contactDeliveryFailureMessage,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: 'Your message has been sent. DevilDog will follow up as soon as possible.',
  });
}
