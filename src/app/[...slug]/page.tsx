import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DetailPage } from '@/features/site/components/DetailPage';
import { detailPages, getDetailPageBySlug } from '@/features/site/detailPages';

export const dynamicParams = false;

export function generateStaticParams() {
  return detailPages.map((page) => ({
    slug: [...page.slug],
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getDetailPageBySlug(slug);

  if (!page) {
    return {};
  }

  return {
    title: `${page.title} | DevilDog Cybersecurity`,
    description: page.description,
  };
}

export default async function DetailRoutePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = getDetailPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <DetailPage page={page} />;
}
