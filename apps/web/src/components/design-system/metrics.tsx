import { Activity, ArrowDownRight, ArrowUpRight, CheckCircle2, CircleDashed } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/cn';
import { GlassCard } from './cards';

export function TrendIndicator({ value, positive = true }: { positive?: boolean; value: string }) {
  const Icon = positive ? ArrowUpRight : ArrowDownRight;
  return <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold', positive ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' : 'bg-rose-500/10 text-rose-700 dark:text-rose-300')}><Icon size={13} />{value}</span>;
}

export function MetricCard({ label, trend, value }: { label: string; trend?: { positive?: boolean; value: string }; value: string }) {
  const [expanded, setExpanded] = useState(false);
  const toggle = () => setExpanded((current) => !current);
  return <GlassCard role="button" tabIndex={0} aria-label={`View detail for ${label}`} aria-expanded={expanded} onClick={toggle} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggle(); } }} className="ss-interactive group cursor-pointer p-5"><div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-300/15 blur-2xl transition group-hover:bg-cyan-300/25 dark:bg-cyan-400/10" /><p className="relative text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p><div className="relative mt-3 flex items-end justify-between gap-3"><p className="text-3xl font-semibold tracking-[-.04em] text-slate-950 dark:text-white">{value}</p>{trend ? <TrendIndicator {...trend} /> : null}</div>{expanded ? <p className="relative mt-3 border-t border-slate-200/70 pt-3 text-xs leading-5 text-slate-500 dark:border-white/10 dark:text-slate-300">This metric is synchronized from the current operational data set.</p> : null}</GlassCard>;
}

export function ProgressBar({ label, value }: { label: string; value: number }) {
  return <div><div className="mb-2 flex justify-between text-xs"><span className="font-medium text-slate-600 dark:text-slate-300">{label}</span><span className="font-semibold text-slate-900 dark:text-white">{value}%</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100/90 p-px shadow-inner dark:bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 shadow-[0_0_12px_rgb(34_211_238_/_0.5)] transition-all duration-500" style={{ width: `${Math.max(0, Math.min(value, 100))}%` }} /></div></div>;
}

export function ProgressRing({ label, value }: { label: string; value: number }) {
  return <div className="relative grid h-24 w-24 place-items-center rounded-full" style={{ background: `conic-gradient(#22d3ee ${value * 3.6}deg, rgb(148 163 184 / .18) 0deg)` }}><div className="grid h-[4.75rem] w-[4.75rem] place-items-center rounded-full bg-white text-center dark:bg-slate-900"><span className="text-lg font-semibold">{value}%</span><span className="text-[9px] uppercase tracking-wide text-slate-500">{label}</span></div></div>;
}

export function StatusBadge({ label, tone = 'neutral' }: { label: string; tone?: 'neutral' | 'success' | 'warning' | 'danger' }) {
  const styles = { danger: 'bg-rose-500/10 text-rose-700 dark:text-rose-300', neutral: 'bg-slate-500/10 text-slate-600 dark:text-slate-300', success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300', warning: 'bg-amber-400/15 text-amber-700 dark:text-amber-300' };
  return <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold', styles[tone])}><span className="h-1.5 w-1.5 rounded-full bg-current" />{label}</span>;
}

export function HealthIndicator({ healthy, label }: { healthy: boolean; label: string }) {
  const Icon = healthy ? CheckCircle2 : CircleDashed;
  return <span className={cn('inline-flex items-center gap-2 text-sm', healthy ? 'text-emerald-600 dark:text-emerald-300' : 'text-amber-600 dark:text-amber-300')}><Icon size={16} />{label}</span>;
}

export function ActivityBadge({ label }: { label: string }) { return <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-300"><Activity size={13} className="text-cyan-500" />{label}</span>; }

export const KpiCard = MetricCard;
export const StatisticCard = MetricCard;
export const StatusPill = StatusBadge;
