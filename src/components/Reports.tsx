import { CashflowChart, CategoryDonut, WeeklyBars, Sparkline } from "./Charts";
import { categoryBreakdown, formatCompact } from "../data";
import { IconExport, IconArrowUp, IconArrowDown } from "./Icons";

export function Reports() {
  return (
    <div className="px-6 lg:px-8 py-6 space-y-5 animate-fade-in">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono mb-2">Intelligence · Reports</div>
          <h1 className="text-3xl font-medium tracking-tight text-ink-100">Money in motion</h1>
          <p className="text-[13px] text-ink-300 mt-1">Analytics across <span className="font-mono text-ink-100">Q1 2026</span> · combined personal + family</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-ink-800 border border-white/5 rounded-md px-3 py-1.5 text-[12px] text-ink-100 font-mono focus:outline-none">
            <option>Last 30 days</option><option>Last 90 days</option><option>YTD</option><option>Custom…</option>
          </select>
          <button className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-md bg-emerald-glow text-ink-950 font-medium">
            <IconExport size={13}/> Export PDF
          </button>
        </div>
      </header>

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ReportKPI label="Total income" value="33.0M" delta="+12.4%" up tint="#34e0a1"/>
        <ReportKPI label="Total expense" value="17.05M" delta="−3.1%" up tint="#f25f7a"/>
        <ReportKPI label="Net savings" value="15.95M" delta="+24%" up tint="#ffb547"/>
        <ReportKPI label="Avg daily spend" value="710K" delta="−5%" up tint="#4cc9f0"/>
      </div>

      {/* Cashflow large */}
      <div className="rounded-2xl border border-white/[0.06] bg-ink-900/40 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono">Cashflow trajectory</div>
            <div className="text-[14px] text-ink-100 mt-0.5">Income vs expense · 30-day rolling</div>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-glow"/>Income</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-rose-soft"/>Expense</div>
          </div>
        </div>
        <CashflowChart height={260}/>
      </div>

      {/* Donut + Bars */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-5 rounded-2xl border border-white/[0.06] bg-ink-900/40 p-5">
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono">Category mix</div>
          <div className="text-[14px] text-ink-100 mt-0.5">Where your spending went</div>
          <div className="grid place-items-center my-4">
            <CategoryDonut size={200}/>
          </div>
          <div className="space-y-1.5 mt-2">
            {categoryBreakdown.map(c => {
              const total = categoryBreakdown.reduce((s, x) => s + x.value, 0);
              const pct = (c.value / total) * 100;
              return (
                <div key={c.name} className="flex items-center gap-2 text-[12px] py-1">
                  <span className="w-2 h-2 rounded-sm" style={{ background: c.color }}/>
                  <span className="text-ink-200 flex-1">{c.name}</span>
                  <div className="w-24 h-1 rounded-full bg-ink-800 overflow-hidden">
                    <div className="h-full" style={{ width: `${pct}%`, background: c.color }}/>
                  </div>
                  <span className="font-mono text-ink-300 tabular w-10 text-right">{pct.toFixed(0)}%</span>
                  <span className="font-mono text-ink-100 tabular w-16 text-right">{formatCompact(c.value)}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 rounded-2xl border border-white/[0.06] bg-ink-900/40 p-5">
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono">Weekly comparison</div>
          <div className="text-[14px] text-ink-100 mt-0.5 mb-4">8-week income vs expense</div>
          <WeeklyBars/>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <Insight title="Best week" value="W7" sub="+₫22.4M net" color="text-emerald-glow"/>
            <Insight title="Worst week" value="W5" sub="−₫6.0M overspend" color="text-rose-soft"/>
            <Insight title="Trend" value="↗ +8%" sub="MoM growth" color="text-amber-glow"/>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="rounded-2xl border border-white/[0.06] bg-ink-900/40 p-5">
        <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono">AI-generated insights</div>
        <div className="text-[14px] text-ink-100 mt-0.5 mb-4">Patterns we noticed this period</div>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { icon: "📈", title: "Dining is up 18%", body: "You ate out 14 times this month vs 9 in December. Consider a weekly cap of ₫750K." },
            { icon: "💡", title: "Utility savings", body: "Your electricity bill dropped ₫120K vs last month — good job on AC discipline." },
            { icon: "🎯", title: "Goal pacing", body: "You're on track to hit the Tokyo trip goal 6 weeks early at current saving rate." },
          ].map((card, i) => (
            <div key={i} className="rounded-xl border border-white/5 bg-ink-950/30 p-4 hover:border-emerald-glow/30 transition">
              <div className="text-2xl">{card.icon}</div>
              <div className="text-[13px] text-ink-100 mt-2 font-medium">{card.title}</div>
              <div className="text-[12px] text-ink-300 mt-1 leading-relaxed">{card.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportKPI({ label, value, delta, up, tint }: { label: string; value: string; delta: string; up: boolean; tint: string }) {
  const sparkData = Array.from({ length: 12 }, (_, i) => 50 + Math.sin(i * 0.7) * 20 + i * 2);
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-ink-900/40 p-4">
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.16em] text-ink-400 font-mono">{label}</div>
        <div className="flex items-center gap-0.5 text-[10px] font-mono" style={{ color: up ? "#34e0a1" : "#f25f7a" }}>
          {up ? <IconArrowUp size={10}/> : <IconArrowDown size={10}/>}{delta}
        </div>
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-mono font-light text-ink-100 tabular">{value}</span>
        <span className="text-ink-400 text-sm font-mono">₫</span>
      </div>
      <div className="mt-1"><Sparkline data={sparkData} color={tint} w={200} h={28}/></div>
    </div>
  );
}

function Insight({ title, value, sub, color }: { title: string; value: string; sub: string; color: string }) {
  return (
    <div className="rounded-lg border border-white/5 bg-ink-950/30 p-3">
      <div className="text-[10px] uppercase tracking-[0.14em] text-ink-400 font-mono">{title}</div>
      <div className={`text-lg font-mono mt-0.5 tabular ${color}`}>{value}</div>
      <div className="text-[11px] text-ink-400 mt-0.5">{sub}</div>
    </div>
  );
}
