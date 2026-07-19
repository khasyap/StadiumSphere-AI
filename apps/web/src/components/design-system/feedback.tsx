import { CheckCircle2, CircleAlert, Info, TriangleAlert, X } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type AlertTone = 'error' | 'info' | 'success' | 'warning';
const toneStyles: Record<AlertTone, string> = { error: 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-100', info: 'border-cyan-200 bg-cyan-50 text-cyan-900 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-100', success: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-100', warning: 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-100' };
const toneIcons = { error: CircleAlert, info: Info, success: CheckCircle2, warning: TriangleAlert };

export function AlertBanner({ children, onDismiss, title, tone = 'info' }: { children: ReactNode; onDismiss?(): void; title: string; tone?: AlertTone }) { const Icon = toneIcons[tone]; return <div role="status" className={cn('flex items-start gap-3 rounded-xl border p-4 text-sm', toneStyles[tone])}><Icon size={18} className="mt-.5 shrink-0" /><div className="flex-1"><p className="font-semibold">{title}</p><div className="mt-1 opacity-80">{children}</div></div>{onDismiss ? <button type="button" aria-label="Dismiss alert" onClick={onDismiss} className="focus-ring rounded p-1"><X size={16} /></button> : null}</div>; }

export function EmptyState({ action, description, icon, title }: { action?: ReactNode; description: string; icon: ReactNode; title: string }) { return <div className="grid place-items-center rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center dark:border-white/15"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-300">{icon}</div><h3 className="mt-4 font-semibold">{title}</h3><p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-300">{description}</p>{action ? <div className="mt-5">{action}</div> : null}</div>; }
