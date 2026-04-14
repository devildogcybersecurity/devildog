import type { Metadata } from 'next';

import { ContactPage } from '@/features/contact/components/ContactPage';
import { buildPageMetadata } from '@/features/site/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact DevilDog',
  description:
    'Send DevilDog Cybersecurity a message about compliance, monitoring, cloud, training, or executive protection needs.',
  path: '/contact',
  imagePath: '/images/devildog/pages/compliance.jpg',
  imageAlt: 'Contact DevilDog Cybersecurity',
});

export default function ContactRoute() {
  return <ContactPage />;
}
