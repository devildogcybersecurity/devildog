import { NextResponse } from 'next/server';

import { getTurnstileClientConfig } from '@/features/contact/turnstile';

export const dynamic = 'force-dynamic';

export async function GET() {
  const configResult = getTurnstileClientConfig();

  return NextResponse.json(
    {
      siteKey: configResult.isConfigured ? configResult.siteKey : '',
    },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  );
}
