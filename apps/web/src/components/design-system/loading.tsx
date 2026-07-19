import { LoaderCircle } from 'lucide-react';

import { cn } from '@/lib/cn';

export function Spinner({ label = 'Loading' }: { label?: string }) { return <span role="status" aria-label={label} className="inline-flex"><LoaderCircle size={20} className="animate-spin text-cyan-500" /></span>; }
export function PageLoader({ label = 'Preparing workspace' }: { label?: string }) { return <div className="grid min-h-72 place-items-center"><div className="grid justify-items-center gap-3"><Spinner label={label} /><span className="text-sm text-slate-500 dark:text-slate-300">{label}</span></div></div>; }
export function Skeleton({ className }: { className?: string }) { return <div className={cn('animate-pulse rounded-lg bg-slate-200/80 dark:bg-white/10', className)} />; }
export function SkeletonCards({ count = 3 }: { count?: number }) { return <div className="grid gap-4 md:grid-cols-3">{Array.from({ length: count }, (_, index) => <div key={index} className="surface-card space-y-4 p-5"><Skeleton className="h-3 w-24" /><Skeleton className="h-8 w-2/3" /><Skeleton className="h-3 w-full" /></div>)}</div>; }
export function SkeletonTable() { return <div className="surface-card space-y-4 p-5">{Array.from({ length: 5 }, (_, index) => <Skeleton key={index} className="h-10 w-full" />)}</div>; }
export function ProgressOverlay({ label = 'Updating workspace' }: { label?: string }) { return <div role="status" className="absolute inset-0 grid place-items-center rounded-2xl bg-slate-950/20 backdrop-blur-sm"><div className="rounded-xl bg-white px-4 py-3 text-sm font-medium shadow-xl dark:bg-slate-900"><span className="inline-flex items-center gap-2"><Spinner />{label}</span></div></div>; }
export const SkeletonChart = SkeletonCards;
export const SkeletonForm = SkeletonTable;
export const LoadingTable = SkeletonTable;
