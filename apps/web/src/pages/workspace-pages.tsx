import { useState } from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  BellRing,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Code2,
  Command,
  Compass,
  Copy,
  FileText,
  Gauge,
  Globe2,
  KeyRound,
  Layers3,
  LifeBuoy,
  Palette,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Users,
  WandSparkles,
} from 'lucide-react';

import {
  Accordion,
  AIAssistantCard,
  AIChatBubble,
  BarChartCard,
  DonutChartCard,
  GlassCard,
  LineChartCard,
  MetricCard,
  PremiumButton,
  ProgressBar,
  PromptBox,
  SegmentedControl,
  StatusBadge,
  Timeline,
  Toggle,
} from '@/components/design-system';
import { useTheme } from '@/contexts/theme-context';
import { useToast } from '@/contexts/toast-context';
import { routePaths } from '@/routes/route-definitions';
import { apiRequest } from '@/services/api-client';

function WorkspacePage({ children, description, eyebrow, title }: { children: React.ReactNode; description: string; eyebrow: string; title: string }) {
  return <main className="page-enter mx-auto w-full max-w-[1600px] space-y-7 px-4 py-6 sm:px-6 lg:px-8"><header className="max-w-3xl"><p className="ss-kicker text-cyan-700 dark:text-cyan-200">{eyebrow}</p><h1 className="mt-3 text-3xl font-semibold tracking-[-.05em] text-slate-950 sm:text-4xl dark:text-white">{title}</h1><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p></header>{children}</main>;
}

interface HealthSnapshot { environment?: string; status?: string; timestamp?: string; uptime?: number; version?: string; }

export function DashboardPage() {
  const { show } = useToast();
  const health = useQuery({ queryKey: ['platform-health'], queryFn: () => apiRequest<HealthSnapshot>('/health'), retry: 1 });
  const signal = health.data?.status === 'ok' ? 'Connected' : health.data?.status === 'degraded' ? 'Degraded' : health.isError ? 'Unavailable' : 'Checking';
  return <WorkspacePage eyebrow="Mission control" title="Global Operations" description="A concise command surface for stadium readiness, matchday coordination, and the decisions that move the platform forward."><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><MetricCard label="Platform signal" value={signal} trend={{ positive: signal === 'Connected', value: 'Live health' }} /><MetricCard label="Operational modules" value="7" trend={{ positive: true, value: 'Connected' }} /><MetricCard label="Decision readiness" value="92%" trend={{ positive: true, value: 'Stable' }} /><GlassCard className="p-5"><div className="flex items-center justify-between"><div><p className="ss-kicker text-slate-400">Control room</p><p className="mt-3 text-lg font-semibold">World Cup 2026</p></div><Gauge className="text-cyan-500" size={25} /></div><p className="mt-4 text-sm text-slate-500 dark:text-slate-300">{health.data?.version ? `API ${health.data.version}` : 'Verifying service health'}</p></GlassCard></section><section className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]"><GlassCard className="p-6"><div className="flex items-center justify-between gap-4"><div><p className="ss-kicker text-slate-400">Priority pathways</p><h2 className="mt-2 text-xl font-semibold tracking-[-.03em]">Run the next operation</h2></div><Command className="text-cyan-500" size={21} /></div><div className="mt-6 grid gap-3 sm:grid-cols-3"><Link to={routePaths.application.events} className="focus-ring rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 dark:border-white/10 dark:bg-white/[.035] dark:hover:bg-cyan-400/10"><Clock3 className="text-cyan-500" size={18} /><p className="mt-5 font-semibold">Event desk</p><p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-300">Coordinate live windows</p></Link><Link to={routePaths.application.bookings} className="focus-ring rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50 dark:border-white/10 dark:bg-white/[.035] dark:hover:bg-violet-400/10"><Layers3 className="text-violet-500" size={18} /><p className="mt-5 font-semibold">Reservations</p><p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-300">Review booking posture</p></Link><button type="button" onClick={() => show('The operational briefing has been refreshed.')} className="focus-ring rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-left transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/[.035] dark:hover:bg-emerald-400/10"><WandSparkles className="text-emerald-500" size={18} /><p className="mt-5 font-semibold">Briefing</p><p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-300">Refresh operational focus</p></button></div></GlassCard><GlassCard className="p-6"><p className="ss-kicker text-slate-400">Readiness pulse</p><p className="mt-3 text-lg font-semibold">Service health is monitored continuously</p><div className="mt-7 space-y-5"><ProgressBar label="Infrastructure readiness" value={92} /><ProgressBar label="Operational coverage" value={84} /><button type="button" onClick={() => void health.refetch()} className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:text-cyan-900 dark:text-cyan-200"><Activity size={16} />Refresh health signal</button></div></GlassCard></section></WorkspacePage>;
}

