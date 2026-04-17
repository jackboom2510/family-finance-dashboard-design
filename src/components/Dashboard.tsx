import { transactions, wallets, budgets, members, formatVND, formatCompact, timeAgo, categoryBreakdown, goals } from "../data";
import { CashflowChart, CategoryDonut, WeeklyBars, Sparkline } from "./Charts";
import { IconArrowUp, IconArrowDown, IconClock, IconChevron, IconBolt } from "./Icons";
import { cn } from "../utils/cn";

export function Dashboard() {
  const personalBalance = wallets.filter(w => w.scope === "personal").reduce((s, w) => s + w.balance, 0);
  const familyBalance = wallets.filter(w => w.scope === "family").reduce((s, w) => s + w.balance, 0);
  const total = personalBalance + familyBalance;

  const monthIncome = 33000000;
  const monthExpense = 17050000;
  const net = monthIncome - monthExpense;
  const savingsRate = (net / monthIncome) * 100;

  return (
    <div className="px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
      {/* Header */}
      <header className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono mb-2">
            <span className="w-1 h-1 rounded-full bg-emerald-glow"/>
            Overview · January 2026
          </div>
          <h1 className="text-3xl font-medium tracking-tight text-ink-100">
            Good evening, Minh.
            <span className="text-ink-400 font-serif italic ml-2">Your money is calm.</span>
          </h1>
          <p className="text-[13px] text-ink-300 mt-1">
            Net cash flow this month is <span className="text-emerald-glow tabular font-mono">+{formatVND(net)} ₫</span> — you're saving <span className="text-ink-100 font-mono tabular">{savingsRate.toFixed(1)}%</span> of income.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {["Day", "Week", "Month", "Quarter", "Year"].map((p, i) => (
            <button key={p} className={cn(
              "text-[12px] px-3 py-1.5 rounded-md font-mono transition",
              i === 2 ? "bg-ink-700 text-ink-100 border border-white/10" : "text-ink-400 hover:text-ink-100"
            )}>{p}</button>
          ))}
        </div>
      </header>

      {/* Hero balance grid */}
      <section className="grid grid-cols-12 gap-4">
        {/* Total */}
        <div className="col-span-12 lg:col-span-5 relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-ink-800 via-ink-850 to-ink-900 p-6">
          <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none"/>
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-emerald-glow/10 blur-3xl pointer-events-none"/>
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono">Net worth · Combined</div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-glow font-mono">
                <IconArrowUp size={12}/> +4.2% MoM
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-ink-300 text-2xl font-mono">₫</span>
              <span className="text-6xl font-mono font-light tracking-tight text-ink-100 tabular">
                {formatVND(total)}
              </span>
            </div>
            <div className="mt-1 text-[12px] text-ink-400 font-mono">≈ ${formatVND(Math.round(total / 24580))} USD</div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="rounded-xl bg-ink-950/40 border border-white/[0.04] p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="text-[10px] uppercase tracking-[0.14em] text-ink-400 font-mono">Personal</div>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-glow"/>
                </div>
                <div className="font-mono text-lg text-ink-100 tabular">{formatVND(personalBalance)}</div>
                <Sparkline data={[10,12,11,14,13,16,18,17,20,22,21,24]} color="#34e0a1" w={140} h={28}/>
              </div>
              <div className="rounded-xl bg-ink-950/40 border border-white/[0.04] p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="text-[10px] uppercase tracking-[0.14em] text-ink-400 font-mono">Family</div>
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-soft"/>
                </div>
                <div className="font-mono text-lg text-ink-100 tabular">{formatVND(familyBalance)}</div>
                <Sparkline data={[8,10,9,11,12,12,14,13,15,16,18,19]} color="#8b7df5" w={140} h={28}/>
              </div>
            </div>
          </div>
        </div>

        {/* KPI cards */}
        <div className="col-span-12 lg:col-span-7 grid grid-cols-2 lg:grid-cols-3 gap-4">
          <KPI label="Income · MTD" value={formatVND(monthIncome)} unit="₫" delta="+12.4%" up tint="emerald"/>
          <KPI label="Expense · MTD" value={formatVND(monthExpense)} unit="₫" delta="−3.1%" up tint="rose"/>
          <KPI label="Savings rate" value={savingsRate.toFixed(1)} unit="%" delta="+5.8 pp" up tint="amber"/>
          <KPI label="Largest expense" value="2.15M" unit="₫" sub="Uniqlo · Shopping" tint="violet"/>
          <KPI label="Pending tx" value="1" sub="Awaiting confirm" tint="cyan"/>
          <KPI label="Streak · on-budget" value="14" unit="days" sub="Personal scope" tint="emerald"/>
        </div>
      </section>

      {/* Cashflow + Category */}
      <section className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8 rounded-2xl border border-white/[0.06] bg-ink-900/40 p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono">Cash flow · 30D</div>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-2xl font-mono text-ink-100 tabular">+{formatVND(net)} ₫</span>
                <span className="text-[12px] text-emerald-glow font-mono">net positive</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-glow"/>Income</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-rose-soft"/>Expense</div>
            </div>
          </div>
          <CashflowChart/>
        </div>

        <div className="col-span-12 lg:col-span-4 rounded-2xl border border-white/[0.06] bg-ink-900/40 p-5 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono">Spend by category</div>
            <button className="text-[11px] text-ink-400 hover:text-ink-100 flex items-center gap-1">All <IconChevron size={11}/></button>
          </div>
          <div className="grid place-items-center my-2">
            <CategoryDonut/>
          </div>
          <div className="space-y-1.5 mt-2">
            {categoryBreakdown.slice(0, 5).map((c) => {
              const total = categoryBreakdown.reduce((s, x) => s + x.value, 0);
              const pct = (c.value / total) * 100;
              return (
                <div key={c.name} className="flex items-center gap-2 text-[12px]">
                  <span className="w-2 h-2 rounded-sm" style={{ background: c.color }}/>
                  <span className="text-ink-200 flex-1">{c.name}</span>
                  <span className="font-mono text-ink-400 tabular">{pct.toFixed(0)}%</span>
                  <span className="font-mono text-ink-100 tabular w-16 text-right">{formatCompact(c.value)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent transactions + Budgets + Members */}
      <section className="grid grid-cols-12 gap-4">
        {/* Transactions stream */}
        <div className="col-span-12 xl:col-span-7 rounded-2xl border border-white/[0.06] bg-ink-900/40 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono">Live transactions</div>
              <div className="text-[14px] text-ink-100 mt-0.5">Recent activity across all wallets</div>
            </div>
            <button className="text-[12px] text-emerald-glow hover:underline font-mono">View all →</button>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {transactions.slice(0, 7).map((t, i) => {
              const wallet = wallets.find(w => w.id === t.walletId)!;
              const isInc = t.type === "income";
              const isXfer = t.type === "transfer";
              return (
                <div
                  key={t.id}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-white/[0.02] transition group animate-slide-up"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="text-2xl w-10 h-10 grid place-items-center rounded-xl bg-ink-800/80 border border-white/5">
                    {t.categoryIcon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[13.5px] text-ink-100 truncate">{t.merchant}</span>
                      {t.status === "pending" && (
                        <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-glow/15 text-amber-glow border border-amber-glow/20 flex items-center gap-1">
                          <IconClock size={9}/> pending
                        </span>
                      )}
                      {t.scope === "family" && (
                        <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-violet-soft/10 text-violet-soft border border-violet-soft/20">
                          family · {t.member}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-ink-400 mt-0.5 font-mono">
                      <span>{t.category}</span>
                      <span>·</span>
                      <span>{wallet.name}</span>
                      <span>·</span>
                      <span>{timeAgo(t.date)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn(
                      "font-mono text-[14px] tabular",
                      isInc ? "text-emerald-glow" : isXfer ? "text-cyan-soft" : "text-ink-100"
                    )}>
                      {isInc ? "+" : isXfer ? "" : "−"}{formatVND(t.amount)} <span className="text-ink-400 text-[11px]">₫</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: budgets + members */}
        <div className="col-span-12 xl:col-span-5 space-y-4">
          {/* Budgets */}
          <div className="rounded-2xl border border-white/[0.06] bg-ink-900/40 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono">Active budgets</div>
                <div className="text-[14px] text-ink-100 mt-0.5">5 envelopes · January</div>
              </div>
              <button className="text-[11px] text-emerald-glow font-mono hover:underline">Manage →</button>
            </div>
            <div className="space-y-3.5">
              {budgets.map((b) => {
                const pct = (b.spent / b.limit) * 100;
                const danger = pct >= 95;
                const warn = pct >= 80 && pct < 95;
                return (
                  <div key={b.id}>
                    <div className="flex items-center justify-between text-[12px] mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-ink-100">{b.name}</span>
                        {b.scope === "family" && (
                          <span className="text-[9px] font-mono uppercase px-1 py-0.5 rounded bg-violet-soft/10 text-violet-soft">F</span>
                        )}
                        {danger && <span className="text-[9px] font-mono uppercase text-rose-soft animate-pulse">at limit</span>}
                        {warn && <span className="text-[9px] font-mono uppercase text-amber-glow">close</span>}
                      </div>
                      <div className="font-mono text-ink-300 tabular">
                        <span className="text-ink-100">{formatCompact(b.spent)}</span>
                        <span className="text-ink-500"> / {formatCompact(b.limit)}</span>
                      </div>
                    </div>
                    <div className="h-1.5 rounded-full bg-ink-800 overflow-hidden relative">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.min(pct, 100)}%`,
                          background: danger ? "linear-gradient(90deg, #f25f7a, #ff8aa0)" : warn ? "linear-gradient(90deg, #ffb547, #ffd28a)" : `linear-gradient(90deg, ${b.color}, ${b.color}cc)`,
                          boxShadow: `0 0 12px -2px ${danger ? "#f25f7a" : warn ? "#ffb547" : b.color}`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Family contributions */}
          <div className="rounded-2xl border border-white/[0.06] bg-ink-900/40 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono">Family contributions</div>
                <div className="text-[14px] text-ink-100 mt-0.5">January · 4 members</div>
              </div>
              <div className="flex -space-x-1.5">
                {members.map(m => (
                  <div key={m.id}
                    className="w-7 h-7 rounded-full grid place-items-center text-[10px] font-semibold ring-2 ring-ink-900"
                    style={{ background: m.color, color: "#0b0e13" }}
                  >{m.initials}</div>
                ))}
              </div>
            </div>
            <div className="space-y-2.5">
              {members.map(m => {
                const totalContrib = members.reduce((s, x) => s + x.contribution, 0) || 1;
                const pct = (m.contribution / totalContrib) * 100;
                return (
                  <div key={m.id} className="flex items-center gap-3 text-[12px]">
                    <div className="w-6 h-6 rounded-full grid place-items-center text-[9px] font-semibold" style={{ background: m.color, color: "#0b0e13" }}>{m.initials}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-ink-100">{m.name}</span>
                        <span className="font-mono text-ink-300 tabular">{formatCompact(m.contribution)} ₫</span>
                      </div>
                      <div className="h-1 rounded-full bg-ink-800 mt-1 overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: m.color }}/>
                      </div>
                    </div>
                    <span className={cn(
                      "text-[9px] font-mono uppercase px-1.5 py-0.5 rounded",
                      m.role === "Owner" ? "bg-emerald-glow/15 text-emerald-glow" :
                      m.role === "Editor" ? "bg-cyan-soft/15 text-cyan-soft" :
                      "bg-ink-700 text-ink-300"
                    )}>{m.role}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Weekly bars + Goals */}
      <section className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-7 rounded-2xl border border-white/[0.06] bg-ink-900/40 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono">8-week comparison</div>
              <div className="text-[14px] text-ink-100 mt-0.5">Income vs expense — weekly</div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-ink-400">
              <IconBolt size={11} className="text-amber-glow"/>
              W5 spike: ₫6.0M unplanned
            </div>
          </div>
          <WeeklyBars/>
        </div>

        <div className="col-span-12 lg:col-span-5 rounded-2xl border border-white/[0.06] bg-ink-900/40 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono">Savings goals</div>
              <div className="text-[14px] text-ink-100 mt-0.5">3 active targets</div>
            </div>
          </div>
          <div className="space-y-4">
            {goals.map((g) => {
              const pct = (g.saved / g.target) * 100;
              const r = 22, c = 2 * Math.PI * r;
              return (
                <div key={g.id} className="flex items-center gap-3 group">
                  <div className="relative w-14 h-14 grid place-items-center">
                    <svg viewBox="0 0 60 60" className="w-full h-full -rotate-90">
                      <circle cx="30" cy="30" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4"/>
                      <circle
                        cx="30" cy="30" r={r}
                        fill="none"
                        stroke="#34e0a1"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={c}
                        strokeDashoffset={c - (pct / 100) * c}
                        style={{ filter: "drop-shadow(0 0 4px rgba(52,224,161,0.6))", transition: "stroke-dashoffset 1s" }}
                      />
                    </svg>
                    <span className="absolute text-lg">{g.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-ink-100 truncate">{g.name}</span>
                      <span className="font-mono text-[11px] text-emerald-glow tabular">{pct.toFixed(0)}%</span>
                    </div>
                    <div className="text-[11px] text-ink-400 font-mono mt-0.5 flex items-center gap-2">
                      <span className="text-ink-100">{formatCompact(g.saved)}</span>
                      <span>/ {formatCompact(g.target)}</span>
                      <span className="ml-auto">due {g.deadline}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function KPI({ label, value, unit, sub, delta, up, tint }: {
  label: string; value: string; unit?: string; sub?: string;
  delta?: string; up?: boolean;
  tint: "emerald" | "rose" | "amber" | "violet" | "cyan";
}) {
  const tints: Record<string, string> = {
    emerald: "from-emerald-glow/10 to-transparent text-emerald-glow",
    rose: "from-rose-soft/10 to-transparent text-rose-soft",
    amber: "from-amber-glow/10 to-transparent text-amber-glow",
    violet: "from-violet-soft/10 to-transparent text-violet-soft",
    cyan: "from-cyan-soft/10 to-transparent text-cyan-soft",
  };
  return (
    <div className="relative rounded-2xl border border-white/[0.06] bg-ink-900/40 p-4 overflow-hidden">
      <div className={cn("absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-50 bg-gradient-to-br", tints[tint])}/>
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="text-[10px] uppercase tracking-[0.16em] text-ink-400 font-mono">{label}</div>
          {delta && (
            <div className={cn("flex items-center gap-0.5 text-[10px] font-mono", up ? "text-emerald-glow" : "text-rose-soft")}>
              {up ? <IconArrowUp size={10}/> : <IconArrowDown size={10}/>}{delta}
            </div>
          )}
        </div>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-2xl font-mono font-light text-ink-100 tabular">{value}</span>
          {unit && <span className="text-ink-400 text-sm font-mono">{unit}</span>}
        </div>
        {sub && <div className="text-[11px] text-ink-400 mt-1 truncate">{sub}</div>}
      </div>
    </div>
  );
}
