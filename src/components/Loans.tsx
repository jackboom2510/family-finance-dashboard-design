import { loans, formatVND } from "../data";
import { IconPlus, IconArrowUp, IconArrowDown } from "./Icons";
import { cn } from "../utils/cn";

export function Loans() {
  const lent = loans.filter(l => l.direction === "lent").reduce((s, l) => s + l.amount, 0);
  const borrowed = loans.filter(l => l.direction === "borrowed").reduce((s, l) => s + l.amount, 0);
  const net = lent - borrowed;

  return (
    <div className="px-6 lg:px-8 py-6 space-y-5 animate-fade-in">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono mb-2">Counterparty · Loans / IoU</div>
          <h1 className="text-3xl font-medium tracking-tight text-ink-100">Money owed, money lent</h1>
          <p className="text-[13px] text-ink-300 mt-1">Net position: <span className={cn("font-mono", net >= 0 ? "text-emerald-glow" : "text-rose-soft")}>{net >= 0 ? "+" : ""}{formatVND(net)} ₫</span></p>
        </div>
        <button className="flex items-center gap-1.5 text-[12.5px] px-3.5 py-2 rounded-lg bg-emerald-glow text-ink-950 font-medium">
          <IconPlus size={14}/> New record
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-emerald-glow/10 to-transparent p-5">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-emerald-glow font-mono">
            <IconArrowUp size={11}/> Lent out
          </div>
          <div className="text-3xl font-mono font-light text-ink-100 mt-2 tabular">{formatVND(lent)}<span className="text-ink-400 text-base"> ₫</span></div>
          <div className="text-[11px] text-ink-400 mt-1 font-mono">2 active loans</div>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-rose-soft/10 to-transparent p-5">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-rose-soft font-mono">
            <IconArrowDown size={11}/> Borrowed
          </div>
          <div className="text-3xl font-mono font-light text-ink-100 mt-2 tabular">{formatVND(borrowed)}<span className="text-ink-400 text-base"> ₫</span></div>
          <div className="text-[11px] text-ink-400 mt-1 font-mono">1 active debt · 1 overdue</div>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-ink-900/40 p-5">
          <div className="text-[11px] uppercase tracking-[0.16em] text-ink-400 font-mono">Net position</div>
          <div className={cn("text-3xl font-mono font-light mt-2 tabular", net >= 0 ? "text-emerald-glow" : "text-rose-soft")}>
            {net >= 0 ? "+" : ""}{formatVND(net)}<span className="text-ink-400 text-base"> ₫</span>
          </div>
          <div className="text-[11px] text-ink-400 mt-1 font-mono">in your favor</div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-ink-900/40 overflow-hidden">
        <div className="grid grid-cols-[1fr_120px_140px_140px_140px_120px] px-5 py-3 text-[10px] uppercase tracking-[0.16em] text-ink-400 font-mono border-b border-white/5 bg-ink-950/40">
          <div>Counterparty</div>
          <div>Direction</div>
          <div>Amount</div>
          <div>Due date</div>
          <div>Status</div>
          <div className="text-right">Action</div>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {loans.map((l, i) => (
            <div key={l.id} className="grid grid-cols-[1fr_120px_140px_140px_140px_120px] items-center gap-2 px-5 py-4 hover:bg-white/[0.02] animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ink-700 grid place-items-center text-[11px] font-mono text-ink-200">{l.counterparty[0]}</div>
                <span className="text-[13px] text-ink-100">{l.counterparty}</span>
              </div>
              <div className={cn(
                "text-[10px] font-mono uppercase px-2 py-1 rounded inline-flex items-center gap-1 w-fit",
                l.direction === "lent" ? "bg-emerald-glow/10 text-emerald-glow border border-emerald-glow/20" : "bg-rose-soft/10 text-rose-soft border border-rose-soft/20"
              )}>
                {l.direction === "lent" ? <IconArrowUp size={9}/> : <IconArrowDown size={9}/>}
                {l.direction}
              </div>
              <div className="font-mono text-[14px] text-ink-100 tabular">{formatVND(l.amount)} <span className="text-ink-400 text-[10px]">₫</span></div>
              <div className="text-[12px] text-ink-300 font-mono">{l.dueDate}</div>
              <div>
                <span className={cn(
                  "text-[10px] font-mono uppercase px-2 py-1 rounded",
                  l.status === "overdue" ? "bg-rose-soft/15 text-rose-soft border border-rose-soft/20 animate-pulse" :
                  l.status === "settled" ? "bg-ink-700 text-ink-300" :
                  "bg-amber-glow/10 text-amber-glow border border-amber-glow/20"
                )}>{l.status}</span>
              </div>
              <div className="text-right">
                <button className="text-[11px] text-emerald-glow hover:underline font-mono">Settle →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
