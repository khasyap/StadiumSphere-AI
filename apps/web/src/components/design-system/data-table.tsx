import { ArrowDownUp, ChevronLeft, ChevronRight, MoreHorizontal, Search } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';

import { IconButton, PremiumButton } from './button';
import { EmptyState } from './feedback';

export interface DataColumn<T> {
  cell(item: T): ReactNode;
  header: string;
  id: string;
  sortable?: boolean;
}

interface PremiumDataTableProps<T> {
  columns: readonly DataColumn<T>[];
  emptyMessage?: string;
  items: readonly T[];
  onBulkAction?(): void;
  onFilter?(): void;
  onRowAction?(item: T): void;
  onSearch?(query: string): void;
}

export function PremiumDataTable<T>({
  columns,
  emptyMessage = 'No records are available yet.',
  items,
  onBulkAction,
  onFilter,
  onRowAction,
  onSearch,
}: PremiumDataTableProps<T>) {
  const [bulkOpen, setBulkOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);

  if (items.length === 0) {
    return <EmptyState icon={<Search size={22} />} title="Nothing to show" description={emptyMessage} />;
  }

  return <div className="ss-surface rounded-2xl">
    <div className="flex flex-col gap-3 border-b border-slate-200/80 bg-white/30 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-white/[.02]">
      <label className="relative max-w-xs flex-1">
        <Search aria-hidden="true" size={15} className="absolute left-3 top-3 text-slate-400" />
        <input aria-label="Search table" value={query} onChange={(event) => { setQuery(event.target.value); onSearch?.(event.target.value); }} placeholder="Search records" className="focus-ring h-10 w-full rounded-xl border border-transparent bg-slate-100/80 pl-9 pr-3 text-sm outline-none transition focus:border-cyan-300 focus:bg-white dark:bg-white/[.07] dark:focus:bg-white/[.11]" />
      </label>
      <div className="flex gap-2">
        <PremiumButton variant="outline" size="sm" aria-pressed={filterOpen} onClick={() => { setFilterOpen((open) => !open); onFilter?.(); }}>Filter</PremiumButton>
        <PremiumButton variant="ghost" size="sm" aria-pressed={bulkOpen} onClick={() => { setBulkOpen((open) => !open); onBulkAction?.(); }}>Bulk actions</PremiumButton>
      </div>
    </div>
    {filterOpen ? <div className="border-b border-cyan-200/60 bg-gradient-to-r from-cyan-50/80 to-blue-50/40 px-5 py-3 text-xs font-medium text-cyan-800 dark:border-cyan-400/15 dark:from-cyan-400/10 dark:to-blue-400/5 dark:text-cyan-100">Filter controls are ready for the consuming page to provide.</div> : null}
    {bulkOpen ? <div className="border-b border-violet-200/60 bg-gradient-to-r from-violet-50/75 to-cyan-50/40 px-5 py-3 text-xs font-medium text-violet-800 dark:border-violet-400/15 dark:from-violet-400/10 dark:to-cyan-400/5 dark:text-violet-100">Bulk actions are ready for the consuming page to provide.</div> : null}
    <div className="overflow-x-auto">
      <table className="w-full min-w-[37.5rem] text-left text-sm">
        <thead className="border-b border-slate-200/80 bg-slate-50/70 text-xs uppercase tracking-[.12em] text-slate-500 dark:border-white/8 dark:bg-white/[.035]">
          <tr>
            {columns.map((column) => <th key={column.id} scope="col" className="px-5 py-3.5 font-semibold"><span className="inline-flex items-center gap-1.5">{column.header}{column.sortable ? <button type="button" aria-label={`Sort by ${column.header}`} aria-pressed={sortColumn === column.id} onClick={() => setSortColumn((current) => current === column.id ? null : column.id)} className="focus-ring rounded text-slate-400 transition hover:text-cyan-600 dark:hover:text-cyan-300"><ArrowDownUp size={13} /></button> : null}</span></th>)}
            {onRowAction ? <th className="px-5 py-3" aria-label="Row actions" /> : null}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100/90 dark:divide-white/[.07]">
          {items.map((item, index) => <tr key={index} className="transition-colors hover:bg-cyan-50/45 dark:hover:bg-cyan-400/[.045]">{columns.map((column) => <td key={column.id} className="px-5 py-4 text-slate-700 dark:text-slate-200">{column.cell(item)}</td>)}{onRowAction ? <td className="px-5 py-4"><IconButton ariaLabel="Open row actions" onClick={() => onRowAction(item)} className="h-8 w-8"><MoreHorizontal size={16} /></IconButton></td> : null}</tr>)}
        </tbody>
      </table>
    </div>
    <div className="flex items-center justify-between border-t border-slate-200/80 bg-white/25 px-5 py-3 text-xs text-slate-500 dark:border-white/10 dark:bg-white/[.02]">
      <span>Showing {items.length} items · Page {page}</span>
      <span className="flex gap-1"><IconButton ariaLabel="Previous page" disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))} className="h-8 w-8"><ChevronLeft size={16} /></IconButton><IconButton ariaLabel="Next page" onClick={() => setPage((current) => current + 1)} className="h-8 w-8"><ChevronRight size={16} /></IconButton></span>
    </div>
  </div>;
}
