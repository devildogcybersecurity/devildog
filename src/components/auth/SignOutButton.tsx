import { signOutAction } from '@/server/auth/actions';

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50"
      >
        Sign out
      </button>
    </form>
  );
}
