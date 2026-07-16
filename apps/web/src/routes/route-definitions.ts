export const routePaths = {
  public: {
    foundation: '/',
  },
  protected: {},
  admin: {},
} as const;

export type RouteAccess = keyof typeof routePaths;
