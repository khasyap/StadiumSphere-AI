import { describe, expect, it } from 'vitest';

import { routePaths } from '@/routes/route-definitions';

describe('route definitions', () => {
  it('provides the public application entry point', () => {
    expect(routePaths.public.foundation).toBe('/');
  });
});