export function AnalyticsPage() {
  const [period, setPeriod] = useState('30 days');
  const { show } = useToast();
  return <WorkspacePage eyebrow="Business intelligence" title="Operational Analytics" description="Explore capacity, attendance and booking momentum through an executive-ready intelligence workspace."><div className="flex flex-wrap items-center justify-between gap-3"><SegmentedControl options={['7 days', '30 days', 'Season']} value={period} onChange={setPeriod} /><PremiumButton variant="outline" onClick={() => show(`Analytics snapshot for ${period} prepared.`)}><FileText size={16} />Export briefing</PremiumButton></div><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><MetricCard label="Attendance trend" value="+18.4%" trend={{ positive: true, value: period }} /><MetricCard label="Booking velocity" value="2.6×" trend={{ positive: true, value: 'Momentum' }} /><MetricCard label="Capacity utilization" value="78%" trend={{ positive: true, value: 'Network average' }} /><MetricCard label="Event completion" value="94%" trend={{ positive: true, value: 'On schedule' }} /></section><section className="grid gap-5 xl:grid-cols-2"><LineChartCard title="Attendance momentum" /><BarChartCard title="Stadium utilization" /><DonutChartCard title="Event status distribution" /><GlassCard className="p-6"><div className="flex items-center justify-between"><div><p className="ss-kicker text-slate-400">Organization distribution</p><h2 className="mt-2 text-lg font-semibold">Participation mix</h2></div><BarChart3 className="text-violet-500" size={21} /></div><div className="mt-7 space-y-5"><ProgressBar label="National associations" value={44} /><ProgressBar label="Venue operators" value={31} /><ProgressBar label="Competition partners" value={25} /></div></GlassCard></section></WorkspacePage>;
}

export function ActivityPage() {
  const [filter, setFilter] = useState('All signals');
  const { show } = useToast();
  const entries = filter === 'Warnings' ? [{ detail: 'Venue reservation rules require an authenticated review.', title: 'Access review required' }] : [{ detail: 'Organization registry synchronized with the current workspace.', title: 'Organization signal received' }, { detail: 'Stadium operational posture is available from the infrastructure control center.', title: 'Infrastructure status reviewed' }, { detail: 'Booking lifecycle changes are grouped into the reservation ledger.', title: 'Reservation timeline updated' }];
  return <WorkspacePage eyebrow="Operational timeline" title="Activity Stream" description="A focused audit view for the signals, decisions, and operational moments that matter right now."><div className="flex flex-wrap items-center justify-between gap-3"><SegmentedControl options={['All signals', 'Operations', 'Warnings']} value={filter} onChange={setFilter} /><PremiumButton variant="outline" onClick={() => show('Activity view marked as reviewed.')}><CheckCircle2 size={16} />Mark reviewed</PremiumButton></div><section className="grid gap-5 xl:grid-cols-[1.15fr_.85fr]"><GlassCard className="p-6"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-200"><Activity size={19} /></span><div><h2 className="font-semibold">Operational moments</h2><p className="text-xs text-slate-500 dark:text-slate-300">Decision-ready timeline</p></div></div><div className="mt-8"><Timeline items={entries} /></div></GlassCard><div className="grid gap-5"><GlassCard className="p-6"><p className="ss-kicker text-slate-400">Review posture</p><p className="mt-3 text-3xl font-semibold tracking-[-.04em]">3 signals</p><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">The activity stream keeps operational context close to every decision.</p></GlassCard><GlassCard className="p-6"><p className="ss-kicker text-slate-400">Notification discipline</p><p className="mt-3 font-semibold">Focused, not noisy</p><button type="button" onClick={() => show('Notification preferences are open in Settings.')} className="focus-ring mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 dark:text-cyan-200"><BellRing size={16} />Manage notifications</button></GlassCard></div></section></WorkspacePage>;
}

