import { useState } from 'react';
import type { ReactNode } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
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
  FileText,
  Gauge,
  Globe2,
  Layers3,
  LifeBuoy,
  ShieldCheck,
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
} from '@/components/design-system';
import { useToast } from '@/contexts/toast-context';
import { routePaths } from '@/routes/route-definitions';
import { ApiRequestError, apiRequest } from '@/services/api-client';
import { Link } from 'react-router';

function WorkspacePage({ children, description, eyebrow, title }: { children: ReactNode; description: string; eyebrow: string; title: string }) {
  return <main className="page-enter mx-auto w-full max-w-[1600px] space-y-7 px-4 py-6 sm:px-6 lg:px-8"><header className="max-w-3xl"><p className="ss-kicker text-cyan-700 dark:text-cyan-200">{eyebrow}</p><h1 className="mt-3 text-3xl font-semibold tracking-[-.05em] text-slate-950 sm:text-4xl dark:text-white">{title}</h1><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p></header>{children}</main>;
}

interface HealthSnapshot { status?: string; version?: string; }

export function DashboardPage() {
  const { show } = useToast();
  const health = useQuery({ queryKey: ['platform-health'], queryFn: () => apiRequest<HealthSnapshot>('/health'), retry: 1 });
  const signal = health.data?.status === 'ok' ? 'Connected' : health.data?.status === 'degraded' ? 'Degraded' : health.isError ? 'Unavailable' : 'Checking';
  return <WorkspacePage eyebrow="Mission control" title="Global Operations" description="A concise command surface for stadium readiness, matchday coordination, and decisions that move the platform forward."><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><MetricCard label="Platform signal" value={signal} trend={{ positive: signal === 'Connected', value: 'Live health' }} /><MetricCard label="Operational modules" value="7" trend={{ positive: true, value: 'Connected' }} /><MetricCard label="Decision readiness" value="92%" trend={{ positive: true, value: 'Stable' }} /><GlassCard className="p-5"><Gauge className="text-cyan-500" size={25} /><p className="mt-4 font-semibold">World Cup 2026</p><p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{health.data?.version ?? 'Verifying service health'}</p></GlassCard></section><section className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]"><GlassCard className="p-6"><p className="ss-kicker text-slate-400">Priority pathways</p><div className="mt-5 grid gap-3 sm:grid-cols-3"><Link to={routePaths.application.events} className="focus-ring rounded-2xl border border-slate-200 p-4 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-white/10 dark:hover:bg-cyan-400/10"><Clock3 className="text-cyan-500" size={18} /><p className="mt-5 font-semibold">Event desk</p><p className="mt-1 text-xs text-slate-500 dark:text-slate-300">Coordinate live windows</p></Link><Link to={routePaths.application.bookings} className="focus-ring rounded-2xl border border-slate-200 p-4 transition hover:border-violet-300 hover:bg-violet-50 dark:border-white/10 dark:hover:bg-violet-400/10"><Layers3 className="text-violet-500" size={18} /><p className="mt-5 font-semibold">Reservations</p><p className="mt-1 text-xs text-slate-500 dark:text-slate-300">Review booking posture</p></Link><button type="button" onClick={() => show('The operational briefing has been refreshed.')} className="focus-ring rounded-2xl border border-slate-200 p-4 text-left transition hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:hover:bg-emerald-400/10"><WandSparkles className="text-emerald-500" size={18} /><p className="mt-5 font-semibold">Briefing</p><p className="mt-1 text-xs text-slate-500 dark:text-slate-300">Refresh operational focus</p></button></div></GlassCard><GlassCard className="p-6"><p className="ss-kicker text-slate-400">Readiness pulse</p><div className="mt-6 space-y-5"><ProgressBar label="Infrastructure readiness" value={92} /><ProgressBar label="Operational coverage" value={84} /><button type="button" onClick={() => void health.refetch()} className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 dark:text-cyan-200"><Activity size={16} />Refresh health signal</button></div></GlassCard></section></WorkspacePage>;
}

export function AnalyticsPage() {
  const [period, setPeriod] = useState('30 days');
  const { show } = useToast();
  return <WorkspacePage eyebrow="Business intelligence" title="Operational Analytics" description="Explore capacity, attendance and booking momentum through an executive-ready intelligence workspace."><div className="flex flex-wrap justify-between gap-3"><SegmentedControl options={['7 days', '30 days', 'Season']} value={period} onChange={setPeriod} /><PremiumButton variant="outline" onClick={() => show(`Analytics snapshot for ${period} prepared.`)}><FileText size={16} />Export briefing</PremiumButton></div><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><MetricCard label="Attendance trend" value="+18.4%" trend={{ positive: true, value: period }} /><MetricCard label="Booking velocity" value="2.6×" trend={{ positive: true, value: 'Momentum' }} /><MetricCard label="Capacity utilization" value="78%" trend={{ positive: true, value: 'Network average' }} /><MetricCard label="Event completion" value="94%" trend={{ positive: true, value: 'On schedule' }} /></section><section className="grid gap-5 xl:grid-cols-2"><LineChartCard title="Attendance momentum" /><BarChartCard title="Stadium utilization" /><DonutChartCard title="Event status distribution" /><GlassCard className="p-6"><BarChart3 className="text-violet-500" size={21} /><p className="mt-5 font-semibold">Organization distribution</p><div className="mt-6 space-y-5"><ProgressBar label="National associations" value={44} /><ProgressBar label="Venue operators" value={31} /><ProgressBar label="Competition partners" value={25} /></div></GlassCard></section></WorkspacePage>;
}

