import { afterEach, describe, expect, it } from 'vitest';

import { getTurnstileClientConfig, getTurnstileConfig, getTurnstileSiteKey } from '@/features/contact/turnstile';

const originalSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const originalSecretKey = process.env.TURNSTILE_SECRET_KEY;

afterEach(() => {
  if (originalSiteKey === undefined) {
    delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  } else {
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = originalSiteKey;
  }

  if (originalSecretKey === undefined) {
    delete process.env.TURNSTILE_SECRET_KEY;
  } else {
    process.env.TURNSTILE_SECRET_KEY = originalSecretKey;
  }
});

describe('turnstile config', () => {
  it('reads and trims the public site key', () => {
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = '  public-site-key  ';

    expect(getTurnstileSiteKey()).toBe('public-site-key');
    expect(getTurnstileClientConfig()).toEqual({
      isConfigured: true,
      siteKey: 'public-site-key',
    });
  });

  it('reports when the public site key is missing', () => {
    delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    expect(getTurnstileClientConfig()).toEqual({
      isConfigured: false,
      missing: ['NEXT_PUBLIC_TURNSTILE_SITE_KEY'],
    });
  });

  it('reads and trims the server secret key', () => {
    process.env.TURNSTILE_SECRET_KEY = '  secret-key  ';

    expect(getTurnstileConfig()).toEqual({
      isConfigured: true,
      config: {
        secretKey: 'secret-key',
      },
    });
  });
});
