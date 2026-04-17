import { wallets, formatVND, formatCompact } from "../data";
import { Sparkline } from "./Charts";
import { IconArrowUp, IconPlus } from "./Icons";
import { cn } from "../utils/cn";

const typeLabel: Record<string, string> = {
  bank: "Bank account", cash: "Cash", credit: "Credit card",
  savings: "Savings vault", ewallet: "E-wallet"
};

export function Wallets() {
  const total = wallets.reduce((s, w) => s + w.balance, 0);

  return (
    <div className="px-6 lg:px-8 py-6 space-y-5 animate-fade-in">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono mb-2">Asset map · Wallets</div>
          <h1 className="text-3xl font-medium tracking-tight text-ink-100">Where your money lives</h1>
          <p className="text-[13px] text-ink-300 mt-1">{wallets.length} wallets across personal & family · total <span className="font-mono text-ink-100">{formatVND(total)} ₫</span></p>
        </div>
        <button className="flex items-center gap-1.5 text-[12.5px] px-3.5 py-2 rounded-lg bg-emerald-glow text-ink-950 font-medium hover:shadow-[0_0_20px_-4px_rgba(52,224,161,0.7)]">
          <IconPlus size={14}/> Add wallet
        </button>
      </header>

      {/* Wallet cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {wallets.map((w, i) => {
          const sparkData = Array.from({ length: 14 }, (_, k) =>
            w.balance * (0.92 + Math.sin(k * 0.7 + i) * 0.05 + k * 0.005)
          );
          return (
            <div key={w.id}
              className="group relative rounded-2xl p-5 border border-white/[0.06] bg-gradient-to-br from-ink-800 via-ink-850 to-ink-900 overflow-hidden hover:border-white/15 transition animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full blur-3xl opacity-30" style={{ background: w.color }}/>
              <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"/>

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg grid place-items-center text-[14px] font-bold border border-white/10"
                      style={{ background: `linear-gradient(135deg, ${w.color}40, ${w.color}10)`, color: w.color }}>
                      {w.name[0]}
                    </div>
                    <div>
                      <div className="text-[13px] text-ink-100 font-medium">{w.name}</div>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-ink-400 font-mono">{typeLabel[w.type]}</div>
                    </div>
                  </div>
                  <span className={cn(
                    "text-[9px] font-mono uppercase px-1.5 py-0.5 rounded",
                    w.scope === "family" ? "bg-violet-soft/10 text-violet-soft border border-violet-soft/20" : "bg-emerald-glow/10 text-emerald-glow border border-emerald-glow/20"
                  )}>{w.scope}</span>
                </div>

                {w.last4 && (
                  <div className="mt-4 font-mono text-[12px] text-ink-400 tracking-widest">
                    •••• •••• •••• {w.last4}
                  </div>
                )}

                <div className="mt-4">
                  <div className="text-[10px] uppercase tracking-[0.16em] text-ink-400 font-mono">Balance</div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-3xl font-mono font-light text-ink-100 tabular">{formatVND(w.balance)}</span>
                    <span className="text-ink-400 font-mono text-sm">{w.currency}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-end justify-between">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-glow">
                    <IconArrowUp size={11}/> {(Math.random() * 5 + 1).toFixed(1)}% · 7d
                  </div>
                  <Sparkline data={sparkData} color={w.color} w={120} h={28}/>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-3 gap-2 text-center">
                  <Stat label="In · 30D" value={`+${formatCompact(w.balance * 0.18)}`} color="text-emerald-glow"/>
                  <Stat label="Out · 30D" value={`−${formatCompact(w.balance * 0.12)}`} color="text-rose-soft"/>
                  <Stat label="Tx · 30D" value={String(Math.floor(Math.random() * 30 + 12))} color="text-ink-100"/>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add new card */}
        <button className="rounded-2xl border-2 border-dashed border-white/10 hover:border-emerald-glow/40 hover:bg-emerald-glow/5 transition grid place-items-center min-h-[280px] group">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border border-white/10 grid place-items-center mx-auto mb-3 group-hover:border-emerald-glow group-hover:text-emerald-glow text-ink-400 transition">
              <IconPlus size={20}/>
            </div>
            <div className="text-[13px] text-ink-200">Connect a new wallet</div>
            <div className="text-[11px] text-ink-400 mt-1">Bank, cash, or e-wallet</div>
          </div>
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <div className="text-[9px] uppercase tracking-[0.14em] text-ink-400 font-mono">{label}</div>
      <div className={cn("text-[13px] font-mono tabular mt-0.5", color)}>{value}</div>
    </div>
  );
}
