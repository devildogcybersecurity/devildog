import { SignOutButton } from '@/components/auth/SignOutButton';
import { AppShell } from '@/components/ui/AppShell';
import { getRequiredSession } from '@/server/auth/session';
import { listProjectsForUser } from '@/server/services/projectsService';

import { createStarterProjectAction } from './actions';

export const dynamic = 'force-dynamic';

export default async function AppHomePage() {
  const session = await getRequiredSession();
  const projects = await listProjectsForUser(session.user.id);

  return (
    <main className="min-h-screen bg-neutral-50 py-8">
      <AppShell
        title="Dashboard"
        description="This protected area demonstrates the starter service and repository boundaries after authentication."
        actions={<SignOutButton />}
      >
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <section className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 border-b border-neutral-200 pb-4">
              <p className="text-sm text-neutral-500">Signed in as</p>
              <p className="font-medium text-neutral-900">
                {session.user.email ?? session.user.name ?? 'Authenticated user'}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <article key={project.id} className="rounded-lg border border-neutral-200 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-neutral-900">{project.name}</h3>
                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium uppercase text-neutral-700">
                        {project.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-neutral-600">{project.summary}</p>
                    <p className="mt-3 text-xs text-neutral-500">Slug: {project.slug}</p>
                  </article>
                ))
              ) : (
                <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-5 text-sm text-neutral-600">
                  No projects yet. Create a starter project to see the template&apos;s server-side
                  repository and service example in action.
                </div>
              )}
            </div>
          </section>

          <aside className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-900">Starter actions</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Use this button to create a project through the service layer. It is intentionally
              simple so new projects can replace it with domain-specific logic.
            </p>

            <form action={createStarterProjectAction} className="mt-4">
              <button
                type="submit"
                className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Create starter project
              </button>
            </form>
          </aside>
        </div>
      </AppShell>
    </main>
  );
}
