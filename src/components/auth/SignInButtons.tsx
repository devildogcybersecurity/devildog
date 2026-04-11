import { signInWithProviderAction } from '@/server/auth/actions';

type SignInButtonsProps = {
  callbackUrl: string;
  providers: Array<{
    id: string;
    name: string;
  }>;
};

export function SignInButtons({ callbackUrl, providers }: SignInButtonsProps) {
  return (
    <div className="flex flex-col gap-3">
      {providers.map((provider) => (
        <form key={provider.id} action={signInWithProviderAction}>
          <input type="hidden" name="providerId" value={provider.id} />
          <input type="hidden" name="redirectTo" value={callbackUrl} />
          <button
            type="submit"
            className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-left text-sm font-medium text-neutral-900 transition hover:border-neutral-400 hover:bg-neutral-50"
          >
            Continue with {provider.name}
          </button>
        </form>
      ))}
    </div>
  );
}
