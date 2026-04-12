import Image from 'next/image';
import Link from 'next/link';

import type { DetailPage, DetailPageSection, PageAction, PageCard, TeamMember } from '@/features/site/detailPages';

function SectionIntro({
  eyebrow,
  title,
  description,
  theme,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  theme: 'light' | 'dark';
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p
          className={`text-sm font-semibold uppercase tracking-[0.28em] ${
            theme === 'dark' ? 'text-white/65' : 'text-[color:var(--dd-red-bright)]'
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl ${
          theme === 'dark' ? 'text-white' : 'text-[color:var(--dd-copy)]'
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-8 sm:text-lg ${
            theme === 'dark' ? 'text-white/80' : 'text-[color:var(--dd-muted)]'
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function ActionLink({
  action,
  primary,
  theme = 'dark',
}: {
  action: PageAction;
  primary?: boolean;
  theme?: 'light' | 'dark';
}) {
  const className = primary
    ? theme === 'dark'
      ? 'inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--dd-red-deep)] shadow-[0_12px_28px_rgba(0,0,0,0.16)] transition hover:bg-[color:var(--dd-cream)] hover:text-[color:var(--dd-red-deep)]'
      : 'inline-flex rounded-full bg-[color:var(--dd-red)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[color:var(--dd-red-deep)]'
    : theme === 'dark'
      ? 'inline-flex rounded-full border border-white/20 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/10'
      : 'inline-flex rounded-full border border-[color:var(--dd-border)] bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--dd-copy)] transition hover:border-[color:var(--dd-red)] hover:text-[color:var(--dd-red)]';

  return (
    <Link href={action.href} className={className}>
      {action.label}
    </Link>
  );
}

function SurfaceCard({
  card,
  theme,
}: {
  card: PageCard;
  theme: 'light' | 'dark';
}) {
  const cardBody = (
    <>
      <h3
        className={`text-2xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-[color:var(--dd-copy)]'
        }`}
      >
        {card.title}
      </h3>
      <p
        className={`mt-3 text-sm leading-7 ${
          theme === 'dark' ? 'text-white/78' : 'text-[color:var(--dd-muted)]'
        }`}
      >
        {card.description}
      </p>
      {card.href ? (
        <span
          className={`mt-5 inline-flex text-sm font-semibold uppercase tracking-[0.16em] ${
            theme === 'dark' ? 'text-white' : 'text-[color:var(--dd-red)]'
          }`}
        >
          Explore page
        </span>
      ) : null}
    </>
  );

  const className =
    theme === 'dark'
      ? 'h-full rounded-[1.75rem] border border-white/10 bg-white/10 p-7 text-white shadow-[0_18px_40px_rgba(0,0,0,0.12)] backdrop-blur-sm'
      : 'h-full rounded-[1.75rem] border border-[color:var(--dd-border)] bg-white p-7 text-[color:var(--dd-copy)] shadow-[0_18px_40px_rgba(15,23,42,0.08)]';

  return card.href ? (
    <Link
      href={card.href}
      className={`${className} transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(15,23,42,0.16)]`}
    >
      {cardBody}
    </Link>
  ) : (
    <article className={className}>{cardBody}</article>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="h-full overflow-hidden rounded-[1.75rem] border border-[color:var(--dd-border)] bg-white text-[color:var(--dd-copy)] shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      <div className="h-80 overflow-hidden">
        <Image
          src={member.imageSrc}
          alt={member.imageAlt}
          width={900}
          height={900}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--dd-red-bright)]">
          {member.role}
        </p>
        <h3 className="mt-3 text-3xl font-bold text-[color:var(--dd-copy)]">{member.name}</h3>
        <div className="mt-5 space-y-4 text-sm leading-7 text-[color:var(--dd-muted)]">
          {member.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <ul className="mt-6 space-y-3">
          {member.highlights.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-[color:var(--dd-border)] bg-[color:var(--dd-cream)] px-4 py-3 text-sm text-[color:var(--dd-copy)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function renderSection(section: DetailPageSection, index: number) {
  const theme = section.theme;
  const sectionClassName =
    theme === 'dark'
      ? 'bg-[linear-gradient(135deg,var(--dd-red-deep),var(--dd-red))] text-white'
      : 'bg-transparent text-[color:var(--dd-copy)]';

  if (section.kind === 'split') {
    const hasImage = Boolean(section.imageSrc);
    const content = (
      <div>
        <SectionIntro
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          theme={theme}
        />
        <div
          className={`mt-6 space-y-5 text-base leading-8 ${
            theme === 'dark' ? 'text-white/80' : 'text-[color:var(--dd-muted)]'
          }`}
        >
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {section.bullets ? (
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {section.bullets.map((item) => (
              <li
                key={item}
                className={`rounded-2xl px-4 py-3 text-sm ${
                  theme === 'dark'
                    ? 'border border-white/12 bg-white/6 text-white'
                    : 'border border-[color:var(--dd-border)] bg-white text-[color:var(--dd-copy)]'
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );

    const image = hasImage ? (
      <div
        className={`overflow-hidden rounded-[2rem] shadow-[0_18px_50px_rgba(0,0,0,0.12)] ${
          theme === 'dark' ? 'border border-white/10' : 'border border-[color:var(--dd-border)]'
        }`}
      >
        <Image
          src={section.imageSrc!}
          alt={section.imageAlt ?? section.title}
          width={1200}
          height={900}
          className="h-full w-full object-cover"
        />
      </div>
    ) : null;

    const leftFirst = !hasImage || section.imagePosition !== 'left';

    return (
      <section key={`${section.kind}-${index}`} className={`py-24 sm:py-28 ${sectionClassName}`}>
        <div
          className={`mx-auto grid w-full max-w-7xl gap-10 px-6 ${
            hasImage ? 'lg:grid-cols-[1.02fr_.98fr] lg:items-center' : ''
          }`}
        >
          {leftFirst ? content : image}
          {leftFirst ? image : content}
        </div>
      </section>
    );
  }

  if (section.kind === 'cards') {
    const columns =
      section.columns === 2
        ? 'lg:grid-cols-2'
        : section.columns === 4
          ? 'lg:grid-cols-4'
          : 'lg:grid-cols-3';

    return (
      <section key={`${section.kind}-${index}`} className={`py-24 sm:py-28 ${sectionClassName}`}>
        <div className="mx-auto w-full max-w-7xl px-6">
          <SectionIntro
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            theme={theme}
          />
          <div className={`mt-10 grid gap-6 ${columns}`}>
            {section.cards.map((card) => (
              <SurfaceCard key={card.title} card={card} theme={theme} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section.kind === 'list') {
    const columns =
      section.columns === 2
        ? 'lg:grid-cols-2'
        : section.columns === 4
          ? 'lg:grid-cols-4'
          : 'lg:grid-cols-3';

    return (
      <section key={`${section.kind}-${index}`} className={`py-24 sm:py-28 ${sectionClassName}`}>
        <div className="mx-auto w-full max-w-7xl px-6">
          <SectionIntro
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            theme={theme}
          />
          <ul className={`mt-10 grid gap-4 ${columns}`}>
            {section.items.map((item) => (
              <li
                key={item}
                className={`rounded-[1.5rem] px-5 py-4 text-sm leading-7 ${
                  theme === 'dark'
                    ? 'border border-white/10 bg-white/6 text-white'
                    : 'border border-[color:var(--dd-border)] bg-white text-[color:var(--dd-copy)] shadow-[0_12px_24px_rgba(15,23,42,0.06)]'
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section key={`${section.kind}-${index}`} className={`py-24 sm:py-28 ${sectionClassName}`}>
      <div className="mx-auto w-full max-w-7xl px-6">
        <SectionIntro
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          theme={theme}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {section.members.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function DetailPage({ page }: { page: DetailPage }) {
  return (
    <main>
      <section className="relative overflow-hidden bg-[color:var(--dd-ink)] text-white">
        <div className="absolute inset-0">
          <Image
            src={page.hero.imageSrc}
            alt={page.hero.imageAlt}
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,9,0.45),rgba(9,9,9,0.82))]" />
        </div>

        <div
          className={`relative mx-auto flex w-full max-w-7xl px-6 py-24 sm:py-28 ${
            page.hero.align === 'center' ? 'justify-center text-center' : 'justify-start text-left'
          }`}
        >
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/65">
              {page.hero.eyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {page.hero.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
              {page.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {page.sections.map((section, index) => renderSection(section, index))}

      {page.cta ? (
        <section className="pb-24 pt-6">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="rounded-[2.25rem] bg-[linear-gradient(135deg,var(--dd-red),var(--dd-red-deep))] px-8 py-10 text-white shadow-[0_24px_70px_rgba(108,4,4,0.22)] sm:px-10">
              <SectionIntro
                eyebrow="Next Step"
                title={page.cta.title}
                description={page.cta.description}
                theme={page.cta.theme}
              />
              <div className="mt-8 flex flex-wrap gap-3">
                {page.cta.primaryAction ? (
                  <ActionLink action={page.cta.primaryAction} primary theme={page.cta.theme} />
                ) : null}
                {page.cta.secondaryAction ? (
                  <ActionLink action={page.cta.secondaryAction} theme={page.cta.theme} />
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
