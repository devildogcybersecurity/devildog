export default function MarketingPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">About this template</h1>
      <p className="text-base leading-7 text-neutral-700">
        This repository is designed to be forked into new MVP projects. It intentionally keeps the
        architecture small while still demonstrating real database, auth, test, and service-layer
        patterns.
      </p>
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-neutral-900">Starter conventions</h2>
        <ul className="mt-4 space-y-2 text-sm text-neutral-600">
          <li>Marketing pages stay public in the `(marketing)` route group.</li>
          <li>Protected app pages live in `(app)` and use Auth.js route protection.</li>
          <li>Database access stays in repositories, while orchestration lives in services.</li>
          <li>Docker provides a cross-platform local workflow for Windows and macOS.</li>
        </ul>
      </div>
    </main>
  );
}
