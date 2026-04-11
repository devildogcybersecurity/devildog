export const siteMetadata = {
  title: 'Static Site Template',
  description: 'Fast, clean static website starter built with Next.js and Tailwind CSS.',
};

export const navigationLinks = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/about',
    label: 'About',
  },
] as const;

export const featureHighlights = [
  {
    title: 'Static export ready',
    description:
      'Build a public website that can be deployed to CDN and object-storage hosting without a database or custom auth runtime.',
  },
  {
    title: 'Single app, simple structure',
    description:
      'Keep the repo focused on public pages, reusable UI, and content modules that are easy to understand and replace.',
  },
  {
    title: 'Cross-platform local workflow',
    description:
      'Use the same Next.js and Docker workflow on Windows 11 and macOS without extra database setup.',
  },
] as const;

export const launchChecklist = [
  'Replace the template copy with your site messaging and calls to action.',
  'Add or restyle reusable sections in src/components and src/features.',
  'Run the static build and deploy the generated out directory to your host of choice.',
] as const;

export const aboutPrinciples = [
  {
    title: 'Public-first routing',
    description:
      'All routes in this baseline are intended for public content, marketing pages, and informational sections.',
  },
  {
    title: 'Reusable content modules',
    description:
      'Shared copy and navigation live in feature-level modules so the pages stay lightweight and easy to refactor.',
  },
  {
    title: 'Intentional simplicity',
    description:
      'The template avoids auth, database, and server-side business layers until a project truly needs them.',
  },
] as const;
