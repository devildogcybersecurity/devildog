import Image from 'next/image';
import Link from 'next/link';

import {
  featureCards,
  heroContent,
  missionContent,
  serviceHighlights,
  storyContent,
  type ServiceHighlight,
} from '@/features/site/siteContent';

function ServiceIcon({ icon }: { icon: ServiceHighlight['icon'] }) {
  const iconClassName = 'h-6 w-6 stroke-current';

  switch (icon) {
    case 'person':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={iconClassName}>
          <path d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" strokeWidth="1.8" />
          <path d="M5 19.5a7 7 0 0 1 14 0" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'cloud':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={iconClassName}>
          <path
            d="M7 18.5h9.5a4 4 0 0 0 .65-7.95A5.5 5.5 0 0 0 6.54 9.1 4.5 4.5 0 0 0 7 18.5Z"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'pulse':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={iconClassName}>
          <path
            d="M3 12h4l2-4 4 8 2-4h6"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'shield':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={iconClassName}>
          <path
            d="M12 4.5 5.5 7v4.75c0 4.1 2.66 7.9 6.5 9.25 3.84-1.35 6.5-5.15 6.5-9.25V7L12 4.5Z"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'sliders':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={iconClassName}>
          <path d="M5 6h14M5 12h14M5 18h14" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="9" cy="6" r="2" fill="currentColor" />
          <circle cx="15" cy="12" r="2" fill="currentColor" />
          <circle cx="11" cy="18" r="2" fill="currentColor" />
        </svg>
      );
    case 'training':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={iconClassName}>
          <path
            d="m3 9 9-4 9 4-9 4-9-4Zm3 2.75v4.5L12 19l6-2.75v-4.5"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'check':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={iconClassName}>
          <path d="m7.5 12.5 3 3 6-7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M12 4.5 5.5 7v4.75c0 4.1 2.66 7.9 6.5 9.25 3.84-1.35 6.5-5.15 6.5-9.25V7L12 4.5Z"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'clipboard':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={iconClassName}>
          <path
            d="M9 5.5h6M9.75 4h4.5A1.75 1.75 0 0 1 16 5.75V7h1.25A1.75 1.75 0 0 1 19 8.75v9.5A1.75 1.75 0 0 1 17.25 20h-10.5A1.75 1.75 0 0 1 5 18.25v-9.5A1.75 1.75 0 0 1 6.75 7H8V5.75A1.75 1.75 0 0 1 9.75 4Z"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M12 10v4M10 12h4" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'certificate':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={iconClassName}>
          <path
            d="M12 6.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="m9.5 14.5-1.25 5 3.75-1.75L15.75 19l-1.25-4.5"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export function HomePage() {
  return (
    <main>
      <section
        id="hero"
        className="relative overflow-hidden bg-[color:var(--dd-ink)] text-white scroll-mt-28"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,17,22,0.24),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_52%)]" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 pb-28 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:pb-36 lg:pt-24">
          <div className="max-w-3xl text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--dd-red-bright)]">
              {heroContent.eyebrow}
            </p>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {heroContent.title}
            </h1>

            <div className="mt-8 space-y-5 text-base leading-8 text-white/80 sm:text-lg">
              {heroContent.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl">
            <div className="absolute -inset-4 rounded-[2rem] bg-[linear-gradient(135deg,rgba(176,17,22,0.45),transparent_70%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
              <Image
                src={heroContent.imageSrc}
                alt={heroContent.imageAlt}
                width={1200}
                height={900}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-[4.5rem] scroll-mt-28">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 pb-20 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((card) => (
            <Link
              key={card.slug}
              href={card.href}
              className="h-full overflow-hidden rounded-[1.75rem] border border-[color:var(--dd-border)] bg-white text-[color:var(--dd-copy)] shadow-[0_20px_60px_rgba(15,23,42,0.12)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_68px_rgba(15,23,42,0.16)]"
            >
              <div className="h-52 overflow-hidden">
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  width={900}
                  height={700}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-[color:var(--dd-red)]">
                  {card.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[color:var(--dd-muted)]">
                  {card.description}
                </p>
                <span className="mt-5 inline-flex text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--dd-red)]">
                  Explore page
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        id="services"
        className="scroll-mt-28 bg-[linear-gradient(180deg,var(--dd-red),var(--dd-red-deep))] py-20 text-white"
      >
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_24px_65px_rgba(0,0,0,0.18)]">
              <Image
                src={missionContent.imageSrc}
                alt={missionContent.imageAlt}
                width={1200}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/60">
                Mission
              </p>
              <h2 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {missionContent.title}
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-white/80">
                {missionContent.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {serviceHighlights.map((service) => (
              <Link
                key={service.slug}
                href={service.href}
                id={`service-${service.slug}`}
                className="h-full rounded-[1.75rem] border border-white/10 bg-white p-7 text-[color:var(--dd-copy)] shadow-[0_18px_40px_rgba(0,0,0,0.12)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(0,0,0,0.18)] scroll-mt-28"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--dd-red)] text-white shadow-[0_12px_24px_rgba(108,4,4,0.22)]">
                  <ServiceIcon icon={service.icon} />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-[color:var(--dd-copy)]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--dd-muted)]">
                  {service.description}
                </p>
                <span className="mt-5 inline-flex text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--dd-red)]">
                  Explore service
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="story" className="scroll-mt-28 py-24 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--dd-red-bright)]">
              About Us
            </p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[color:var(--dd-copy)] sm:text-5xl">
              {storyContent.title}
            </h2>
            <p className="mt-3 text-xl font-semibold text-[color:var(--dd-red)]">
              {storyContent.subtitle}
            </p>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:py-4">
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
              <div className="space-y-5 text-base leading-8 text-[color:var(--dd-muted)]">
                {storyContent.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
