import { IconDashboard, IconList, IconWallet, IconBudget, IconFamily, IconChart, IconLoan, IconSettings, IconShield } from "./Icons";
import { cn } from "../utils/cn";

export type View = "dashboard" | "transactions" | "wallets" | "budgets" | "family" | "reports" | "loans";

const items: { id: View; label: string; icon: React.FC<any>; badge?: string }[] = [
  { id: "dashboard", label: "Overview", icon: IconDashboard },
  { id: "transactions", label: "Transactions", icon: IconList, badge: "12" },
  { id: "wallets", label: "Wallets", icon: IconWallet },
  { id: "budgets", label: "Budgets & Goals", icon: IconBudget },
  { id: "family", label: "Family Group", icon: IconFamily, badge: "4" },
  { id: "loans", label: "Loans / IoU", icon: IconLoan, badge: "1" },
  { id: "reports", label: "Reports", icon: IconChart },
];

export function Sidebar({ view, setView }: { view: View; setView: (v: View) => void }) {
  return (
    <aside className="hidden lg:flex flex-col w-[248px] shrink-0 border-r border-white/5 bg-ink-950/60 backdrop-blur-xl h-screen sticky top-0">
      {/* Brand */}
      <div className="px-5 pt-6 pb-5 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-glow to-emerald-deep grid place-items-center shadow-[0_0_24px_-4px_rgba(52,224,161,0.6)]">
            <span className="font-mono font-bold text-ink-950 text-lg leading-none">L</span>
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-glow animate-pulse-glow"/>
          </div>
          <div>
            <div className="text-[15px] font-semibold tracking-tight text-ink-100">Ledger<span className="text-emerald-glow">OS</span></div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-400 font-mono">v2.4 · live</div>
          </div>
        </div>
      </div>

      {/* Scope switcher */}
      <div className="px-3 py-4 border-b border-white/5">
        <div className="text-[10px] uppercase tracking-[0.16em] text-ink-400 font-mono px-2 mb-2">Active scope</div>
        <div className="flex gap-1 p-1 rounded-lg bg-ink-900 border border-white/5">
          <button className="flex-1 text-xs font-medium py-1.5 rounded-md bg-ink-700 text-ink-100 shadow-inner">Personal</button>
          <button className="flex-1 text-xs font-medium py-1.5 rounded-md text-ink-300 hover:text-ink-100">Family</button>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <div className="text-[10px] uppercase tracking-[0.16em] text-ink-400 font-mono px-2 mb-2">Workspace</div>
        {items.map((it) => {
          const Icon = it.icon;
          const active = view === it.id;
          return (
            <button
              key={it.id}
              onClick={() => setView(it.id)}
              className={cn(
                "w-full group flex items-center gap-3 px-2.5 py-2 rounded-lg text-[13.5px] transition-all relative",
                active ? "bg-gradient-to-r from-emerald-glow/10 to-transparent text-ink-100" : "text-ink-300 hover:text-ink-100 hover:bg-white/[0.03]"
              )}
            >
              {active && <div className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-r bg-emerald-glow shadow-[0_0_8px_rgba(52,224,161,0.8)]"/>}
              <Icon size={17} className={cn(active ? "text-emerald-glow" : "text-ink-400 group-hover:text-ink-200")}/>
              <span className="flex-1 text-left">{it.label}</span>
              {it.badge && (
                <span className={cn(
                  "text-[10px] font-mono px-1.5 py-0.5 rounded",
                  active ? "bg-emerald-glow/20 text-emerald-glow" : "bg-ink-800 text-ink-300"
                )}>{it.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User + status */}
      <div className="px-3 py-3 border-t border-white/5 space-y-3">
        <div className="px-2 flex items-center gap-2 text-[11px] text-ink-300">
          <IconShield size={13} className="text-emerald-glow"/>
          <span className="font-mono">End-to-end encrypted</span>
        </div>
        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-soft to-cyan-soft grid place-items-center text-[11px] font-semibold text-ink-950">MN</div>
          <div className="flex-1 text-left">
            <div className="text-[12.5px] text-ink-100 leading-tight">Minh Nguyễn</div>
            <div className="text-[10px] text-ink-400 font-mono">Owner · Pro</div>
          </div>
          <IconSettings size={14} className="text-ink-400"/>
        </button>
      </div>
    </aside>
  );
}
