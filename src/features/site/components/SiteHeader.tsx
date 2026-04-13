'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import type { NavigationGroup, NavigationLink } from '@/features/site/siteContent';

type SiteHeaderProps = {
  primaryNavigation: readonly NavigationLink[];
  navigationGroups: readonly NavigationGroup[];
};

function ChevronDownIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.51a.75.75 0 0 1-1.08 0l-4.25-4.51a.75.75 0 0 1 .02-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6 stroke-current">
      <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6 stroke-current">
      <path d="M6 6l12 12M18 6 6 18" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function NavDropdown({ group }: { group: NavigationGroup }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className="flex items-center gap-1 text-sm font-semibold tracking-[0.14em] text-white/90 transition hover:text-[color:var(--dd-cream)]"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{group.label}</span>
        <ChevronDownIcon />
      </button>

      <div
        className={`absolute left-0 top-full z-20 pt-2 transition duration-200 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="max-h-[70vh] min-w-72 overflow-y-auto rounded-2xl border border-white/10 bg-[rgba(108,4,4,0.85)] p-3 shadow-[0_22px_65px_rgba(0,0,0,0.18)] backdrop-blur-md">
          <div className="grid gap-1">
            {group.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 hover:text-[color:var(--dd-cream)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader({ primaryNavigation, navigationGroups }: SiteHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(108,4,4,0.96)] text-white backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex shrink-0 items-center" aria-label="DevilDog Cybersecurity">
          <Image
            src="/images/devildog/logo-white.png"
            alt="DevilDog Cybersecurity"
            width={250}
            height={40}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-7 text-white xl:flex" aria-label="Primary">
          {primaryNavigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold tracking-[0.14em] text-white/90 transition hover:text-[color:var(--dd-cream)]"
            >
              {item.label}
            </Link>
          ))}

          {navigationGroups.map((group) => (
            <NavDropdown key={group.label} group={group} />
          ))}

          <Link
            href="/contact"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold tracking-[0.14em] text-white transition hover:border-white/40 hover:bg-white/10 hover:text-white"
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-2 text-white transition hover:bg-white/10 xl:hidden"
          onClick={() => setIsMobileMenuOpen((value) => !value)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <nav
          id="mobile-navigation"
          className="border-t border-white/10 bg-[linear-gradient(180deg,var(--dd-red),var(--dd-red-deep))] px-6 pb-6 pt-4 text-white xl:hidden"
          aria-label="Mobile"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-2">
            {primaryNavigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}

            {navigationGroups.map((group) => (
              <details key={group.label} className="overflow-hidden rounded-2xl border border-white/10 bg-white/6 text-white">
                <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white">
                  <span>{group.label}</span>
                  <ChevronDownIcon />
                </summary>
                <div className="grid gap-1 px-2 pb-2">
                  {group.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="rounded-xl px-3 py-2 text-sm text-white/85 transition hover:bg-white/10 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </details>
            ))}

            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 rounded-full border border-white/15 px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/10"
            >
              Contact
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
