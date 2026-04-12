import type { Metadata } from 'next';

import { ContactPage } from '@/features/contact/components/ContactPage';

export const metadata: Metadata = {
  title: 'Contact DevilDog Cybersecurity',
  description:
    'Send DevilDog Cybersecurity a message about compliance, monitoring, cloud, training, or executive protection needs.',
};

export default function ContactRoute() {
  return <ContactPage />;
}
