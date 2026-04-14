import type { Metadata } from 'next';

import { HomePage as DevilDogHomePage } from '@/features/site/components/HomePage';
import { buildPageMetadata } from '@/features/site/seo';
import { heroContent } from '@/features/site/siteContent';

export const metadata: Metadata = buildPageMetadata({
  title: 'Turnkey Cybersecurity Solutions',
  description:
    'DevilDog Cybersecurity delivers turnkey cybersecurity, compliance, cloud, monitoring, and training solutions built for resilient operations.',
  path: '/',
  imagePath: heroContent.imageSrc,
  imageAlt: heroContent.imageAlt,
});

export default function HomePage() {
  return <DevilDogHomePage />;
}
