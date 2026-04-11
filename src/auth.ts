import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { getConfiguredAuthProviders } from '@/lib/auth/providerConfig';
import { prisma } from '@/server/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: getConfiguredAuthProviders(),
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'database',
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }

      return session;
    },
  },
});
