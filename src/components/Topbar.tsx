import { IconSearch, IconBell, IconPlus, IconBolt } from "./Icons";

export function Topbar({ onAdd }: { onAdd: () => void }) {
  const now = new Date().toLocaleString("en-GB", {
    weekday: "short", day: "2-digit", month: "short",
    hour: "2-digit", minute: "2-digit"
  });

  return (
    <div className="sticky top-0 z-30 bg-ink-950/70 backdrop-blur-xl border-b border-white/5">
      {/* Ticker bar */}
      <div className="border-b border-white/5 overflow-hidden h-7">
        <div className="flex items-center h-full gap-10 animate-ticker whitespace-nowrap font-mono text-[11px] text-ink-300">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex items-center gap-10 pl-10">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-glow animate-pulse"/>LIVE FX · USD/VND <span className="text-ink-100">24,580</span> <span className="text-emerald-glow">+0.12%</span></span>
              <span className="flex items-center gap-2">EUR/VND <span className="text-ink-100">26,710</span> <span className="text-rose-soft">−0.34%</span></span>
              <span className="flex items-center gap-2">GOLD SJC <span className="text-ink-100">84.2M/tael</span> <span className="text-emerald-glow">+0.6%</span></span>
              <span className="flex items-center gap-2">VN-INDEX <span className="text-ink-100">1,287.4</span> <span className="text-emerald-glow">+8.21</span></span>
              <span className="flex items-center gap-2">BTC <span className="text-ink-100">$98,420</span> <span className="text-rose-soft">−1.2%</span></span>
              <span className="flex items-center gap-2">SAVINGS RATE 7-DAY <span className="text-ink-100">5.4% APR</span></span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 px-6 lg:px-8 h-16">
        {/* Search */}
        <div className="flex-1 max-w-xl relative group">
          <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 group-focus-within:text-emerald-glow transition"/>
          <input
            placeholder="Search transactions, merchants, categories…   ⌘K"
            className="w-full bg-ink-900/60 border border-white/5 rounded-lg pl-9 pr-3 py-2 text-[13px] text-ink-100 placeholder:text-ink-400 focus:outline-none focus:border-emerald-glow/40 focus:bg-ink-900 transition"
          />
        </div>

        <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-ink-400 px-3 py-1.5 rounded-md bg-ink-900/60 border border-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-glow"/>
          {now} · ICT
        </div>

        <button className="relative p-2 rounded-lg hover:bg-white/5 text-ink-300 hover:text-ink-100 transition">
          <IconBell size={17}/>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-glow"/>
        </button>

        <button
          onClick={onAdd}
          className="group flex items-center gap-2 pl-2.5 pr-3.5 py-2 rounded-lg bg-emerald-glow text-ink-950 font-medium text-[13px] hover:shadow-[0_0_24px_-4px_rgba(52,224,161,0.7)] transition-shadow"
        >
          <IconPlus size={15} className="group-hover:rotate-90 transition-transform duration-300"/>
          New transaction
          <span className="hidden lg:inline font-mono text-[10px] opacity-60 ml-1 px-1 py-0.5 rounded bg-ink-950/20">N</span>
        </button>

        <button className="hidden md:grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-amber-glow/20 to-rose-soft/10 border border-amber-glow/20 text-amber-glow hover:border-amber-glow/40 transition">
          <IconBolt size={16}/>
        </button>
      </div>
    </div>
  );
}
