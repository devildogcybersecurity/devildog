import type { Metadata } from 'next';
import '@/styles/globals.css';

import { SiteFooter } from '@/features/site/components/SiteFooter';
import { SiteHeader } from '@/features/site/components/SiteHeader';
import {
  buildPageMetadata,
  getOrganizationJsonLd,
  getWebsiteJsonLd,
} from '@/features/site/seo';
import {
  footerContact,
  footerLinkGroups,
  navigationGroups,
  primaryNavigation,
  siteMetadata,
  socialLinks,
} from '@/features/site/siteContent';

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  applicationName: siteMetadata.name,
  authors: [{ name: siteMetadata.name }],
  creator: siteMetadata.name,
  publisher: siteMetadata.name,
  category: 'cybersecurity',
  robots: {
    index: true,
    follow: true,
  },
  ...buildPageMetadata({
    description: siteMetadata.description,
    path: '/',
    imagePath: siteMetadata.defaultOgImage,
    imageAlt: 'DevilDog Cybersecurity homepage preview',
  }),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = [getOrganizationJsonLd(), getWebsiteJsonLd()];

  return (
    <html lang="en">
      <body>
        {structuredData.map((item) => (
          <script
            key={item['@id']}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          />
        ))}
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
