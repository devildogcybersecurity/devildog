import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { buildPageMetadata } from '@/features/site/seo';
import { aboutPrinciples, storyContent } from '@/features/site/siteContent';

export const metadata: Metadata = buildPageMetadata({
  title: 'About DevilDog Cybersecurity',
  description:
    'Learn about DevilDog Cybersecurity, its veteran-led approach, mission discipline, and commitment to practical cybersecurity delivery.',
  path: '/about',
  imagePath: storyContent.imageSrc,
  imageAlt: storyContent.imageAlt,
});

export default function MarketingPage() {
  return (
    <main className="py-20 sm:py-24">
      <section className="mx-auto w-full max-w-7xl px-6">
        <div className="rounded-[2.25rem] bg-[linear-gradient(135deg,var(--dd-red),var(--dd-red-deep))] px-8 py-12 text-white shadow-[0_26px_70px_rgba(108,4,4,0.24)] sm:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/60">
            About DevilDog
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            A cybersecurity partner shaped by mission discipline, technical depth, and long-term accountability.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/80 sm:text-lg">
            DevilDog is a veteran-led cybersecurity company with strong roots in compliance,
            infrastructure hardening, and training. The team brings mission discipline and
            practical delivery to organizations that need stronger security and clearer execution.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex rounded-full border border-white/20 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/10"
            >
              Back Home
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 grid w-full max-w-7xl gap-6 px-6 lg:grid-cols-3">
        {aboutPrinciples.map((item) => (
          <article
            key={item.title}
            className="h-full rounded-[1.75rem] border border-[color:var(--dd-border)] bg-white p-7 text-[color:var(--dd-copy)] shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
          >
            <h2 className="text-2xl font-bold text-[color:var(--dd-red)]">
              {item.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[color:var(--dd-muted)]">
              {item.description}
            </p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-12 grid w-full max-w-7xl gap-10 px-6 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:py-4">
        <div className="overflow-hidden rounded-[2rem] border border-[color:var(--dd-border)] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
          <Image
            src={storyContent.imageSrc}
            alt={storyContent.imageAlt}
            width={1200}
            height={900}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="rounded-[2rem] border border-[color:var(--dd-border)] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--dd-red-bright)]">
            {storyContent.subtitle}
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-[color:var(--dd-copy)]">
            {storyContent.title}
          </h2>
          <div className="mt-6 space-y-5 text-base leading-8 text-[color:var(--dd-muted)]">
            {storyContent.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
