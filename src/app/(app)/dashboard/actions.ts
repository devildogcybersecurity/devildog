'use server';

import { revalidatePath } from 'next/cache';

import { getRequiredSession } from '@/server/auth/session';
import { createStarterProjectForUser } from '@/server/services/projectsService';

export async function createStarterProjectAction() {
  const session = await getRequiredSession();

  await createStarterProjectForUser(session.user.id);
  revalidatePath('/dashboard');
}
