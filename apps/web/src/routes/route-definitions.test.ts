import { describe, expect, it } from 'vitest';

import { applicationPages, routePaths } from '@/routes/route-definitions';

describe('route definitions', () => {
  it('provides the public application entry point', () => {
    expect(routePaths.application.dashboard).toBe('/');
  });

  it('provides a destination for every Phase 14.1 navigation item', () => {
    expect(applicationPages.map((page) => page.label)).toEqual([
      'Dashboard',
      'Organizations',
      'Stadiums',
      'Venues',
      'Sports',
      'Teams',
      'Events',
      'Bookings',
      'Analytics',
      'Activity',
      'AI Assistant',
      'Settings',
      'Help',
      'About',
    ]);
  });
});
