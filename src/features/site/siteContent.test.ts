import { describe, expect, it } from 'vitest';

import {
  aboutPrinciples,
  featureHighlights,
  launchChecklist,
  navigationLinks,
  siteMetadata,
} from '@/features/site/siteContent';

describe('siteContent', () => {
  it('defines static metadata and public navigation', () => {
    expect(siteMetadata.title).toContain('Static Site');
    expect(siteMetadata.description.length).toBeGreaterThan(20);
    expect(navigationLinks).toEqual([
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
    ]);
  });

  it('includes starter sections for the public site', () => {
    expect(featureHighlights).toHaveLength(3);
    expect(launchChecklist).toHaveLength(3);
    expect(aboutPrinciples).toHaveLength(3);
    expect(featureHighlights.every((item) => item.title.length > 0)).toBe(true);
    expect(aboutPrinciples.every((item) => item.description.includes(' '))).toBe(true);
  });
});
