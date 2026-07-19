import { AlertCircle, ArrowLeft, Plus, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

import { ConfirmationDialog, Dialog, EmptyState, GlassCard, PremiumButton, SlidePanel, Spinner, StatusBadge } from '@/components/design-system';
import { ApiRequestError, authenticationApi } from '@/services/api-client';

export type StatusTone = 'danger' | 'neutral' | 'success' | 'warning';

export function statusTone(status: string): StatusTone {
  if (['AVAILABLE', 'COMPLETED', 'CONFIRMED', 'FINISHED', 'LIVE'].includes(status)) return 'success';
  if (['CANCELLED', 'CLOSED'].includes(status)) return 'danger';
  if (['CHECKED_IN', 'MAINTENANCE', 'PENDING', 'RESERVED', 'SCHEDULED'].includes(status)) return 'warning';
  return 'neutral';
}

export function formatDateTime(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Schedule unavailable' : new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

export function safeText(value: unknown, fallback = 'Untitled record'): string {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback;
}

export function isAuthenticationError(error: unknown): boolean {
  return error instanceof ApiRequestError && (error.status === 401 || error.status === 403);
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiRequestError && error.status === 401) return 'Sign in required. Your workspace session does not include access to this operational view.';
  if (error instanceof ApiRequestError && error.status === 403) return 'Your current workspace role does not have access to this operational view.';
  if (error instanceof ApiRequestError && error.status >= 500) return 'The platform service is temporarily unavailable. Please try again shortly.';
  return error instanceof Error ? error.message : 'The operational data could not be loaded.';
}

export function OperationsPage({ action, children, description, eyebrow, icon: Icon, title }: { action?: ReactNode; children: ReactNode; description: string; eyebrow: string; icon: LucideIcon; title: string }) {
  return <main className="page-enter mx-auto w-full max-w-[1600px] space-y-7 px-4 py-6 sm:px-6 lg:px-8"><header className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div className="max-w-3xl"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/70 bg-cyan-50/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-cyan-700 dark:border-cyan-400/15 dark:bg-cyan-400/10 dark:text-cyan-200"><Icon size={13} />{eyebrow}</div><h1 className="text-3xl font-semibold tracking-[-.045em] text-slate-950 sm:text-4xl dark:text-white">{title}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p></div>{action}</header>{children}</main>;
}

export function DataState({ children, error, isLoading, onRetry, title }: { children: ReactNode; error: unknown; isLoading: boolean; onRetry(): void; title: string }) {
  const [signInOpen, setSignInOpen] = useState(false);
  if (isLoading) return <div className="grid min-h-80 place-items-center"><div className="grid justify-items-center gap-3 text-sm text-slate-500"><Spinner label={`Loading ${title}`} /><span>Synchronizing {title.toLowerCase()}…</span></div></div>;
  if (error === null || error === undefined) return <>{children}</>;
  const authenticationError = isAuthenticationError(error);
  return <><GlassCard className="mx-auto max-w-xl p-7"><div className="grid justify-items-center text-center"><span className={`grid h-12 w-12 place-items-center rounded-2xl ${authenticationError ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-200' : 'bg-rose-500/10 text-rose-600 dark:text-rose-300'}`}><AlertCircle size={22} /></span><h2 className="mt-4 text-lg font-semibold">{authenticationError ? 'Authentication required' : `Unable to load ${title.toLowerCase()}`}</h2><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">{getErrorMessage(error)}</p><PremiumButton className="mt-5" variant="outline" onClick={authenticationError ? () => setSignInOpen(true) : onRetry}><RefreshCw size={15} />{authenticationError ? 'Sign in to continue' : 'Try again'}</PremiumButton></div></GlassCard><SessionSignInDialog open={signInOpen} onClose={() => setSignInOpen(false)} onAuthenticated={() => { setSignInOpen(false); onRetry(); }} /></>;
}

function SessionSignInDialog({ onAuthenticated, onClose, open }: { onAuthenticated(): void; onClose(): void; open: boolean }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await authenticationApi.login(email, password);
      onAuthenticated();
    } catch (loginError: unknown) {
      setError(getErrorMessage(loginError));
    } finally {
      setSubmitting(false);
    }
  };
  return <Dialog open={open} onClose={onClose} title="Sign in to StadiumSphere"><form onSubmit={submit} className="grid gap-4"><p className="text-sm leading-6 text-slate-500 dark:text-slate-300">Use your workspace credentials to access protected operational resources.</p><label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><span>Email</span><input required autoComplete="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="focus-ring h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none dark:border-white/15 dark:bg-white/5" /></label><label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><span>Password</span><input required autoComplete="current-password" minLength={12} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="focus-ring h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none dark:border-white/15 dark:bg-white/5" /></label>{error !== null ? <p role="alert" className="text-sm text-rose-600 dark:text-rose-300">{error}</p> : null}<div className="flex justify-end gap-2"><PremiumButton type="button" variant="ghost" onClick={onClose}>Cancel</PremiumButton><PremiumButton type="submit" variant="secondary" loading={submitting}>Sign in</PremiumButton></div></form></Dialog>;
}