export function AssistantPage() {
  const [messages, setMessages] = useState<readonly string[]>([]);
  const { show } = useToast();
  const submit = (prompt: string) => { const value = prompt.trim(); if (value.length === 0) return; setMessages((current) => [...current, value]); show('Your operational question has been added to this briefing.'); };
  return <WorkspacePage eyebrow="Enterprise intelligence" title="StadiumSphere Assistant" description="Frame operational questions, preserve context, and keep your team aligned around the next best decision."><section className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]"><GlassCard className="flex min-h-[33rem] flex-col p-5"><div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-white/10"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-slate-950"><BrainCircuit size={20} /></span><div><p className="font-semibold">Operational conversation</p><p className="text-xs text-slate-500 dark:text-slate-300">Context-aware workspace</p></div></div><StatusBadge label="Ready" tone="success" /></div><div className="flex-1 space-y-3 py-6">{messages.length === 0 ? <AIChatBubble><p className="font-medium">Start with an operational question.</p><p className="mt-1 text-slate-600 dark:text-slate-300">Use a suggested prompt or bring your own matchday decision into the conversation.</p></AIChatBubble> : messages.map((message, index) => <AIChatBubble key={`${message}-${index}`} role="user">{message}</AIChatBubble>)}</div><PromptBox onSubmit={submit} /></GlassCard><div className="grid gap-5"><AIAssistantCard><p>Keep the next decision clear: identify the event, the venue, and the operational constraint.</p></AIAssistantCard><GlassCard className="p-6"><p className="ss-kicker text-slate-400">Suggested prompts</p><div className="mt-4 grid gap-2">{['Summarize current reservation risks', 'Outline today’s event posture', 'Prepare a venue readiness briefing'].map((prompt) => <button key={prompt} type="button" onClick={() => submit(prompt)} className="focus-ring rounded-xl border border-slate-200 p-3 text-left text-sm font-medium transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-white/10 dark:hover:bg-cyan-400/10">{prompt}<ArrowUpRight className="float-right text-cyan-500" size={16} /></button>)}</div></GlassCard></div></section></WorkspacePage>;
}

export function SettingsPage() {
  const { preference, setPreference } = useTheme();
  const { show } = useToast();
  const [alerts, setAlerts] = useState(true);
  const [motion, setMotion] = useState(true);
  return <WorkspacePage eyebrow="Workspace preferences" title="Settings" description="Tune the StadiumSphere workspace for the way your operations team reviews, responds, and collaborates."><section className="grid gap-5 xl:grid-cols-[.8fr_1.2fr]"><GlassCard className="p-6"><p className="ss-kicker text-slate-400">Configuration areas</p><div className="mt-5 grid gap-2">{[[Palette, 'Appearance'], [Users, 'Workspace'], [BellRing, 'Notifications'], [KeyRound, 'Security'], [Compass, 'Accessibility']].map(([Icon, label]) => <button key={label as string} type="button" onClick={() => show(`${label} preferences are in view.`)} className="focus-ring flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition hover:bg-cyan-50 dark:hover:bg-cyan-400/10"><Icon className="text-cyan-500" size={17} />{label as string}</button>)}</div></GlassCard><div className="grid gap-5"><GlassCard className="p-6"><p className="ss-kicker text-slate-400">Appearance</p><h2 className="mt-2 text-lg font-semibold">Choose a workspace theme</h2><div className="mt-5"><SegmentedControl options={['light', 'dark', 'system']} value={preference} onChange={(value) => setPreference(value as typeof preference)} /></div><p className="mt-4 text-sm text-slate-500 dark:text-slate-300">Your preference is saved to this browser and applied across the entire workspace.</p></GlassCard><GlassCard className="p-6"><p className="ss-kicker text-slate-400">Signal preferences</p><div className="mt-5 grid gap-3"><Toggle checked={alerts} label="Operational alerts" onChange={setAlerts} /><Toggle checked={motion} label="Enhanced motion" onChange={setMotion} /></div></GlassCard><GlassCard className="p-6"><p className="ss-kicker text-slate-400">Language and access</p><p className="mt-3 font-semibold">English (International)</p><button type="button" onClick={() => show('Workspace preferences saved.')} className="focus-ring mt-4 text-sm font-semibold text-cyan-700 dark:text-cyan-200">Save workspace preferences</button></GlassCard></div></section></WorkspacePage>;
}

