import { useMemo, useState } from "react";
import { transactions, wallets, formatVND, timeAgo } from "../data";
import { IconFilter, IconExport, IconSearch, IconClock, IconCheck } from "./Icons";
import { cn } from "../utils/cn";

const filters = ["All", "Income", "Expense", "Transfer", "Pending"] as const;
const scopeFilters = ["All scopes", "Personal", "Family"] as const;

export function Transactions() {
  const [filter, setFilter] = useState<typeof filters[number]>("All");
  const [scope, setScope] = useState<typeof scopeFilters[number]>("All scopes");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    return transactions.filter(t => {
      if (filter === "Income" && t.type !== "income") return false;
      if (filter === "Expense" && t.type !== "expense") return false;
      if (filter === "Transfer" && t.type !== "transfer") return false;
      if (filter === "Pending" && t.status !== "pending") return false;
      if (scope === "Personal" && t.scope !== "personal") return false;
      if (scope === "Family" && t.scope !== "family") return false;
      if (q && !(`${t.merchant} ${t.category}`).toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [filter, scope, q]);

  const totalIn = list.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalOut = list.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);

  return (
    <div className="px-6 lg:px-8 py-6 space-y-5 animate-fade-in">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono mb-2">Ledger · Transactions</div>
          <h1 className="text-3xl font-medium tracking-tight text-ink-100">All movements</h1>
          <p className="text-[13px] text-ink-300 mt-1">{list.length} transactions · <span className="text-emerald-glow font-mono">+{formatVND(totalIn)}₫</span> in · <span className="text-rose-soft font-mono">−{formatVND(totalOut)}₫</span> out</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-md bg-ink-800 text-ink-200 border border-white/5 hover:border-white/10">
            <IconExport size={13}/> Export CSV
          </button>
          <button className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-md bg-ink-800 text-ink-200 border border-white/5 hover:border-white/10">
            <IconFilter size={13}/> Advanced
          </button>
        </div>
      </header>

      {/* Filter bar */}
      <div className="rounded-xl border border-white/[0.06] bg-ink-900/40 p-3 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-64">
          <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"/>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search merchant or category…"
            className="w-full bg-ink-950/40 border border-white/5 rounded-md pl-9 pr-3 py-2 text-[12.5px] text-ink-100 placeholder:text-ink-400 focus:outline-none focus:border-emerald-glow/40"/>
        </div>
        <div className="flex gap-1 p-1 rounded-md bg-ink-950/40 border border-white/5">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={cn("text-[11.5px] font-mono px-2.5 py-1 rounded transition", filter === f ? "bg-ink-700 text-ink-100" : "text-ink-400 hover:text-ink-100")}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-1 p-1 rounded-md bg-ink-950/40 border border-white/5">
          {scopeFilters.map(f => (
            <button key={f} onClick={() => setScope(f)}
              className={cn("text-[11.5px] font-mono px-2.5 py-1 rounded transition", scope === f ? "bg-ink-700 text-ink-100" : "text-ink-400 hover:text-ink-100")}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/[0.06] bg-ink-900/40 overflow-hidden">
        <div className="grid grid-cols-[40px_2fr_1fr_1fr_1fr_120px_120px] px-5 py-3 text-[10px] uppercase tracking-[0.16em] text-ink-400 font-mono border-b border-white/5 bg-ink-950/40">
          <div></div>
          <div>Merchant</div>
          <div>Category</div>
          <div>Wallet</div>
          <div>When</div>
          <div className="text-right">Status</div>
          <div className="text-right">Amount</div>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {list.map((t, i) => {
            const w = wallets.find(x => x.id === t.walletId)!;
            const isInc = t.type === "income";
            const isXfer = t.type === "transfer";
            return (
              <div key={t.id}
                className="grid grid-cols-[40px_2fr_1fr_1fr_1fr_120px_120px] items-center px-5 py-3 hover:bg-white/[0.02] transition group animate-slide-up"
                style={{ animationDelay: `${i * 25}ms` }}
              >
                <div className="text-xl">{t.categoryIcon}</div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-ink-100 truncate">{t.merchant}</span>
                    {t.scope === "family" && <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-violet-soft/10 text-violet-soft border border-violet-soft/20">F · {t.member}</span>}
                  </div>
                  {t.note && <div className="text-[11px] text-ink-400 truncate mt-0.5">{t.note}</div>}
                </div>
                <div className="text-[12px] text-ink-200">{t.category}</div>
                <div className="flex items-center gap-2 text-[12px] text-ink-300">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: w.color }}/>
                  <span className="truncate">{w.name}</span>
                </div>
                <div className="text-[12px] text-ink-400 font-mono">{timeAgo(t.date)}</div>
                <div className="text-right">
                  {t.status === "pending" ? (
                    <span className="text-[10px] font-mono uppercase px-2 py-1 rounded bg-amber-glow/15 text-amber-glow border border-amber-glow/20 inline-flex items-center gap-1">
                      <IconClock size={9}/> pending
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono uppercase px-2 py-1 rounded bg-emerald-glow/10 text-emerald-glow border border-emerald-glow/15 inline-flex items-center gap-1">
                      <IconCheck size={9}/> done
                    </span>
                  )}
                </div>
                <div className={cn(
                  "text-right font-mono text-[14px] tabular",
                  isInc ? "text-emerald-glow" : isXfer ? "text-cyan-soft" : "text-ink-100"
                )}>
                  {isInc ? "+" : isXfer ? "" : "−"}{formatVND(t.amount)}<span className="text-ink-400 text-[10px]"> ₫</span>
                </div>
              </div>
            );
          })}
        </div>
        {list.length === 0 && (
          <div className="p-12 text-center text-ink-400 text-sm">No transactions match your filters.</div>
        )}
      </div>
    </div>
  );
}
