import type { Metadata } from 'next';
import '@/styles/globals.css';

import { SiteFooter } from '@/features/site/components/SiteFooter';
import { SiteHeader } from '@/features/site/components/SiteHeader';
import {
  footerContact,
  footerLinkGroups,
  navigationGroups,
  primaryNavigation,
  siteMetadata,
  socialLinks,
} from '@/features/site/siteContent';

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <SiteHeader
            primaryNavigation={primaryNavigation}
            navigationGroups={navigationGroups}
          />
          <div className="flex-1">{children}</div>
          <SiteFooter
            footerLinkGroups={footerLinkGroups}
            socialLinks={socialLinks}
            contact={footerContact}
          />
        </div>
      </body>
    </html>
  );
}
