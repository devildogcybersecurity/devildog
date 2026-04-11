import Link from 'next/link';

import { SignInButtons } from '@/components/auth/SignInButtons';
import { AppShell } from '@/components/ui/AppShell';
import { getAuthProviderDescriptors } from '@/lib/auth/providerConfig';

type SignInPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const resolvedSearchParams = await searchParams;
  const callbackUrl = resolvedSearchParams.callbackUrl ?? '/dashboard';
  const providerDescriptors = getAuthProviderDescriptors();
  const configuredProviders = providerDescriptors.filter((provider) => provider.configured);

  return (
    <AppShell
      title="Sign in"
      description="Use one of the configured providers to access the protected app starter."
    >
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          {configuredProviders.length > 0 ? (
            <>
              <p className="mb-4 text-sm text-neutral-600">
                The template is configured to use database-backed Auth.js sessions with
                provider-based sign-in.
              </p>
              <SignInButtons
                callbackUrl={callbackUrl}
                providers={configuredProviders.map((provider) => ({
                  id: provider.id,
                  name: provider.name,
                }))}
              />
            </>
          ) : (
            <div className="space-y-3 text-sm text-neutral-700">
              <p className="font-medium text-neutral-900">No OAuth provider is configured yet.</p>
              <p>
                This starter already wires Auth.js and route protection. Add provider credentials
                to your local `.env` file and restart the app to enable sign-in.
              </p>
              <p>
                You can keep exploring the public template from the{' '}
                <Link href="/" className="font-medium text-neutral-900 underline">
                  home page
                </Link>
                .
              </p>
            </div>
          )}
        </section>

        <aside className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-700">
            Provider checklist
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-neutral-600">
            {providerDescriptors.map((provider) => (
              <li key={provider.id}>
                <p className="font-medium text-neutral-900">{provider.name}</p>
                <p>{provider.configured ? 'Configured' : provider.envKeys.join(', ')}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </AppShell>
  );
}
