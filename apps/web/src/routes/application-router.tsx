import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router';

import { ApplicationShell } from '@/layouts/application-shell';
import { applicationPages } from '@/routes/route-definitions';

const PlaceholderPage = lazy(async () => import('@/pages/placeholder-page').then((module) => ({ default: module.PlaceholderPage })));

function RouteLoading() {
  return <div className="grid min-h-[60vh] place-items-center text-sm text-slate-500 dark:text-slate-300">Preparing workspace…</div>;
}

export const applicationRouter = createBrowserRouter([
  {
    element: <ApplicationShell />,
    children: applicationPages.map((page) => ({
      element: <Suspense fallback={<RouteLoading />}><PlaceholderPage /></Suspense>,
      path: page.path,
    })),
  },
]);