export function HelpPage() {
  const { show } = useToast();
  return <WorkspacePage eyebrow="Knowledge center" title="Help & Support" description="Find product guidance, operational shortcuts, and the resources your team needs to stay in control."><section className="grid gap-4 md:grid-cols-3">{[[BookOpen, 'Guides', 'Explore operational workflows and platform conventions.'], [CircleHelp, 'FAQ', 'Resolve common questions with concise answers.'], [LifeBuoy, 'Support', 'Prepare a focused support request with context.']].map(([Icon, title, description]) => <button key={title as string} type="button" onClick={() => show(`${title} resources opened.`)} className="focus-ring ss-surface ss-interactive rounded-2xl p-5 text-left"><Icon className="text-cyan-500" size={22} /><h2 className="mt-6 font-semibold">{title as string}</h2><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">{description as string}</p></button>)}</section><section className="grid gap-5 xl:grid-cols-[1.1fr_.9fr]"><GlassCard className="p-6"><p className="ss-kicker text-slate-400">Frequently asked</p><div className="mt-5 grid gap-2"><Accordion title="How do I review an operational resource?"><span>Open a resource card to review details and use its contextual controls for the next action.</span></Accordion><Accordion title="How does workspace access work?"><span>Protected operational views request a valid workspace session and show a clear sign-in requirement when one is unavailable.</span></Accordion><Accordion title="Where can I inspect the API?"><a className="font-semibold text-cyan-700 underline dark:text-cyan-200" href="http://localhost:3000/api-docs" target="_blank" rel="noreferrer">Open the API reference</a></Accordion></div></GlassCard><GlassCard className="p-6"><p className="ss-kicker text-slate-400">Keyboard shortcuts</p><dl className="mt-5 grid gap-4 text-sm"><div className="flex justify-between gap-4"><dt>Global search</dt><dd className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs dark:bg-white/10">⌘ K</dd></div><div className="flex justify-between gap-4"><dt>Close dialog</dt><dd className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs dark:bg-white/10">Esc</dd></div><div className="flex justify-between gap-4"><dt>Navigate controls</dt><dd className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs dark:bg-white/10">Tab</dd></div></dl></GlassCard></section></WorkspacePage>;
}

export function AboutPage() {
  const { show } = useToast();
  return <WorkspacePage eyebrow="Product overview" title="StadiumSphere AI" description="An enterprise operations platform for stadium, venue, event, and reservation teams working at World Cup scale."><section className="grid gap-5 xl:grid-cols-[1.15fr_.85fr]"><GlassCard className="overflow-hidden p-7"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-xl font-bold text-slate-950">S</div><h2 className="mt-7 text-2xl font-semibold tracking-[-.04em]">One operational language for every matchday.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">StadiumSphere brings the platform’s core operational resources into a coherent workspace with shared controls, clear state, and resilient API integration.</p><div className="mt-7 flex flex-wrap gap-2"><PremiumButton variant="outline" onClick={() => void navigator.clipboard?.writeText('StadiumSphere AI v0.1.0').then(() => show('Version copied to clipboard.'))}><Copy size={16} />Copy version</PremiumButton><a href="http://localhost:3000/api-docs" target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-slate-950"><Code2 size={16} />API reference</a></div></GlassCard><GlassCard className="p-6"><p className="ss-kicker text-slate-400">Release profile</p><div className="mt-5 grid gap-4"><div><p className="text-2xl font-semibold tracking-[-.04em]">0.1.0</p><p className="mt-1 text-sm text-slate-500 dark:text-slate-300">StadiumSphere platform release</p></div><StatusBadge label="Hackathon ready" tone="success" /><p className="text-sm leading-6 text-slate-500 dark:text-slate-300">Built with React, NestJS, MongoDB, clean architecture, and an operational design system.</p></div></GlassCard></section><section className="grid gap-4 md:grid-cols-3">{[[Layers3, 'Architecture', 'Layered backend contracts and reusable frontend primitives.'], [Globe2, 'Operations', 'A global workspace designed for event-day coordination.'], [ShieldCheck, 'Reliability', 'Typed API integration with resilient loading and access states.']].map(([Icon, title, detail]) => <GlassCard key={title as string} className="p-5"><Icon className="text-cyan-500" size={20} /><h2 className="mt-5 font-semibold">{title as string}</h2><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">{detail as string}</p></GlassCard>)}</section></WorkspacePage>;
}
