import type { Session } from 'next-auth';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';

type AuthenticatedSession = Session & {
  user: NonNullable<Session['user']> & {
    id: string;
  };
};

export async function getOptionalSession() {
  return auth();
}

export async function getRequiredSession() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/sign-in?callbackUrl=/dashboard');
  }

  return session as AuthenticatedSession;
}
