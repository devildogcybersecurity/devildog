import Link from 'next/link';

import { ContactForm } from '@/features/contact/components/ContactForm';
import { contactPageContent } from '@/features/contact/contactContent';
import { footerContact } from '@/features/site/siteContent';

export function ContactPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-[color:var(--dd-ink)] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,17,22,0.28),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_50%)]" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 py-24 sm:py-28 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--dd-red-bright)]">
              {contactPageContent.eyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {contactPageContent.title}
            </h1>
            <p className="mt-6 text-base leading-8 text-white/82 sm:text-lg">
              {contactPageContent.subtitle}
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {contactPageContent.supportingPoints.map((item) => (
                <li
                  key={item}
                  className="rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-7 text-white/88 backdrop-blur-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/60">
              {contactPageContent.responseTitle}
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Give the team the context they need.
            </h2>
            <p className="mt-4 text-base leading-8 text-white/80">
              {contactPageContent.responseDescription}
            </p>

            <ul className="mt-8 space-y-3">
              {contactPageContent.responseHighlights.map((item) => (
                <li
                  key={item}
                  className="rounded-[1.35rem] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-7 text-white"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 lg:grid-cols-[1.08fr_.92fr] lg:items-start">
          <div>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--dd-red-bright)]">
                {contactPageContent.formIntroTitle}
              </p>
              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[color:var(--dd-copy)] sm:text-5xl">
                Security, compliance, and delivery questions can start here.
              </h2>
              <p className="mt-4 text-base leading-8 text-[color:var(--dd-muted)] sm:text-lg">
                {contactPageContent.formIntroDescription}
              </p>
            </div>

            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          <section className="rounded-[2rem] border border-[color:var(--dd-border)] bg-white p-8 text-[color:var(--dd-copy)] shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--dd-red-bright)]">
              Reach DevilDog Directly
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[color:var(--dd-copy)]">
              Prefer the usual contact channels?
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-[color:var(--dd-muted)]">
              <p>
                <span className="font-semibold text-[color:var(--dd-copy)]">Phone:</span>{' '}
                {footerContact.phone}
              </p>
              <p>
                <span className="font-semibold text-[color:var(--dd-copy)]">Email:</span>{' '}
                {footerContact.email}
              </p>
              <div>
                <span className="font-semibold text-[color:var(--dd-copy)]">Address:</span>
                <div className="mt-2 space-y-1">
                  {footerContact.addressLines.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/services"
                className="inline-flex rounded-full border border-[color:var(--dd-border)] bg-[color:var(--dd-cream)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--dd-red-deep)] transition hover:border-[color:var(--dd-red)] hover:text-[color:var(--dd-red)]"
              >
                Explore Services
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
