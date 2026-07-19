import { lazy, Suspense } from 'react';
import { createBrowserRouter, useLocation } from 'react-router';
import type { ComponentType } from 'react';

import { ApplicationShell } from '@/layouts/application-shell';
import { applicationPages } from '@/routes/route-definitions';

const DashboardPage = lazy(async () => import('@/pages/workspace-pages').then((module) => ({ default: module.DashboardPage })));
const AnalyticsPage = lazy(async () => import('@/pages/workspace-pages').then((module) => ({ default: module.AnalyticsPage })));
const ActivityPage = lazy(async () => import('@/pages/workspace-pages').then((module) => ({ default: module.ActivityPage })));
const AssistantPage = lazy(async () => import('@/pages/workspace-pages').then((module) => ({ default: module.AssistantPage })));
const SettingsPage = lazy(async () => import('@/pages/settings-page').then((module) => ({ default: module.SettingsPage })));
const HelpPage = lazy(async () => import('@/pages/workspace-pages').then((module) => ({ default: module.HelpPage })));
const AboutPage = lazy(async () => import('@/pages/workspace-pages').then((module) => ({ default: module.AboutPage })));
const OrganizationsPage = lazy(async () => import('@/features/operations/organizations-page').then((module) => ({ default: module.OrganizationsPage })));
const StadiumsPage = lazy(async () => import('@/features/operations/stadiums-page').then((module) => ({ default: module.StadiumsPage })));
const VenuesPage = lazy(async () => import('@/features/operations/venues-page').then((module) => ({ default: module.VenuesPage })));
const SportsPage = lazy(async () => import('@/features/operations/sports-page').then((module) => ({ default: module.SportsPage })));
const TeamsPage = lazy(async () => import('@/features/operations/teams-page').then((module) => ({ default: module.TeamsPage })));
const EventsPage = lazy(async () => import('@/features/operations/events-page').then((module) => ({ default: module.EventsPage })));
const BookingsPage = lazy(async () => import('@/features/operations/bookings-page').then((module) => ({ default: module.BookingsPage })));

const productPages: Record<string, ComponentType> = {
  '/': DashboardPage,
  '/activity': ActivityPage,
  '/ai-assistant': AssistantPage,
  '/analytics': AnalyticsPage,
  '/about': AboutPage,
  '/bookings': BookingsPage,
  '/events': EventsPage,
  '/help': HelpPage,
  '/organizations': OrganizationsPage,
  '/settings': SettingsPage,
  '/sports': SportsPage,
  '/stadiums': StadiumsPage,
  '/teams': TeamsPage,
  '/venues': VenuesPage,
};

function RouteLoading() {
  return <div className="grid min-h-[60vh] place-items-center text-sm text-slate-500 dark:text-slate-300">Preparing workspace…</div>;
}

function WorkspaceRoute() {
  const { pathname } = useLocation();
  const Page = productPages[pathname] ?? DashboardPage;
  return <Suspense fallback={<RouteLoading />}><Page /></Suspense>;
}

export const applicationRouter = createBrowserRouter([
  {
    element: <ApplicationShell />,
    children: applicationPages.map((page) => ({
      element: <WorkspaceRoute />,
      path: page.path,
    })),
  },
]);
