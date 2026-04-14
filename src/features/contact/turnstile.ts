const turnstileVerifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

type TurnstileConfig = {
  secretKey: string;
};

type TurnstileVerifyResponse = {
  success: boolean;
  hostname?: string;
  action?: string;
  challenge_ts?: string;
  cdata?: string;
  'error-codes'?: string[];
};

export function getTurnstileSiteKey() {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? '';
}

export function getTurnstileClientConfig() {
  const siteKey = getTurnstileSiteKey();

  if (!siteKey) {
    return {
      isConfigured: false as const,
      missing: ['NEXT_PUBLIC_TURNSTILE_SITE_KEY'],
    };
  }

  return {
    isConfigured: true as const,
    siteKey,
  };
}

export function getTurnstileConfig() {
  const secretKey = process.env.TURNSTILE_SECRET_KEY?.trim() ?? '';

  if (!secretKey) {
    return {
      isConfigured: false as const,
      missing: ['TURNSTILE_SECRET_KEY'],
    };
  }

  return {
    isConfigured: true as const,
    config: {
      secretKey,
    } satisfies TurnstileConfig,
  };
}

export async function verifyTurnstileToken(token: string, remoteIp?: string | null) {
  const configResult = getTurnstileConfig();

  if (!configResult.isConfigured) {
    return {
      success: false as const,
      isConfigured: false as const,
      errorCodes: configResult.missing,
    };
  }

  const body = new URLSearchParams();
  body.set('secret', configResult.config.secretKey);
  body.set('response', token);

  if (remoteIp) {
    body.set('remoteip', remoteIp);
  }

  let result: TurnstileVerifyResponse;

  try {
    const response = await fetch(turnstileVerifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    result = (await response.json()) as TurnstileVerifyResponse;
  } catch (error) {
    console.error('Turnstile verification request failed.', error);

    return {
      success: false as const,
      isConfigured: true as const,
      errorCodes: ['internal-error'],
    };
  }

  return {
    success: result.success,
    isConfigured: true as const,
    errorCodes: result['error-codes'] ?? [],
    hostname: result.hostname,
  };
}