export interface FormField { label: string; name: string; options?: readonly { label: string; value: string }[]; placeholder?: string; required?: boolean; type?: 'datetime-local' | 'number' | 'select' | 'text'; }

export function ResourceFormDialog({ fields, initialValues = {}, onClose, onSubmit, open, submitting, submitLabel = 'Create', title }: { fields: readonly FormField[]; initialValues?: Record<string, string>; onClose(): void; onSubmit(values: Record<string, string>): void; open: boolean; submitting: boolean; submitLabel?: string; title: string }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const initialValuesRef = useRef(initialValues);
  initialValuesRef.current = initialValues;
  useEffect(() => { if (open) setValues(initialValuesRef.current); }, [open]);
  return <Dialog open={open} onClose={onClose} title={title}><form onSubmit={(event) => { event.preventDefault(); onSubmit(values); }} className="grid gap-4">{fields.map((field, index) => <label key={field.name} className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><span>{field.label}</span>{field.type === 'select' ? <select autoFocus={index === 0} required={field.required} value={values[field.name] ?? ''} onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))} className="focus-ring h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-cyan-400 dark:border-white/15 dark:bg-white/5"><option value="">Select {field.label.toLowerCase()}</option>{field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : <input autoFocus={index === 0} required={field.required} type={field.type ?? 'text'} value={values[field.name] ?? ''} onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))} placeholder={field.placeholder} className="focus-ring h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-400 dark:border-white/15 dark:bg-white/5" />}</label>)}<div className="mt-2 flex justify-end gap-2"><PremiumButton type="button" variant="ghost" onClick={onClose}>Cancel</PremiumButton><PremiumButton type="submit" loading={submitting} variant="secondary"><Plus size={16} />{submitLabel}</PremiumButton></div></form></Dialog>;
}

export function ResourceDrawer({ children, onClose, open, title }: { children: ReactNode; onClose(): void; open: boolean; title: string }) { return <SlidePanel open={open} onClose={onClose} title={title}>{children}</SlidePanel>; }

export function ResourceCrudControls({ deleteLabel = 'Delete record', fields, initialValues, onDelete, onUpdate, removePending, title, updatePending }: { deleteLabel?: string; fields: readonly FormField[]; initialValues: Record<string, string>; onDelete(): void; onUpdate(values: Record<string, string>): void; removePending: boolean; title: string; updatePending: boolean }) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  return <><div className="grid gap-2"><PremiumButton variant="outline" onClick={() => setEditOpen(true)}>Edit details</PremiumButton><PremiumButton variant="danger" loading={removePending} onClick={() => setDeleteOpen(true)}>{deleteLabel}</PremiumButton></div><ResourceFormDialog fields={fields} initialValues={initialValues} open={editOpen} onClose={() => setEditOpen(false)} onSubmit={(values) => { onUpdate(values); setEditOpen(false); }} submitting={updatePending} submitLabel="Save changes" title={`Edit ${title}`} /><ConfirmationDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={() => { if (!removePending) onDelete(); }} confirmLabel={removePending ? 'Deleting…' : deleteLabel} title={`Delete ${title}?`} description="This action cannot be undone. The platform will protect records that are still required by related operations." /></>;
}

export function EmptyResource({ action, description, icon: Icon, title }: { action: ReactNode; description: string; icon: LucideIcon; title: string }) { return <EmptyState icon={<Icon size={22} />} title={title} description={description} action={action} />; }
export function Status({ value }: { value: string }) { return <StatusBadge label={value.replaceAll('_', ' ')} tone={statusTone(value)} />; }
export function BackButton({ onClick }: { onClick(): void }) { return <motion.button whileHover={{ x: -2 }} type="button" onClick={onClick} className="focus-ring inline-flex items-center gap-2 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"><ArrowLeft size={16} />Back to overview</motion.button>; }
