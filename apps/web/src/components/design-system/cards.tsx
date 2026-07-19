import { motion } from 'framer-motion';
import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

export function GlassCard({ children, className, ...props }: HTMLAttributes<HTMLElement> & { children: ReactNode }) {
  return <section className={cn('ss-surface rounded-2xl', className)} {...props}>{children}</section>;
}

export function InteractiveCard({ children, className, ...props }: HTMLAttributes<HTMLElement> & { children: ReactNode }) {
  return <motion.div whileHover={{ y: -4 }} transition={{ duration: .24, ease: 'easeOut' }}><section className={cn('ss-surface ss-interactive cursor-pointer rounded-2xl p-5', className)} {...props}>{children}</section></motion.div>;
}

export function CardHeader({ eyebrow, title, action }: { action?: ReactNode; eyebrow?: string; title: string }) {
  return <header className="flex items-start justify-between gap-4"><div><p className="ss-kicker text-slate-400">{eyebrow}</p><h2 className="mt-1.5 text-base font-semibold tracking-[-.02em] text-slate-950 dark:text-white">{title}</h2></div>{action}</header>;
}

export function InsightCard({ children, title = 'AI insight' }: { children: ReactNode; title?: string }) {
  return <GlassCard className="p-5"><div className="mb-5 flex items-center gap-2"><div className="h-1 w-14 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_14px_rgb(34_211_238_/_0.55)]" /><span className="h-1.5 w-1.5 rounded-full bg-violet-400" /></div><CardHeader eyebrow="StadiumSphere intelligence" title={title} /><div className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{children}</div></GlassCard>;
}
