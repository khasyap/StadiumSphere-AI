import { Link, useLocation } from 'react-router';

import { getPage, routePaths } from '@/routes/route-definitions';
import { useToast } from '@/contexts/toast-context';

export function PlaceholderPage() {
  const { pathname } = useLocation();
  const page = getPage(pathname);
  const { show } = useToast();

  return (
    <div className="page-enter mx-auto w-full max-w-7xl space-y-7 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-300">StadiumSphere Workspace</p>
          <div className="flex items-start gap-4">
            <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-2xl text-cyan-600 dark:text-cyan-300">{page.icon}</span>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{page.label}</h1>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">{page.description}</p>
            </div>
          </div>
        </div>
        <button type="button" onClick={() => show(`${page.label} actions will be available in a future module.`)} className="focus-ring rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100">
          Open quick action
        </button>
      </header>

      <section className="grid gap-4 md:grid-cols-3" aria-label={`${page.label} summary placeholders`}>
        {['Operational signal', 'Recent activity', 'Prepared insight'].map((label, index) => (
          <article key={label} className="surface-card p-5">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{label}</p>
            <p className="mt-5 text-2xl font-semibold text-slate-950 dark:text-white">{index === 0 ? '—' : 'Coming soon'}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">This space is reserved for live platform data in the next delivery phase.</p>
          </article>
        ))}
      </section>

      <section className="surface-card overflow-hidden">
        <div className="border-b border-slate-200/80 px-6 py-5 dark:border-white/10">
          <h2 className="font-semibold text-slate-950 dark:text-white">Your {page.label.toLowerCase()} workspace is ready</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">A polished foundation is in place; operational tools will connect here without changing the application shell.</p>
        </div>
        <div className="grid gap-4 p-6 sm:grid-cols-2">
          <button type="button" onClick={() => show('Notification preferences are ready for a future module.')} className="focus-ring rounded-xl border border-dashed border-slate-300 p-5 text-left transition hover:border-cyan-400 hover:bg-cyan-50/60 dark:border-white/15 dark:hover:bg-cyan-400/5">
            <span className="text-sm font-medium text-slate-950 dark:text-white">Configure alerts</span>
            <span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">Open the notification placeholder.</span>
          </button>
          <Link to={routePaths.application.activity} className="focus-ring rounded-xl border border-dashed border-slate-300 p-5 text-left transition hover:border-cyan-400 hover:bg-cyan-50/60 dark:border-white/15 dark:hover:bg-cyan-400/5">
            <span className="text-sm font-medium text-slate-950 dark:text-white">Review activity</span>
            <span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">Navigate to the shared activity workspace.</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
