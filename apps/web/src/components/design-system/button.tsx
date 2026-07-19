import { motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type ButtonVariant = 'danger' | 'ghost' | 'outline' | 'primary' | 'secondary' | 'success' | 'warning';
type ButtonSize = 'lg' | 'md' | 'sm';

const variants: Record<ButtonVariant, string> = {
  danger: 'bg-gradient-to-b from-rose-500 to-rose-600 text-white shadow-rose-600/25 hover:shadow-rose-600/35',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-950/[.045] dark:text-slate-200 dark:hover:bg-white/10',
  outline: 'border border-slate-200/90 bg-white/70 text-slate-800 shadow-sm hover:border-cyan-300 hover:bg-cyan-50/80 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-cyan-400/10',
  primary: 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white shadow-slate-950/25 hover:shadow-slate-950/35 dark:from-white dark:to-slate-200 dark:text-slate-950',
  secondary: 'bg-gradient-to-br from-cyan-300 to-cyan-500 text-slate-950 shadow-cyan-500/25 hover:shadow-cyan-500/40',
  success: 'bg-gradient-to-b from-emerald-500 to-emerald-600 text-white shadow-emerald-600/25 hover:shadow-emerald-600/35',
  warning: 'bg-gradient-to-b from-amber-300 to-amber-400 text-amber-950 shadow-amber-400/25 hover:shadow-amber-400/35',
};

const sizes: Record<ButtonSize, string> = { lg: 'h-12 px-5 text-sm', md: 'h-10 px-4 text-sm', sm: 'h-8 px-3 text-xs' };

export interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export function PremiumButton({ children, className, disabled, loading = false, size = 'md', variant = 'primary', ...props }: PremiumButtonProps) {
  return <motion.div whileHover={disabled || loading ? {} : { y: -1 }} whileTap={disabled || loading ? {} : { scale: .98 }} transition={{ type: 'spring', stiffness: 420, damping: 20 }} className="inline-flex"><button className={cn('ss-button focus-ring inline-flex items-center justify-center gap-2 rounded-xl font-semibold shadow-lg transition-[box-shadow,background-color,border-color] disabled:pointer-events-none disabled:opacity-50', variants[variant], sizes[size], className)} disabled={disabled || loading} {...props}>{loading ? <LoaderCircle aria-label="Loading" size={16} className="animate-spin" /> : null}<span className="relative z-10 inline-flex items-center gap-2">{children}</span></button></motion.div>;
}

export function IconButton({ ariaLabel, children, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { ariaLabel: string; children: ReactNode }) {
  return <motion.div whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: .95 }} transition={{ type: 'spring', stiffness: 430, damping: 22 }} className="inline-flex"><button aria-label={ariaLabel} className={cn('ss-icon-button focus-ring grid h-10 w-10 place-items-center rounded-xl border border-slate-200/90 bg-white/75 text-slate-700 shadow-sm hover:border-cyan-300 hover:text-cyan-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-200', className)} {...props}>{children}</button></motion.div>;
}

export function FloatingActionButton({ children, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return <motion.div whileHover={{ scale: 1.06, rotate: 1 }} whileTap={{ scale: .94 }} className="inline-flex"><button className={cn('focus-ring inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500 text-slate-950 shadow-xl shadow-cyan-500/30', className)} {...props}>{children}</button></motion.div>;
}
