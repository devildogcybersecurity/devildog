type AppShellProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export function AppShell({ title, description, actions, children }: AppShellProps) {
  return (
    <section className="mx-auto w-full max-w-5xl p-6">
      <header className="mb-6 flex flex-col gap-3 border-b border-neutral-200 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          {description ? <p className="mt-1 text-sm text-neutral-600">{description}</p> : null}
        </div>
        {actions ? <div>{actions}</div> : null}
      </header>
      <div>{children}</div>
    </section>
  );
}
