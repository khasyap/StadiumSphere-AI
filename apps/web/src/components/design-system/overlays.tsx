import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

import { PremiumButton } from './button';

export function Dialog({ children, onClose, open, title }: { children: ReactNode; onClose(): void; open: boolean; title: string }) {
  const dialogRef = useRef<HTMLElement | null>(null);
  useEffect(() => { if (!open) return undefined; const focusable = () => Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])') ?? []); const frame = window.requestAnimationFrame(() => focusable()[0]?.focus()); const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); if (event.key !== 'Tab') return; const items = focusable(); if (items.length === 0) return; const first = items[0]!; const last = items[items.length - 1]!; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } }; window.addEventListener('keydown', onKey); return () => { window.cancelAnimationFrame(frame); window.removeEventListener('keydown', onKey); }; }, [onClose, open]);
  return <AnimatePresence>{open ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4"><motion.section ref={dialogRef} initial={{ opacity: 0, scale: .97, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .97, y: 12 }} className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-slate-900"><header className="flex items-center justify-between gap-4"><h2 className="text-lg font-semibold">{title}</h2><button type="button" aria-label="Close dialog" onClick={onClose} className="focus-ring rounded-lg p-1"><X size={18} /></button></header><div className="mt-5">{children}</div></motion.section></motion.div> : null}</AnimatePresence>;
}

export function ConfirmationDialog({ confirmLabel = 'Confirm', description, onClose, onConfirm, open, title }: { confirmLabel?: string; description: string; onClose(): void; onConfirm(): void; open: boolean; title: string }) { return <Dialog open={open} onClose={onClose} title={title}><p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p><div className="mt-6 flex justify-end gap-2"><PremiumButton variant="ghost" onClick={onClose}>Cancel</PremiumButton><PremiumButton variant="primary" onClick={onConfirm}>{confirmLabel}</PremiumButton></div></Dialog>; }

export function SlidePanel({ children, onClose, open, title }: { children: ReactNode; onClose(): void; open: boolean; title: string }) { return <AnimatePresence>{open ? <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ ease: 'easeOut' }} role="dialog" aria-modal="true" aria-label={title} className="fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-slate-900"><header className="flex items-center justify-between"><h2 className="font-semibold">{title}</h2><button type="button" aria-label="Close panel" onClick={onClose} className="focus-ring rounded-lg p-1"><X size={18} /></button></header><div className="mt-6">{children}</div></motion.aside> : null}</AnimatePresence>; }

export const Drawer = SlidePanel;
export const DeleteDialog = ConfirmationDialog;
export const InformationDialog = Dialog;
export const BottomSheet = SlidePanel;
