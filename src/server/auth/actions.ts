'use server';

import { z } from 'zod';

import { signIn, signOut } from '@/auth';

const signInActionSchema = z.object({
  providerId: z.string().min(1),
  redirectTo: z.string().min(1),
});

export async function signInWithProviderAction(formData: FormData) {
  const parsedData = signInActionSchema.parse({
    providerId: formData.get('providerId'),
    redirectTo: formData.get('redirectTo'),
  });

  await signIn(parsedData.providerId, { redirectTo: parsedData.redirectTo });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
