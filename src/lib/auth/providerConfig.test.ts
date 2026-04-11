import { describe, expect, it } from 'vitest';

import { getAuthProviderDescriptors } from '@/lib/auth/providerConfig';

describe('getAuthProviderDescriptors', () => {
  it('marks providers as configured only when all required env values are present', () => {
    const descriptors = getAuthProviderDescriptors({
      NODE_ENV: 'test',
      MICROSOFT_ENTRA_CLIENT_ID: 'entra-client-id',
      MICROSOFT_ENTRA_CLIENT_SECRET: 'entra-client-secret',
      MICROSOFT_ENTRA_TENANT_ID: 'entra-tenant-id',
      GOOGLE_CLIENT_ID: 'google-client-id',
    });

    expect(descriptors).toEqual([
      expect.objectContaining({
        id: 'azure-ad',
        configured: true,
      }),
      expect.objectContaining({
        id: 'google',
        configured: false,
      }),
      expect.objectContaining({
        id: 'apple',
        configured: false,
      }),
    ]);
  });
});