export function ActivityPage() {
  const [filter, setFilter] = useState('All signals');
  const { show } = useToast();
  const items = filter === 'Warnings' ? [{ detail: 'Venue reservation rules require an authenticated review.', title: 'Access review required' }] : [{ detail: 'Organization registry synchronized with the current workspace.', title: 'Organization signal received' }, { detail: 'Stadium posture is available from infrastructure control.', title: 'Infrastructure status reviewed' }, { detail: 'Booking lifecycle changes are grouped into the reservation ledger.', title: 'Reservation timeline updated' }];
  return <WorkspacePage eyebrow="Operational timeline" title="Activity Stream" description="A focused audit view for the signals, decisions, and operational moments that matter right now."><div className="flex flex-wrap justify-between gap-3"><SegmentedControl options={['All signals', 'Operations', 'Warnings']} value={filter} onChange={setFilter} /><PremiumButton variant="outline" onClick={() => show('Activity view marked as reviewed.')}><CheckCircle2 size={16} />Mark reviewed</PremiumButton></div><section className="grid gap-5 xl:grid-cols-[1.15fr_.85fr]"><GlassCard className="p-6"><div className="flex items-center gap-3"><Activity className="text-cyan-500" size={20} /><div><p className="font-semibold">Operational moments</p><p className="text-xs text-slate-500 dark:text-slate-300">Decision-ready timeline</p></div></div><div className="mt-8"><Timeline items={items} /></div></GlassCard><GlassCard className="p-6"><BellRing className="text-violet-500" size={21} /><p className="mt-5 font-semibold">Notification discipline</p><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">Focused alerts keep context close to each decision.</p><button type="button" onClick={() => show('Notification preferences are available in Settings.')} className="focus-ring mt-5 text-sm font-semibold text-cyan-700 dark:text-cyan-200">Manage notifications</button></GlassCard></section></WorkspacePage>;
}

interface AssistantChatResponse {
  answer: string;
}

interface ConversationMessage {
  readonly content: string;
  readonly role: 'assistant' | 'user';
}

function assistantErrorMessage(error: unknown): string {
  if (error instanceof ApiRequestError) {
    if (error.status === 401 || error.status === 403) {
      return 'Sign in is required to use the AI Assistant.';
    }

    if (error.status === 503) {
      return 'AI Assistant is currently unavailable.';
    }
  }

  return 'AI Assistant is currently unavailable. Please try again.';
}

export function AssistantPage() {
  const [messages, setMessages] = useState<readonly ConversationMessage[]>([]);
  const { show } = useToast();
  const chat = useMutation({
    mutationFn: (prompt: string) =>
      apiRequest<AssistantChatResponse>('/assistant/chat', {
        body: JSON.stringify({ prompt }),
        method: 'POST',
      }),
    onError: (error: unknown) => show(assistantErrorMessage(error)),
    onSuccess: (response) =>
      setMessages((current) => [...current, { content: response.answer, role: 'assistant' }]),
    retry: 1,
  });
  const submit = (prompt: string) => {
    const value = prompt.trim();

    if (value.length > 0 && !chat.isPending) {
      setMessages((current) => [...current, { content: value, role: 'user' }]);
      chat.mutate(value);
    }
  };
  const clearConversation = () => {
    setMessages([]);
    chat.reset();
    show('Assistant conversation cleared.');
  };

  return (
    <WorkspacePage
      eyebrow="Enterprise intelligence"
      title="StadiumSphere Assistant"
      description="Frame operational questions, preserve context, and keep your team aligned around the next best decision."
    >
      <section className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
        <GlassCard className="flex min-h-[33rem] flex-col p-5">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-white/10">
            <div className="flex items-center gap-3">
              <BrainCircuit className="text-cyan-500" size={22} />
              <div>
                <p className="font-semibold">Operational conversation</p>
                <p className="text-xs text-slate-500 dark:text-slate-300">Context-aware workspace</p>
              </div>
            </div>
            <button type="button" onClick={clearConversation} className="focus-ring text-xs font-semibold text-cyan-700 dark:text-cyan-200">Clear chat</button>
          </div>
          <div className="flex-1 space-y-3 py-6">
            {messages.length === 0 ? <AIChatBubble><p className="font-medium">Start with an operational question.</p><p className="mt-1 text-slate-600 dark:text-slate-300">Use a suggested prompt or bring your own matchday decision into the conversation.</p></AIChatBubble> : messages.map((message, index) => <AIChatBubble key={`${message.role}-${index}`} role={message.role}>{message.content}</AIChatBubble>)}
            {chat.isPending ? <AIChatBubble><span className="inline-flex items-center gap-2"><BrainCircuit size={15} className="animate-pulse" />Generating operational guidance…</span></AIChatBubble> : null}
          </div>
          <PromptBox isLoading={chat.isPending} onSubmit={submit} />
        </GlassCard>
        <div className="grid gap-5">
          <AIAssistantCard>Keep the next decision clear: identify the event, venue, and operational constraint.</AIAssistantCard>
          <GlassCard className="p-6">
            <p className="ss-kicker text-slate-400">Suggested prompts</p>
            <div className="mt-4 grid gap-2">
              {['Summarize current reservation risks', 'Outline today’s event posture', 'Prepare a venue readiness briefing'].map((prompt) => <button key={prompt} type="button" disabled={chat.isPending} onClick={() => submit(prompt)} className="focus-ring rounded-xl border border-slate-200 p-3 text-left text-sm font-medium transition hover:border-cyan-300 hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:hover:bg-cyan-400/10">{prompt}<ArrowUpRight className="float-right text-cyan-500" size={16} /></button>)}
            </div>
          </GlassCard>
        </div>
      </section>
    </WorkspacePage>
  );
}

