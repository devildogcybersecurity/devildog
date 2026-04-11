import Link from 'next/link';

import { featureHighlights, launchChecklist } from '@/features/site/siteContent';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-6 py-10">
      <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Public website starter
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-950">
          Launch a static website without dragging along app-only infrastructure.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-700">
          This template keeps the stack focused on public pages, reusable UI, cross-platform local
          development, and a clean static export path for fast launches.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/about"
            className="rounded-lg bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Explore the template
          </Link>
          <Link
            href="#launch-checklist"
            className="rounded-lg border border-neutral-300 px-4 py-3 text-sm font-medium text-neutral-800 transition hover:border-neutral-400 hover:bg-neutral-50"
          >
            See launch steps
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {featureHighlights.map((item) => (
          <article
            key={item.title}
            className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-sm font-medium text-neutral-900">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{item.description}</p>
          </article>
        ))}
      </section>

      <section
        id="launch-checklist"
        className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm"
      >
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Launch checklist
          </p>
          <h2 className="text-2xl font-semibold text-neutral-950">
            Replace the starter copy, keep the structure, and ship the static build.
          </h2>
        </div>

        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {launchChecklist.map((item) => (
            <li key={item} className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
              <p className="text-sm leading-6 text-neutral-700">{item}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
