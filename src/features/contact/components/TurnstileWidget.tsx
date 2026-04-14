'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

type TurnstileWidgetProps = {
  errorMessage?: string;
  onTokenChange: (token: string) => void;
  onWidgetMessageChange: (message?: string) => void;
  resetCounter: number;
};

type TurnstileRenderOptions = {
  action?: string;
  callback?: (token: string) => void;
  'error-callback'?: () => void;
  'expired-callback'?: () => void;
  sitekey: string;
  theme?: 'light' | 'dark' | 'auto';
};

type TurnstileApi = {
  remove: (widgetId: string) => void;
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type TurnstileConfigState =
  | { status: 'loading'; siteKey: string }
  | { status: 'ready'; siteKey: string }
  | { status: 'missing'; siteKey: string }
  | { status: 'error'; siteKey: string };

export function TurnstileWidget({
  errorMessage,
  onTokenChange,
  onWidgetMessageChange,
  resetCounter,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const onWidgetMessageChangeRef = useRef(onWidgetMessageChange);
  const [isScriptReady, setIsScriptReady] = useState(false);
  const [configState, setConfigState] = useState<TurnstileConfigState>({
    status: 'loading',
    siteKey: '',
  });

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
    onWidgetMessageChangeRef.current = onWidgetMessageChange;
  }, [onTokenChange, onWidgetMessageChange]);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadTurnstileConfig() {
      try {
        const response = await fetch('/api/turnstile/config', {
          cache: 'no-store',
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`Turnstile config request failed with ${response.status}.`);
        }

        const result = (await response.json()) as { siteKey?: string | null };
        const siteKey = result.siteKey?.trim() ?? '';

        setConfigState(siteKey ? { status: 'ready', siteKey } : { status: 'missing', siteKey: '' });
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return;
        }

        console.error('Turnstile widget configuration could not be loaded.', error);
        setConfigState({ status: 'error', siteKey: '' });
      }
    }

    void loadTurnstileConfig();

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (
      configState.status !== 'ready' ||
      !isScriptReady ||
      !containerRef.current ||
      !window.turnstile ||
      widgetIdRef.current
    ) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: configState.siteKey,
      theme: 'light',
      action: 'contact_form',
      callback: (token) => {
        onWidgetMessageChangeRef.current(undefined);
        onTokenChangeRef.current(token);
      },
      'expired-callback': () => {
        onTokenChangeRef.current('');
        onWidgetMessageChangeRef.current('Verification expired. Please complete the challenge again.');
      },
      'error-callback': () => {
        onTokenChangeRef.current('');
        onWidgetMessageChangeRef.current('Verification could not load correctly. Please try again.');
      },
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [configState, isScriptReady]);

  useEffect(() => {
    if (resetCounter === 0 || !widgetIdRef.current || !window.turnstile) {
      return;
    }

    onTokenChangeRef.current('');
    window.turnstile.reset(widgetIdRef.current);
  }, [resetCounter]);

  if (configState.status === 'loading') {
    return (
      <div className="rounded-[1.5rem] border border-[color:var(--dd-border)] bg-[color:var(--dd-cream)] px-4 py-4 text-sm leading-7 text-[color:var(--dd-muted)]">
        Loading human verification...
      </div>
    );
  }

  if (configState.status === 'missing') {
    return (
      <div className="rounded-[1.5rem] border border-[rgba(176,17,22,0.22)] bg-[rgba(176,17,22,0.06)] px-4 py-4 text-sm leading-7 text-[color:var(--dd-copy)]">
        Cloudflare Turnstile is not configured yet. Add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` to your local `.env` or deployment environment to enable human verification.
      </div>
    );
  }

  if (configState.status === 'error') {
    return (
      <div className="rounded-[1.5rem] border border-[rgba(176,17,22,0.22)] bg-[rgba(176,17,22,0.06)] px-4 py-4 text-sm leading-7 text-[color:var(--dd-copy)]">
        Cloudflare Turnstile could not load its configuration right now. Refresh the page or verify the deployment environment settings.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setIsScriptReady(true)}
      />
      <div className="min-h-20 rounded-[1.5rem] border border-[color:var(--dd-border)] bg-[color:var(--dd-cream)] px-4 py-4">
        <div ref={containerRef} />
      </div>
      {errorMessage ? (
        <p className="text-sm font-medium text-[color:var(--dd-red-bright)]">{errorMessage}</p>
      ) : (
        <p className="text-sm leading-7 text-[color:var(--dd-muted)]">
          Complete the verification challenge before sending your message.
        </p>
      )}
    </div>
  );
}
