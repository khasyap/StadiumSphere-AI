import type { ReactNode } from 'react';

import { GlassCard, CardHeader } from './cards';

const bars = [38, 64, 48, 82, 59, 91, 70];
export function ChartCard({ children, title, type }: { children: ReactNode; title: string; type: string }) { return <GlassCard className="p-5"><CardHeader eyebrow={type} title={title} /><div className="mt-6 h-48">{children}</div></GlassCard>; }
export function BarChartCard({ title = 'Operational distribution' }: { title?: string }) { return <ChartCard type="Bar chart" title={title}><div className="flex h-full items-end justify-between gap-2">{bars.map((height, index) => <div key={index} className="flex flex-1 flex-col justify-end"><div className="rounded-t-lg bg-gradient-to-t from-cyan-500 to-blue-500 opacity-85" style={{ height: `${height}%` }} /></div>)}</div></ChartCard>; }
export function LineChartCard({ title = 'Platform momentum' }: { title?: string }) { return <ChartCard type="Line chart" title={title}><svg viewBox="0 0 300 120" role="img" aria-label={title} className="h-full w-full overflow-visible"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#22d3ee" stopOpacity=".35" /><stop offset="1" stopColor="#22d3ee" stopOpacity="0" /></linearGradient></defs><path d="M0,95 C35,80 48,99 78,65 S120,55 145,68 S188,22 215,42 S255,25 300,10 L300,120 L0,120 Z" fill="url(#chart-fill)" /><path d="M0,95 C35,80 48,99 78,65 S120,55 145,68 S188,22 215,42 S255,25 300,10" fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" /></svg></ChartCard>; }
export function DonutChartCard({ title = 'Readiness index' }: { title?: string }) { return <ChartCard type="Donut chart" title={title}><div className="grid h-full place-items-center"><div className="grid h-32 w-32 place-items-center rounded-full" style={{ background: 'conic-gradient(#22d3ee 0 72%, #818cf8 72% 88%, rgb(148 163 184 / .2) 88% 100%)' }}><div className="grid h-[5.75rem] w-[5.75rem] place-items-center rounded-full bg-white text-center dark:bg-slate-900"><span className="text-2xl font-semibold">72</span><span className="text-[10px] uppercase tracking-wide text-slate-500">ready</span></div></div></div></ChartCard>; }
export const AreaChartCard = LineChartCard;
export const PieChartCard = DonutChartCard;
export const HeatmapChartCard = BarChartCard;
