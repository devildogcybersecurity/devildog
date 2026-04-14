import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const canonicalHost = 'devildogcyber.com';
const redirectFromHost = 'www.devildogcyber.com';

function getRequestHost(request: NextRequest) {
  const forwardedHost = request.headers.get('x-forwarded-host');
  const hostHeader = forwardedHost ?? request.headers.get('host') ?? '';
  const firstHost = hostHeader.split(',')[0]?.trim().toLowerCase() ?? '';

  return firstHost.split(':')[0] ?? '';
}

export function proxy(request: NextRequest) {
  if (getRequestHost(request) !== redirectFromHost) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.protocol = 'https';
  redirectUrl.hostname = canonicalHost;
  redirectUrl.port = '';

  return NextResponse.redirect(redirectUrl, 308);
}
