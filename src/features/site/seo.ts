import type { Metadata } from 'next';

import { footerContact, siteMetadata, socialLinks } from '@/features/site/siteContent';

type PageMetadataInput = {
  title?: string;
  description: string;
  path: string;
  imagePath?: string;
  imageAlt?: string;
  keywords?: readonly string[];
};

export function absoluteSiteUrl(path: string) {
  return new URL(path, siteMetadata.siteUrl).toString();
}

export function buildPageMetadata({
  title,
  description,
  path,
  imagePath = siteMetadata.defaultOgImage,
  imageAlt = siteMetadata.title,
  keywords,
}: PageMetadataInput): Metadata {
  const pageTitle = title ?? siteMetadata.title;

  const metadata: Metadata = {
    description,
    keywords: [...(keywords ?? siteMetadata.keywords)],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: path,
      siteName: siteMetadata.name,
      locale: siteMetadata.locale,
      type: 'website',
      images: [
        {
          url: imagePath,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [imagePath],
    },
  };

  if (title) {
    metadata.title = title;
  }

  return metadata;
}

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteMetadata.siteUrl}/#organization`,
    name: siteMetadata.name,
    url: siteMetadata.siteUrl,
    description: siteMetadata.description,
    image: absoluteSiteUrl(siteMetadata.defaultOgImage),
    logo: absoluteSiteUrl(siteMetadata.logoPath),
    email: footerContact.email,
    telephone: footerContact.phone,
    sameAs: socialLinks.map((link) => link.href),
    address: {
      '@type': 'PostalAddress',
      streetAddress: footerContact.addressLines[0],
      addressLocality: 'Denver',
      addressRegion: 'CO',
      postalCode: '80202',
      addressCountry: 'US',
    },
    areaServed: 'US',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: footerContact.phone,
        email: footerContact.email,
        areaServed: 'US',
        availableLanguage: 'en',
      },
    ],
    knowsAbout: siteMetadata.keywords,
  };
}

export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteMetadata.siteUrl}/#website`,
    url: siteMetadata.siteUrl,
    name: siteMetadata.name,
    description: siteMetadata.description,
    inLanguage: 'en-US',
    publisher: {
      '@id': `${siteMetadata.siteUrl}/#organization`,
    },
  };
}
