import { useEffect, useState } from "react";
import { Sidebar, type View } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { Dashboard } from "./components/Dashboard";
import { Transactions } from "./components/Transactions";
import { Wallets } from "./components/Wallets";
import { Budgets } from "./components/Budgets";
import { Family } from "./components/Family";
import { Reports } from "./components/Reports";
import { Loans } from "./components/Loans";
import { AddTxModal } from "./components/AddTxModal";

export default function App() {
  const [view, setView] = useState<View>("dashboard");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "n" && !["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault(); setModalOpen(true);
      }
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100 flex">
      {/* Ambient backdrop */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-emerald-glow/[0.04] blur-3xl"/>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-soft/[0.04] blur-3xl"/>
      </div>

      <Sidebar view={view} setView={setView}/>
      <main className="flex-1 min-w-0 relative">
        <Topbar onAdd={() => setModalOpen(true)}/>
        <div className="pb-12">
          {view === "dashboard" && <Dashboard/>}
          {view === "transactions" && <Transactions/>}
          {view === "wallets" && <Wallets/>}
          {view === "budgets" && <Budgets/>}
          {view === "family" && <Family/>}
          {view === "reports" && <Reports/>}
          {view === "loans" && <Loans/>}
        </div>
      </main>

      <AddTxModal open={modalOpen} onClose={() => setModalOpen(false)}/>
    </div>
  );
}