export function HelpPage() {
  const { show } = useToast();
  return <WorkspacePage eyebrow="Knowledge center" title="Help & Support" description="Find product guidance, operational shortcuts, and resources your team needs to stay in control."><section className="grid gap-4 md:grid-cols-3"><HelpCard icon={<BookOpen size={22} />} title="Guides" detail="Explore operational workflows and platform conventions." onClick={() => show('Guides resources opened.')} /><HelpCard icon={<CircleHelp size={22} />} title="FAQ" detail="Resolve common questions with concise answers." onClick={() => show('FAQ resources opened.')} /><HelpCard icon={<LifeBuoy size={22} />} title="Support" detail="Prepare a focused support request with context." onClick={() => show('Support resources opened.')} /></section><GlassCard className="p-6"><p className="ss-kicker text-slate-400">Frequently asked</p><div className="mt-5 grid gap-2"><Accordion title="How do I review an operational resource?">Open a resource card to review details and use contextual controls for the next action.</Accordion><Accordion title="How does workspace access work?">Protected views request a valid workspace session and show a clear sign-in requirement when one is unavailable.</Accordion><Accordion title="Where can I inspect the API?"><a className="font-semibold text-cyan-700 underline dark:text-cyan-200" href="http://localhost:3000/api-docs" target="_blank" rel="noreferrer">Open the API reference</a></Accordion></div></GlassCard></WorkspacePage>;
}

function HelpCard({ detail, icon, onClick, title }: { detail: string; icon: ReactNode; onClick(): void; title: string }) {
  return <button type="button" onClick={onClick} className="focus-ring ss-surface ss-interactive rounded-2xl p-5 text-left"><span className="text-cyan-500">{icon}</span><h2 className="mt-6 font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">{detail}</p></button>;
}

export function AboutPage() {
  const { show } = useToast();
  return <WorkspacePage eyebrow="Product overview" title="StadiumSphere AI" description="An enterprise operations platform for stadium, venue, event, and reservation teams working at World Cup scale."><section className="grid gap-5 xl:grid-cols-[1.15fr_.85fr]"><GlassCard className="p-7"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-xl font-bold text-slate-950">S</div><h2 className="mt-7 text-2xl font-semibold tracking-[-.04em]">One operational language for every matchday.</h2><p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">StadiumSphere connects core operational resources through shared controls, clear state, and resilient API integration.</p><div className="mt-7 flex flex-wrap gap-2"><PremiumButton variant="outline" onClick={() => void navigator.clipboard?.writeText('StadiumSphere AI v0.1.0').then(() => show('Version copied to clipboard.'))}><Code2 size={16} />Copy version</PremiumButton><a href="http://localhost:3000/api-docs" target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">API reference</a></div></GlassCard><GlassCard className="p-6"><ShieldCheck className="text-emerald-500" size={24} /><p className="mt-5 text-2xl font-semibold">0.1.0</p><StatusBadge label="Hackathon ready" tone="success" /><p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-300">Built with React, NestJS, MongoDB, clean architecture, and an operational design system.</p></GlassCard></section><section className="grid gap-4 md:grid-cols-3"><AboutCard icon={<Layers3 size={20} />} title="Architecture" detail="Layered backend contracts and reusable frontend primitives." /><AboutCard icon={<Globe2 size={20} />} title="Operations" detail="A global workspace designed for event-day coordination." /><AboutCard icon={<ShieldCheck size={20} />} title="Reliability" detail="Typed API integration with resilient loading and access states." /></section></WorkspacePage>;
}

function AboutCard({ detail, icon, title }: { detail: string; icon: ReactNode; title: string }) {
  return <GlassCard className="p-5"><span className="text-cyan-500">{icon}</span><h2 className="mt-5 font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">{detail}</p></GlassCard>;
}
