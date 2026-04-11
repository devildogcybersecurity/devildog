import Link from 'next/link';

import { AppShell } from '@/components/ui/AppShell';
import { aboutPrinciples, navigationLinks } from '@/features/site/siteContent';

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-neutral-50 py-8">
      <AppShell
        title="About This Template"
        description="A public-only starter for shipping brochure sites, landing pages, and content-led websites."
        actions={
          <Link
            href={navigationLinks[0].href}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50"
          >
            Back home
          </Link>
        }
      >
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <section className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-base leading-7 text-neutral-700">
              This repository is meant to be forked into a static website project. It keeps the
              moving pieces small so teams can focus on content, design, and deployment instead of
              scaffolding services they do not need yet.
            </p>

            <div className="mt-6 space-y-4">
              {aboutPrinciples.map((item) => (
                <article key={item.title} className="rounded-lg border border-neutral-200 p-4">
                  <h2 className="text-lg font-semibold text-neutral-900">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <aside className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-900">Included by default</h2>
            <ul className="mt-4 space-y-3 text-sm text-neutral-600">
              <li>Next.js App Router for public pages.</li>
              <li>Tailwind CSS styling foundations.</li>
              <li>Vitest-based starter test coverage.</li>
              <li>Docker support for app-only local development.</li>
            </ul>
          </aside>
        </div>
      </AppShell>
    </main>
  );
}
