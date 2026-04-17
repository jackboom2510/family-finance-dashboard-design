import { members, wallets, transactions, formatVND, formatCompact, timeAgo } from "../data";
import { IconPlus, IconShield, IconCheck } from "./Icons";
import { cn } from "../utils/cn";

export function Family() {
  const familyWallets = wallets.filter(w => w.scope === "family");
  const familyTotal = familyWallets.reduce((s, w) => s + w.balance, 0);
  const totalContrib = members.reduce((s, m) => s + m.contribution, 0);
  const familyTx = transactions.filter(t => t.scope === "family");

  return (
    <div className="px-6 lg:px-8 py-6 space-y-5 animate-fade-in">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono mb-2 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-violet-soft"/>
            Family · Nguyễn Household
          </div>
          <h1 className="text-3xl font-medium tracking-tight text-ink-100">Shared finances</h1>
          <p className="text-[13px] text-ink-300 mt-1">{members.length} members · {familyWallets.length} shared wallets · joint balance <span className="font-mono text-ink-100">{formatVND(familyTotal)} ₫</span></p>
        </div>
        <button className="flex items-center gap-1.5 text-[12.5px] px-3.5 py-2 rounded-lg bg-violet-soft text-ink-950 font-medium">
          <IconPlus size={14}/> Invite member
        </button>
      </header>

      <div className="grid grid-cols-12 gap-4">
        {/* Members */}
        <div className="col-span-12 lg:col-span-8 rounded-2xl border border-white/[0.06] bg-ink-900/40 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono">Members & roles</div>
              <div className="text-[14px] text-ink-100 mt-0.5">Permissions across the family workspace</div>
            </div>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {members.map((m, i) => {
              const pct = totalContrib > 0 ? (m.contribution / totalContrib) * 100 : 0;
              return (
                <div key={m.id}
                  className="grid grid-cols-[1fr_180px_140px_120px] items-center gap-4 px-5 py-4 hover:bg-white/[0.02] animate-slide-up"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full grid place-items-center text-[13px] font-semibold ring-2 ring-ink-900"
                      style={{ background: m.color, color: "#0b0e13" }}>{m.initials}</div>
                    <div>
                      <div className="text-[14px] text-ink-100">{m.name}</div>
                      <div className="text-[11px] text-ink-400 font-mono mt-0.5">last active · {timeAgo(transactions[0].date)}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-ink-400 font-mono mb-1">Contribution · Jan</div>
                    <div className="font-mono text-ink-100 tabular">{formatCompact(m.contribution)} ₫</div>
                    <div className="h-1 mt-1.5 rounded-full bg-ink-800 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: m.color }}/>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-[10px] font-mono uppercase px-2 py-1 rounded inline-flex items-center gap-1",
                      m.role === "Owner" ? "bg-emerald-glow/15 text-emerald-glow border border-emerald-glow/20" :
                      m.role === "Editor" ? "bg-cyan-soft/15 text-cyan-soft border border-cyan-soft/20" :
                      "bg-ink-700 text-ink-300 border border-white/5"
                    )}>
                      {m.role === "Owner" && <IconShield size={9}/>}
                      {m.role}
                    </span>
                  </div>
                  <div className="text-right">
                    <button className="text-[11px] text-ink-400 hover:text-ink-100 font-mono">Manage →</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Permission matrix */}
        <div className="col-span-12 lg:col-span-4 rounded-2xl border border-white/[0.06] bg-ink-900/40 p-5">
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono">Permission matrix</div>
          <div className="text-[14px] text-ink-100 mt-0.5">Who can do what</div>
          <div className="mt-4 space-y-2.5">
            {[
              { perm: "View transactions", o: true, e: true, v: true },
              { perm: "Add transaction", o: true, e: true, v: false },
              { perm: "Edit budgets", o: true, e: true, v: false },
              { perm: "Transfer funds", o: true, e: false, v: false },
              { perm: "Invite members", o: true, e: false, v: false },
              { perm: "Delete wallet", o: true, e: false, v: false },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-[1fr_30px_30px_30px] items-center gap-2 text-[12px] py-1.5 border-b border-white/[0.03]">
                <span className="text-ink-200">{row.perm}</span>
                <Cell on={row.o}/><Cell on={row.e}/><Cell on={row.v}/>
              </div>
            ))}
            <div className="grid grid-cols-[1fr_30px_30px_30px] items-center gap-2 text-[9px] font-mono uppercase tracking-wider text-ink-400 pt-2">
              <span/>
              <span className="text-center">O</span><span className="text-center">E</span><span className="text-center">V</span>
            </div>
          </div>
        </div>

        {/* Shared wallets */}
        <div className="col-span-12 lg:col-span-7 rounded-2xl border border-white/[0.06] bg-ink-900/40 p-5">
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono">Shared wallets</div>
          <div className="text-[14px] text-ink-100 mt-0.5 mb-4">Joint accounts open to family members</div>
          <div className="space-y-3">
            {familyWallets.map(w => (
              <div key={w.id} className="rounded-xl border border-white/5 bg-ink-950/30 p-4 flex items-center gap-4 hover:border-violet-soft/30 transition">
                <div className="w-10 h-10 rounded-lg grid place-items-center text-[14px] font-bold border border-white/10"
                  style={{ background: `${w.color}20`, color: w.color }}>{w.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] text-ink-100">{w.name}</div>
                  <div className="text-[11px] text-ink-400 font-mono mt-0.5">{w.type} · 4 members access</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[16px] tabular text-ink-100">{formatVND(w.balance)} <span className="text-ink-400 text-[11px]">₫</span></div>
                  <div className="flex -space-x-1.5 justify-end mt-1">
                    {members.map(m => (
                      <div key={m.id} className="w-5 h-5 rounded-full grid place-items-center text-[8px] font-bold ring-2 ring-ink-900" style={{ background: m.color, color: "#0b0e13" }}>{m.initials[0]}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Family activity feed */}
        <div className="col-span-12 lg:col-span-5 rounded-2xl border border-white/[0.06] bg-ink-900/40 p-5">
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-mono">Family activity</div>
          <div className="text-[14px] text-ink-100 mt-0.5 mb-4">Recent shared transactions</div>
          <div className="space-y-2.5">
            {familyTx.map(t => {
              const member = members.find(m => m.name.startsWith(t.member || ""));
              return (
                <div key={t.id} className="flex items-start gap-3 text-[12.5px]">
                  <div className="w-7 h-7 rounded-full grid place-items-center text-[10px] font-semibold shrink-0" style={{ background: member?.color || "#666", color: "#0b0e13" }}>{member?.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-ink-100">
                      <span className="text-ink-300">{t.member}</span> {t.type === "transfer" ? "transferred" : t.type === "income" ? "received" : "spent"}{" "}
                      <span className="font-mono text-ink-100">{formatCompact(t.amount)} ₫</span>
                    </div>
                    <div className="text-[11px] text-ink-400 mt-0.5 truncate">{t.merchant} · {timeAgo(t.date)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Cell({ on }: { on: boolean }) {
  return (
    <div className="flex justify-center">
      {on ? (
        <div className="w-5 h-5 rounded grid place-items-center bg-emerald-glow/15 text-emerald-glow border border-emerald-glow/30">
          <IconCheck size={11}/>
        </div>
      ) : (
        <div className="w-5 h-5 rounded grid place-items-center text-ink-500 border border-white/5">
          <span className="text-[14px] leading-none">−</span>
        </div>
      )}
    </div>
  );
}
