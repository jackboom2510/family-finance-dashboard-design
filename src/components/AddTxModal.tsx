import { useState } from "react";
import { wallets } from "../data";
import { cn } from "../utils/cn";
import { IconArrowUp, IconArrowDown, IconTransfer, IconCheck } from "./Icons";

export function AddTxModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [type, setType] = useState<"income" | "expense" | "transfer">("expense");
  const [amount, setAmount] = useState("");
  const [walletId, setWalletId] = useState(wallets[0].id);
  const [category, setCategory] = useState("Dining");
  const [note, setNote] = useState("");

  if (!open) return null;

  const categories = ["Dining", "Groceries", "Transport", "Utilities", "Healthcare", "Shopping", "Entertainment", "Coffee"];
  const formatted = amount ? new Intl.NumberFormat("vi-VN").format(Number(amount.replace(/\D/g, "")) || 0) : "0";

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"/>
      <div onClick={e => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800 via-ink-850 to-ink-900 shadow-2xl shadow-black/40 overflow-hidden animate-slide-up"
      >
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-emerald-glow/10 blur-3xl pointer-events-none"/>
        <div className="relative">
          {/* Header */}
          <div className="px-6 pt-5 pb-4 border-b border-white/5 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-ink-400 font-mono">Quick capture</div>
              <div className="text-[16px] text-ink-100 font-medium mt-0.5">New transaction</div>
            </div>
            <button onClick={onClose} className="w-8 h-8 grid place-items-center rounded-lg hover:bg-white/5 text-ink-400 hover:text-ink-100">✕</button>
          </div>

          {/* Type picker */}
          <div className="px-6 pt-4">
            <div className="grid grid-cols-3 gap-2">
              {([
                { id: "expense", label: "Expense", icon: IconArrowDown, activeCls: "border-rose-soft/50 bg-rose-soft/10 text-rose-soft" },
                { id: "income", label: "Income", icon: IconArrowUp, activeCls: "border-emerald-glow/50 bg-emerald-glow/10 text-emerald-glow" },
                { id: "transfer", label: "Transfer", icon: IconTransfer, activeCls: "border-cyan-soft/50 bg-cyan-soft/10 text-cyan-soft" },
              ] as const).map(opt => {
                const Icon = opt.icon;
                const active = type === opt.id;
                return (
                  <button key={opt.id} onClick={() => setType(opt.id)}
                    className={cn(
                      "flex items-center justify-center gap-2 py-2.5 rounded-lg border text-[12.5px] font-medium transition",
                      active ? opt.activeCls : "border-white/5 bg-ink-950/30 text-ink-300 hover:text-ink-100"
                    )}
                  >
                    <Icon size={14}/> {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Big amount input */}
          <div className="px-6 pt-5 pb-2">
            <div className="rounded-xl border border-white/5 bg-ink-950/40 p-5">
              <div className="text-[10px] uppercase tracking-[0.16em] text-ink-400 font-mono">Amount</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-ink-400 text-2xl font-mono">₫</span>
                <input
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="0"
                  inputMode="numeric"
                  className="flex-1 bg-transparent text-4xl font-mono font-light text-ink-100 outline-none placeholder:text-ink-500 tabular"
                />
              </div>
              <div className="text-[12px] text-ink-400 font-mono tabular mt-1">{formatted} VND</div>
            </div>
          </div>

          {/* Form fields */}
          <div className="px-6 py-4 space-y-3">
            <Field label="Wallet">
              <select value={walletId} onChange={e => setWalletId(e.target.value)}
                className="w-full bg-ink-950/40 border border-white/5 rounded-lg px-3 py-2 text-[13px] text-ink-100 focus:outline-none focus:border-emerald-glow/40">
                {wallets.map(w => <option key={w.id} value={w.id}>{w.name} · {w.scope}</option>)}
              </select>
            </Field>

            <Field label="Category">
              <div className="flex flex-wrap gap-1.5">
                {categories.map(c => (
                  <button key={c} onClick={() => setCategory(c)}
                    className={cn(
                      "text-[11.5px] px-2.5 py-1 rounded-md font-mono border transition",
                      category === c ? "border-emerald-glow/50 bg-emerald-glow/10 text-emerald-glow" : "border-white/5 text-ink-300 hover:text-ink-100"
                    )}
                  >{c}</button>
                ))}
              </div>
            </Field>

            <Field label="Note (optional)">
              <input value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. lunch with team"
                className="w-full bg-ink-950/40 border border-white/5 rounded-lg px-3 py-2 text-[13px] text-ink-100 focus:outline-none focus:border-emerald-glow/40 placeholder:text-ink-500"/>
            </Field>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between bg-ink-950/30">
            <div className="text-[11px] text-ink-400 font-mono flex items-center gap-2">
              <IconCheck size={11} className="text-emerald-glow"/>
              Auto-saved as draft
            </div>
            <div className="flex items-center gap-2">
              <button onClick={onClose} className="px-3 py-1.5 rounded-md text-[12.5px] text-ink-300 hover:text-ink-100">Cancel</button>
              <button onClick={onClose} className="px-4 py-1.5 rounded-md text-[12.5px] font-medium bg-emerald-glow text-ink-950 hover:shadow-[0_0_16px_-4px_rgba(52,224,161,0.6)]">
                Confirm transaction
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.16em] text-ink-400 font-mono mb-1.5">{label}</div>
      {children}
    </div>
  );
}
