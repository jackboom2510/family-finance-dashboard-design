import { budgets, goals, formatVND, formatCompact } from "../data";
import { IconPlus, IconBolt } from "./Icons";
import { cn } from "../utils/cn";

export function Budgets() {
  const totalLimit = budgets.reduce((s, b) => s + b.limit, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);
  const utilization = (totalSpent / totalLimit) * 100;

  return (
    <div className="px-6 lg:px-8 py-6 space-y-5 animate-fade-in">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono mb-2">Discipline · Budgets & Goals</div>
          <h1 className="text-3xl font-medium tracking-tight text-ink-100">Spending envelopes</h1>
          <p className="text-[13px] text-ink-300 mt-1">January utilization <span className="font-mono text-ink-100">{utilization.toFixed(0)}%</span> · {budgets.length} active envelopes</p>
        </div>
        <button className="flex items-center gap-1.5 text-[12.5px] px-3.5 py-2 rounded-lg bg-emerald-glow text-ink-950 font-medium">
          <IconPlus size={14}/> New budget
        </button>
      </header>

      {/* Master gauge */}
      <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-ink-800 via-ink-850 to-ink-900 p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"/>
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-amber-glow/10 blur-3xl"/>
        <div className="relative grid lg:grid-cols-[300px_1fr] gap-8 items-center">
          {/* Big radial */}
          <div className="relative w-[260px] h-[260px] mx-auto">
            <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
              <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="14"/>
              <circle cx="100" cy="100" r="80" fill="none"
                stroke="url(#gauge)" strokeWidth="14" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 80}
                strokeDashoffset={2 * Math.PI * 80 * (1 - utilization / 100)}
                style={{ transition: "stroke-dashoffset 1.2s", filter: "drop-shadow(0 0 8px rgba(255,181,71,0.4))" }}
              />
              <defs>
                <linearGradient id="gauge" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#34e0a1"/>
                  <stop offset="100%" stopColor="#ffb547"/>
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-ink-400 font-mono">Used</div>
                <div className="text-5xl font-mono font-light text-ink-100 tabular">{utilization.toFixed(0)}<span className="text-2xl text-ink-400">%</span></div>
                <div className="text-[11px] text-ink-300 font-mono mt-1">{formatCompact(totalSpent)} / {formatCompact(totalLimit)}</div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[11px] font-mono text-amber-glow">
              <IconBolt size={12}/> 1 envelope at risk · 1 close to limit
            </div>
            <h2 className="text-2xl font-light tracking-tight">You're on track for the month.</h2>
            <p className="text-[13px] text-ink-300 max-w-md">At current velocity, you'll close January with about <span className="text-emerald-glow font-mono">{formatVND(totalLimit - totalSpent)} ₫</span> unspent across all envelopes — slightly better than December.</p>
            <div className="grid grid-cols-3 gap-3 pt-3">
              <Mini label="Remaining" value={`${formatCompact(totalLimit - totalSpent)} ₫`} color="text-emerald-glow"/>
              <Mini label="Avg / day" value={`${formatCompact(totalSpent / 24)} ₫`} color="text-ink-100"/>
              <Mini label="Days left" value="7" color="text-ink-100"/>
            </div>
          </div>
        </div>
      </div>

      {/* Envelope cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.map((b, i) => {
          const pct = (b.spent / b.limit) * 100;
          const danger = pct >= 95;
          const warn = pct >= 80 && pct < 95;
          const r = 38, c = 2 * Math.PI * r;
          return (
            <div key={b.id}
              className="rounded-2xl border border-white/[0.06] bg-ink-900/40 p-5 hover:border-white/15 transition animate-slide-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7"/>
                    <circle cx="50" cy="50" r={r} fill="none"
                      stroke={danger ? "#f25f7a" : warn ? "#ffb547" : b.color}
                      strokeWidth="7" strokeLinecap="round"
                      strokeDasharray={c}
                      strokeDashoffset={c - (Math.min(pct, 100) / 100) * c}
                      style={{ transition: "stroke-dashoffset 1s", filter: `drop-shadow(0 0 4px ${danger ? "#f25f7a" : warn ? "#ffb547" : b.color}80)` }}
                    />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center text-center">
                    <div>
                      <div className="text-lg font-mono font-medium tabular text-ink-100">{pct.toFixed(0)}<span className="text-[10px] text-ink-400">%</span></div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-ink-100">{b.name}</span>
                    <span className={cn("text-[9px] font-mono uppercase px-1.5 py-0.5 rounded",
                      b.scope === "family" ? "bg-violet-soft/10 text-violet-soft" : "bg-emerald-glow/10 text-emerald-glow"
                    )}>{b.scope}</span>
                  </div>
                  <div className="text-[11px] text-ink-400 font-mono mt-0.5">{b.category} · {b.period}ly</div>
                  <div className="mt-2 font-mono tabular">
                    <span className="text-ink-100">{formatVND(b.spent)}</span>
                    <span className="text-ink-500"> / {formatVND(b.limit)} ₫</span>
                  </div>
                  <div className="mt-2 flex gap-2">
                    {[80, 90, 100].map(t => (
                      <div key={t} className={cn(
                        "text-[9px] font-mono px-1.5 py-0.5 rounded border",
                        pct >= t ? "border-rose-soft/40 text-rose-soft bg-rose-soft/10" : "border-white/5 text-ink-400"
                      )}>{t}%</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Goals section */}
      <div className="rounded-2xl border border-white/[0.06] bg-ink-900/40 p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono">Long-term goals</div>
            <div className="text-[14px] text-ink-100 mt-0.5">Targets you're saving towards</div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {goals.map(g => {
            const pct = (g.saved / g.target) * 100;
            return (
              <div key={g.id} className="rounded-xl border border-white/5 bg-ink-950/30 p-4 hover:border-emerald-glow/30 transition group">
                <div className="flex items-center justify-between">
                  <div className="text-3xl">{g.emoji}</div>
                  <span className="text-[10px] font-mono uppercase text-ink-400">due {g.deadline}</span>
                </div>
                <div className="mt-3 text-[14px] text-ink-100">{g.name}</div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-2xl font-mono font-light text-ink-100 tabular">{formatCompact(g.saved)}</span>
                  <span className="text-ink-400 font-mono text-[12px]">/ {formatCompact(g.target)} ₫</span>
                </div>
                <div className="h-1.5 mt-3 rounded-full bg-ink-800 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-glow to-cyan-soft" style={{ width: `${pct}%`, boxShadow: "0 0 8px rgba(52,224,161,0.4)" }}/>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-emerald-glow">{pct.toFixed(0)}% complete</span>
                  <span className="text-ink-400">need {formatCompact(g.target - g.saved)} ₫ more</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Mini({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg border border-white/5 bg-ink-950/30 p-3">
      <div className="text-[10px] uppercase tracking-[0.14em] text-ink-400 font-mono">{label}</div>
      <div className={cn("font-mono text-lg tabular mt-0.5", color)}>{value}</div>
    </div>
  );
}
