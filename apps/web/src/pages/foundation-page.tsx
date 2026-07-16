import { Button } from '@stadiumsphere/ui';

import { environment } from '@/config/environment';

export function FoundationPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-12">
      <section aria-labelledby="foundation-title" className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
          StadiumSphere AI
        </p>
        <h1 id="foundation-title" className="text-4xl font-bold tracking-tight text-slate-950">
          Engineering foundation is operational.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-700">
          The web application is ready for future feature modules. Server state is isolated through
          the query provider, while application routes are centralized for controlled expansion.
        </p>
        <dl className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-medium text-slate-950">API base URL</dt>
            <dd className="mt-1 break-all text-slate-600">{environment.VITE_API_BASE_URL}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-950">Application scope</dt>
            <dd className="mt-1 text-slate-600">Platform foundation only</dd>
          </div>
        </dl>
        <Button aria-label="Foundation ready" className="bg-slate-950 text-white" disabled>
          Ready for Phase 12
        </Button>
      </section>
    </main>
  );
}
