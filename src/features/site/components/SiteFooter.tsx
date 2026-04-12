import Image from 'next/image';
import Link from 'next/link';

import type { NavigationLink } from '@/features/site/siteContent';

type FooterLinkGroup = {
  title: string;
  links: readonly NavigationLink[];
};

type SocialLink = {
  label: string;
  href: string;
};

type SiteFooterProps = {
  footerLinkGroups: readonly FooterLinkGroup[];
  socialLinks: readonly SocialLink[];
  contact: {
    title: string;
    description: string;
    addressLines: readonly string[];
    phone: string;
    email: string;
  };
};

function SocialIcon({ label }: { label: string }) {
  if (label === 'Facebook') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M13.5 8.25V6.5c0-.967.783-1.75 1.75-1.75H17V1.5h-2.5A4.75 4.75 0 0 0 9.75 6.25v2H7v3.25h2.75v11h3.75v-11H16l.5-3.25h-3Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M6.94 8.5A1.94 1.94 0 1 1 6.94 4.62a1.94 1.94 0 0 1 0 3.88ZM8.5 9.88H5.38V19.5H8.5V9.88Zm4.98 0h-3v9.62h3v-5.05c0-2.82 3.68-3.05 3.68 0v5.05h3.12v-6.13c0-4.77-5.44-4.59-6.8-2.24V9.88Z" />
    </svg>
  );
}

export function SiteFooter({ footerLinkGroups, socialLinks, contact }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-[color:var(--dd-red)] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.2fr_.8fr_.8fr_1fr]">
        <section>
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/images/devildog/logo-white.png"
              alt="DevilDog Cybersecurity"
              width={250}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <h2 className="mt-6 text-2xl font-bold">
            {contact.title}
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-7 text-white/80">{contact.description}</p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--dd-red-deep)] transition hover:bg-[color:var(--dd-cream)] hover:text-[color:var(--dd-red-deep)]"
            >
              Send a Message
            </Link>
          </div>
          <div className="mt-6 flex gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-white hover:text-white"
                aria-label={link.label}
              >
                <SocialIcon label={link.label} />
              </a>
            ))}
          </div>
        </section>

        {footerLinkGroups.map((group) => (
          <section key={group.title}>
            <h2 className="text-lg font-bold uppercase tracking-[0.18em] text-white/90">
              {group.title}
            </h2>
            <ul className="mt-5 space-y-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/70 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section>
          <h2 className="text-lg font-bold uppercase tracking-[0.18em] text-white/90">
            Contact Us
          </h2>
          <address className="mt-5 not-italic text-sm leading-7 text-white/80">
            {contact.addressLines.map((line) => (
              <div key={line}>{line}</div>
            ))}
            <div className="mt-4">
              <span className="font-semibold text-white">Phone:</span> {contact.phone}
            </div>
            <div>
              <span className="font-semibold text-white">Email:</span> {contact.email}
            </div>
          </address>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex rounded-full border border-white/20 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/10 hover:text-white"
            >
              Contact DevilDog
            </Link>
          </div>
        </section>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-7xl px-6 py-5 text-center text-sm text-white/60">
          &copy; {currentYear} DevilDog Cybersecurity. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
