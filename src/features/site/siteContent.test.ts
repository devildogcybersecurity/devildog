import { describe, expect, it } from 'vitest';

import { detailPages } from '@/features/site/detailPages';
import {
  aboutPrinciples,
  featureCards,
  footerContact,
  footerLinkGroups,
  navigationGroups,
  primaryNavigation,
  serviceHighlights,
  siteMetadata,
  storyContent,
} from '@/features/site/siteContent';

describe('siteContent', () => {
  it('defines DevilDog metadata and public navigation', () => {
    expect(siteMetadata.title).toContain('DevilDog');
    expect(siteMetadata.description.length).toBeGreaterThan(20);
    expect(primaryNavigation).toEqual([
      { href: '/ai-threats', label: 'AI Threats' },
      { href: '/security-reconnaissance', label: 'Security Reconnaissance' },
      { href: '/story', label: 'Story' },
    ]);
    expect(navigationGroups).toHaveLength(3);
    expect(navigationGroups.every((group) => group.links.length > 0)).toBe(true);
    expect(navigationGroups.some((group) => group.links.some((link) => link.href === '/contact'))).toBe(true);
  });

  it('includes the homepage and footer sections for the public site', () => {
    expect(featureCards).toHaveLength(4);
    expect(serviceHighlights).toHaveLength(9);
    expect(detailPages.length).toBeGreaterThan(15);
    expect(aboutPrinciples).toHaveLength(3);
    expect(footerLinkGroups).toHaveLength(2);
    expect(storyContent.paragraphs).toHaveLength(4);
    expect(featureCards.every((item) => item.imageSrc.startsWith('/images/devildog/'))).toBe(true);
    expect(featureCards.every((item) => item.href.startsWith('/'))).toBe(true);
    expect(serviceHighlights.every((item) => item.href.startsWith('/'))).toBe(true);
    expect(aboutPrinciples.every((item) => item.description.includes(' '))).toBe(true);
    expect(footerLinkGroups.some((group) => group.links.some((link) => link.href === '/contact'))).toBe(true);
    expect(footerContact.title.length).toBeGreaterThan(10);
    expect(footerContact.email).toContain('@');
  });
});
