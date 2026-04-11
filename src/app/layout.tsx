import type { Metadata } from 'next';
import '@/styles/globals.css';

import { siteMetadata } from '@/features/site/siteContent';

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
