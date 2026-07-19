import { ArrowUpRight, Bot, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';

import { PremiumButton } from './button';
import { GlassCard, InsightCard } from './cards';

export function AIAssistantCard({ children }: { children: ReactNode }) { return <GlassCard className="overflow-hidden p-5"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-slate-950"><Bot size={20} /></span><div><p className="font-semibold">StadiumSphere Assistant</p><p className="text-xs text-slate-500 dark:text-slate-300">Operational intelligence surface</p></div></div><div className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-300">{children}</div></GlassCard>; }
export function AIChatBubble({ children, role = 'assistant' }: { children: ReactNode; role?: 'assistant' | 'user' }) { return <div className={role === 'assistant' ? 'mr-8 rounded-2xl rounded-tl-sm bg-cyan-500/10 p-3 text-sm dark:bg-cyan-400/10' : 'ml-8 rounded-2xl rounded-tr-sm bg-slate-100 p-3 text-sm dark:bg-white/10'}>{children}</div>; }
export function PromptBox({ isLoading = false, onSubmit }: { isLoading?: boolean; onSubmit(prompt: string): void }) { return <form onSubmit={(event) => { event.preventDefault(); if (isLoading) { return; } const data = new FormData(event.currentTarget); onSubmit(String(data.get('prompt') ?? '')); event.currentTarget.reset(); }} className="flex gap-2 rounded-2xl border border-slate-200 bg-white p-2 dark:border-white/10 dark:bg-white/5"><input name="prompt" aria-label="Ask StadiumSphere Assistant" placeholder="Ask about your operations…" disabled={isLoading} className="focus-ring min-w-0 flex-1 bg-transparent px-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-60" /><PremiumButton type="submit" variant="secondary" aria-label="Send prompt" disabled={isLoading}>{isLoading ? 'Thinking…' : <ArrowUpRight size={17} />}</PremiumButton></form>; }
export function PredictionCard({ children, title = 'Prediction preview' }: { children: ReactNode; title?: string }) { return <InsightCard title={title}><span className="inline-flex gap-2"><Sparkles size={17} className="mt-1 text-cyan-500" />{children}</span></InsightCard>; }
export const RecommendationCard = PredictionCard;
export const SummaryCard = PredictionCard;
export const AIInsightCard = PredictionCard;
