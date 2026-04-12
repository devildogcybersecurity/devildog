import type { ContactFormInput } from '@/features/contact/contactValidation';

const sendGridApiUrl = 'https://api.sendgrid.com/v3/mail/send';
const defaultFromName = 'DevilDog Cybersecurity Website';

type ContactEmailInput = Omit<ContactFormInput, 'turnstileToken'>;

type SendGridConfig = {
  apiKey: string;
  fromEmail: string;
  toEmail: string;
  fromName: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function getSendGridConfig() {
  const apiKey = process.env.SENDGRID_API_KEY?.trim() ?? '';
  const fromEmail = process.env.SENDGRID_FROM_EMAIL?.trim() ?? '';
  const toEmail = process.env.CONTACT_EMAIL_TO?.trim() ?? '';

  const missing = [
    !apiKey ? 'SENDGRID_API_KEY' : null,
    !fromEmail ? 'SENDGRID_FROM_EMAIL' : null,
    !toEmail ? 'CONTACT_EMAIL_TO' : null,
  ].filter(Boolean) as string[];

  if (missing.length > 0) {
    return {
      isConfigured: false as const,
      missing,
    };
  }

  return {
    isConfigured: true as const,
    config: {
      apiKey,
      fromEmail,
      toEmail,
      fromName: defaultFromName,
    } satisfies SendGridConfig,
  };
}

function buildTextBody(data: ContactEmailInput) {
  return [
    'New DevilDog website inquiry',
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.companyName}`,
    '',
    'Message:',
    data.message,
  ].join('\n');
}

function buildHtmlBody(data: ContactEmailInput) {
  const formattedMessage = escapeHtml(data.message).replaceAll('\r\n', '\n').replaceAll('\n', '<br />');

  return `
    <h1>New DevilDog website inquiry</h1>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(data.companyName)}</p>
    <p><strong>Message:</strong></p>
    <p>${formattedMessage}</p>
  `.trim();
}

export async function sendContactEmail(data: ContactEmailInput) {
  const configResult = getSendGridConfig();

  if (!configResult.isConfigured) {
    throw new Error(`Missing SendGrid configuration: ${configResult.missing.join(', ')}`);
  }

  const { apiKey, fromEmail, fromName, toEmail } = configResult.config;

  const response = await fetch(sendGridApiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: toEmail }],
          subject: `DevilDog website inquiry from ${data.name}`,
        },
      ],
      from: {
        email: fromEmail,
        name: fromName,
      },
      reply_to: {
        email: data.email,
        name: data.name,
      },
      content: [
        {
          type: 'text/plain',
          value: buildTextBody(data),
        },
        {
          type: 'text/html',
          value: buildHtmlBody(data),
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`SendGrid request failed with status ${response.status}: ${errorText}`);
  }
}
