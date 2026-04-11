import Link from 'next/link';

import { listStarterProjects } from '@/server/services/projectsService';

export const dynamic = 'force-dynamic';

async function loadStarterProjects() {
  try {
    return await listStarterProjects();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const starterProjects = await loadStarterProjects();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-6 py-10">
      <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Forkable MVP template
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-950">
          Start faster without losing clean boundaries.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-700">
          This starter ships a single Next.js application, Dockerized local development,
          Prisma-backed Auth.js foundations, server-side repository and service examples, and a
          testable path for new product work.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Open dashboard
          </Link>
          <Link
            href="/sign-in"
            className="rounded-lg border border-neutral-300 px-4 py-3 text-sm font-medium text-neutral-800 transition hover:border-neutral-400 hover:bg-neutral-50"
          >
            Configure sign-in
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          'Next.js 16 App Router starter',
          'Prisma, PostgreSQL, and Docker local workflow',
          'Auth.js, unit tests, and CI included',
        ].map((item) => (
          <div key={item} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-neutral-900">{item}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Seeded example data
          </p>
          <h2 className="text-2xl font-semibold text-neutral-950">
            The template includes one public starter project from the seed script.
          </h2>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {starterProjects.length > 0 ? (
            starterProjects.map((project) => (
              <article
                key={project.id}
                className="rounded-xl border border-neutral-200 bg-neutral-50 p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-neutral-900">{project.name}</h3>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-medium uppercase text-neutral-600">
                    {project.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-neutral-600">{project.summary}</p>
                <p className="mt-3 text-xs text-neutral-500">Slug: {project.slug}</p>
              </article>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-300 p-5 text-sm text-neutral-600">
              Run the Prisma migration and seed workflow to load the sample starter project.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
