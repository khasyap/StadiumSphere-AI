import { Search, Upload } from 'lucide-react';
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

function FieldFrame({ children, error, helper, label }: { children: ReactNode; error?: string | undefined; helper?: string | undefined; label?: string | undefined }) {
  return <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">{label ? <span>{label}</span> : null}{children}{error ? <span role="alert" className="text-xs font-medium text-rose-600 dark:text-rose-300">{error}</span> : helper ? <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{helper}</span> : null}</label>;
}

const inputClassName = 'focus-ring h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 dark:border-white/15 dark:bg-white/5 dark:text-white';

export function TextInput({ error, helper, label, ...props }: InputHTMLAttributes<HTMLInputElement> & { error?: string; helper?: string; label?: string }) { return <FieldFrame error={error} helper={helper} label={label}><input className={cn(inputClassName, error ? 'border-rose-400' : '')} {...props} /></FieldFrame>; }

export function SearchInput({ label = 'Search', ...props }: InputHTMLAttributes<HTMLInputElement> & { label?: string }) { return <FieldFrame label={label}><span className="relative"><Search aria-hidden="true" size={16} className="absolute left-3 top-3 text-slate-400" /><input type="search" className={cn(inputClassName, 'pl-9')} {...props} /></span></FieldFrame>; }

export function TextArea({ error, helper, label, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string; helper?: string; label?: string }) { return <FieldFrame error={error} helper={helper} label={label}><textarea className={cn('focus-ring min-h-28 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-400 dark:border-white/15 dark:bg-white/5', error ? 'border-rose-400' : '')} {...props} /></FieldFrame>; }

export function SelectInput({ children, label, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode; label?: string }) { return <FieldFrame label={label}><select className={inputClassName} {...props}>{children}</select></FieldFrame>; }

export function Toggle({ checked, label, onChange }: { checked: boolean; label: string; onChange(checked: boolean): void }) { return <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 p-3 dark:border-white/10"><span className="text-sm font-medium">{label}</span><input aria-label={label} type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="peer sr-only" /><span className={cn('relative h-6 w-11 rounded-full transition after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition', checked ? 'bg-cyan-500 after:translate-x-5' : 'bg-slate-300 dark:bg-white/20')} /></label>; }

export function FileUploadPlaceholder({ onOpen }: { onOpen(): void }) { return <button type="button" onClick={onOpen} className="focus-ring flex w-full flex-col items-center rounded-2xl border border-dashed border-slate-300 px-5 py-8 text-center transition hover:border-cyan-400 hover:bg-cyan-50/50 dark:border-white/15 dark:hover:bg-cyan-400/5"><Upload size={22} className="text-cyan-500" /><span className="mt-3 text-sm font-semibold">Upload a document</span><span className="mt-1 text-xs text-slate-500">File processing will be available in a future module.</span></button>; }

export function DatePickerPlaceholder({ onOpen }: { onOpen(): void }) { return <button type="button" onClick={onOpen} className={cn(inputClassName, 'text-left text-slate-500')}>Select a date</button>; }

export function PasswordInput(props: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { error?: string; helper?: string; label?: string }) { return <TextInput type="password" autoComplete="current-password" {...props} />; }

export function AutocompleteInput({ label, options, ...props }: InputHTMLAttributes<HTMLInputElement> & { label?: string; options: readonly string[] }) {
  const listId = `autocomplete-${props.name ?? 'field'}`;
  return <FieldFrame label={label}><><input list={listId} className={inputClassName} {...props} /><datalist id={listId}>{options.map((option) => <option key={option} value={option} />)}</datalist></></FieldFrame>;
}

export function CheckboxField({ checked, label, onChange }: { checked: boolean; label: string; onChange(checked: boolean): void }) {
  return <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="focus-ring h-4 w-4 rounded border-slate-300 text-cyan-500" />{label}</label>;
}

export function RadioGroup({ label, onChange, options, value }: { label: string; onChange(value: string): void; options: readonly { label: string; value: string }[]; value: string }) {
  return <fieldset className="grid gap-2"><legend className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</legend><div className="flex flex-wrap gap-3">{options.map((option) => <label key={option.value} className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><input type="radio" name={label} value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} className="focus-ring h-4 w-4 border-slate-300 text-cyan-500" />{option.label}</label>)}</div></fieldset>;
}

export function SliderInput({ label, max = 100, min = 0, onChange, value }: { label: string; max?: number; min?: number; onChange(value: number): void; value: number }) {
  return <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><span className="flex justify-between"><span>{label}</span><span>{value}</span></span><input aria-label={label} type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} className="accent-cyan-500" /></label>;
}

export const Switch = Toggle;
