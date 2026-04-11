import AppleProvider from 'next-auth/providers/apple';
import AzureADProvider from 'next-auth/providers/azure-ad';
import GoogleProvider from 'next-auth/providers/google';

const providerDefinitions = [
  {
    id: 'azure-ad',
    name: 'Microsoft Entra ID',
    envKeys: [
      'MICROSOFT_ENTRA_CLIENT_ID',
      'MICROSOFT_ENTRA_CLIENT_SECRET',
      'MICROSOFT_ENTRA_TENANT_ID',
    ],
    create(env: NodeJS.ProcessEnv) {
      return AzureADProvider({
        clientId: env.MICROSOFT_ENTRA_CLIENT_ID!,
        clientSecret: env.MICROSOFT_ENTRA_CLIENT_SECRET!,
        issuer: `https://login.microsoftonline.com/${env.MICROSOFT_ENTRA_TENANT_ID!}/v2.0/`,
      });
    },
  },
  {
    id: 'google',
    name: 'Google',
    envKeys: ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'],
    create(env: NodeJS.ProcessEnv) {
      return GoogleProvider({
        clientId: env.GOOGLE_CLIENT_ID!,
        clientSecret: env.GOOGLE_CLIENT_SECRET!,
      });
    },
  },
  {
    id: 'apple',
    name: 'Apple',
    envKeys: ['APPLE_CLIENT_ID', 'APPLE_CLIENT_SECRET'],
    create(env: NodeJS.ProcessEnv) {
      return AppleProvider({
        clientId: env.APPLE_CLIENT_ID!,
        clientSecret: env.APPLE_CLIENT_SECRET!,
      });
    },
  },
] as const;

export type AuthProviderDescriptor = {
  id: (typeof providerDefinitions)[number]['id'];
  name: string;
  envKeys: readonly string[];
  configured: boolean;
};

function hasValue(value: string | undefined) {
  return Boolean(value?.trim());
}

export function getAuthProviderDescriptors(
  env: NodeJS.ProcessEnv = process.env,
): AuthProviderDescriptor[] {
  return providerDefinitions.map((definition) => ({
    id: definition.id,
    name: definition.name,
    envKeys: definition.envKeys,
    configured: definition.envKeys.every((envKey) => hasValue(env[envKey])),
  }));
}

export function getConfiguredAuthProviders(env: NodeJS.ProcessEnv = process.env) {
  return providerDefinitions
    .filter((definition) => definition.envKeys.every((envKey) => hasValue(env[envKey])))
    .map((definition) => definition.create(env));
}
