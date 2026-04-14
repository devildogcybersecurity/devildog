import { afterEach, describe, expect, it } from 'vitest';

import { getPostmarkConfig } from '@/features/contact/postmark';

const originalServerToken = process.env.POSTMARK_SERVER_TOKEN;
const originalFromEmail = process.env.POSTMARK_FROM_EMAIL;
const originalToEmail = process.env.CONTACT_EMAIL_TO;

afterEach(() => {
  if (originalServerToken === undefined) {
    delete process.env.POSTMARK_SERVER_TOKEN;
  } else {
    process.env.POSTMARK_SERVER_TOKEN = originalServerToken;
  }

  if (originalFromEmail === undefined) {
    delete process.env.POSTMARK_FROM_EMAIL;
  } else {
    process.env.POSTMARK_FROM_EMAIL = originalFromEmail;
  }

  if (originalToEmail === undefined) {
    delete process.env.CONTACT_EMAIL_TO;
  } else {
    process.env.CONTACT_EMAIL_TO = originalToEmail;
  }
});

describe('postmark config', () => {
  it('reads and trims the Postmark email settings', () => {
    process.env.POSTMARK_SERVER_TOKEN = '  postmark-server-token  ';
    process.env.POSTMARK_FROM_EMAIL = '  sender@example.com  ';
    process.env.CONTACT_EMAIL_TO = '  inbox@example.com  ';

    expect(getPostmarkConfig()).toEqual({
      isConfigured: true,
      config: {
        serverToken: 'postmark-server-token',
        fromEmail: 'sender@example.com',
        toEmail: 'inbox@example.com',
        fromName: 'DevilDog Cybersecurity Website',
      },
    });
  });

  it('reports missing Postmark settings', () => {
    delete process.env.POSTMARK_SERVER_TOKEN;
    delete process.env.POSTMARK_FROM_EMAIL;
    delete process.env.CONTACT_EMAIL_TO;

    expect(getPostmarkConfig()).toEqual({
      isConfigured: false,
      missing: ['POSTMARK_SERVER_TOKEN', 'POSTMARK_FROM_EMAIL', 'CONTACT_EMAIL_TO'],
    });
  });
});
