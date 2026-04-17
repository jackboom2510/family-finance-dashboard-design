export type TxType = "income" | "expense" | "transfer";
export type TxStatus = "completed" | "pending";
export type Scope = "personal" | "family";

export interface Wallet {
  id: string;
  name: string;
  type: "cash" | "bank" | "credit" | "savings" | "ewallet";
  balance: number;
  currency: "VND" | "USD";
  scope: Scope;
  color: string;
  last4?: string;
}

export interface Transaction {
  id: string;
  type: TxType;
  amount: number;
  category: string;
  categoryIcon: string;
  merchant: string;
  note?: string;
  date: string; // ISO
  walletId: string;
  scope: Scope;
  status: TxStatus;
  member?: string; // family member who logged it
}

export interface Budget {
  id: string;
  name: string;
  category: string;
  spent: number;
  limit: number;
  scope: Scope;
  period: "month" | "week";
  color: string;
}

export interface Goal {
  id: string;
  name: string;
  saved: number;
  target: number;
  deadline: string;
  emoji: string;
}

export interface Member {
  id: string;
  name: string;
  initials: string;
  role: "Owner" | "Editor" | "Viewer";
  contribution: number; // this month
  color: string;
}

export interface Loan {
  id: string;
  direction: "lent" | "borrowed";
  counterparty: string;
  amount: number;
  dueDate: string;
  status: "active" | "overdue" | "settled";
}

export const wallets: Wallet[] = [
  { id: "w1", name: "Techcombank Visa", type: "bank", balance: 48720000, currency: "VND", scope: "personal", color: "#34e0a1", last4: "4821" },
  { id: "w2", name: "Cash Wallet", type: "cash", balance: 2150000, currency: "VND", scope: "personal", color: "#ffb547" },
  { id: "w3", name: "MoMo", type: "ewallet", balance: 1380000, currency: "VND", scope: "personal", color: "#f25f7a" },
  { id: "w4", name: "Family Joint — VCB", type: "bank", balance: 124500000, currency: "VND", scope: "family", color: "#8b7df5", last4: "7733" },
  { id: "w5", name: "House Savings", type: "savings", balance: 380000000, currency: "VND", scope: "family", color: "#4cc9f0" },
];

const today = new Date();
const d = (offsetMin: number) => {
  const dt = new Date(today.getTime() - offsetMin * 60000);
  return dt.toISOString();
};

export const transactions: Transaction[] = [
  { id: "t1", type: "expense", amount: 185000, category: "Dining", categoryIcon: "🍜", merchant: "Phở Thìn Lò Đúc", note: "Lunch with team", date: d(45), walletId: "w1", scope: "personal", status: "completed" },
  { id: "t2", type: "income", amount: 28500000, category: "Salary", categoryIcon: "💼", merchant: "Acme Corp Payroll", date: d(180), walletId: "w1", scope: "personal", status: "completed" },
  { id: "t3", type: "expense", amount: 42000, category: "Transport", categoryIcon: "🛵", merchant: "Grab Bike", date: d(220), walletId: "w3", scope: "personal", status: "completed" },
  { id: "t4", type: "expense", amount: 1240000, category: "Groceries", categoryIcon: "🛒", merchant: "Winmart Royal City", note: "Weekly grocery run", date: d(360), walletId: "w4", scope: "family", status: "completed", member: "Linh" },
  { id: "t5", type: "expense", amount: 320000, category: "Utilities", categoryIcon: "💡", merchant: "EVN — Electricity", date: d(480), walletId: "w4", scope: "family", status: "pending", member: "Minh" },
  { id: "t6", type: "transfer", amount: 5000000, category: "Transfer", categoryIcon: "🔁", merchant: "→ House Savings", date: d(720), walletId: "w5", scope: "family", status: "completed", member: "Minh" },
  { id: "t7", type: "expense", amount: 89000, category: "Coffee", categoryIcon: "☕", merchant: "% Arabica Hanoi", date: d(1100), walletId: "w2", scope: "personal", status: "completed" },
  { id: "t8", type: "expense", amount: 2150000, category: "Shopping", categoryIcon: "🛍️", merchant: "Uniqlo Vincom", date: d(1500), walletId: "w1", scope: "personal", status: "completed" },
  { id: "t9", type: "income", amount: 4500000, category: "Freelance", categoryIcon: "💻", merchant: "Design contract — H.K.", date: d(2100), walletId: "w1", scope: "personal", status: "completed" },
  { id: "t10", type: "expense", amount: 760000, category: "Dining", categoryIcon: "🍣", merchant: "Sushi Hokkaido", date: d(2400), walletId: "w4", scope: "family", status: "completed", member: "Linh" },
  { id: "t11", type: "expense", amount: 1850000, category: "Healthcare", categoryIcon: "🏥", merchant: "Vinmec — Pediatric", date: d(2880), walletId: "w4", scope: "family", status: "completed", member: "Minh" },
  { id: "t12", type: "expense", amount: 540000, category: "Entertainment", categoryIcon: "🎬", merchant: "CGV — Aeon Mall", date: d(3300), walletId: "w1", scope: "personal", status: "completed" },
];

export const budgets: Budget[] = [
  { id: "b1", name: "Dining out", category: "Dining", spent: 2450000, limit: 3000000, scope: "personal", period: "month", color: "#ffb547" },
  { id: "b2", name: "Groceries", category: "Groceries", spent: 4120000, limit: 5000000, scope: "family", period: "month", color: "#34e0a1" },
  { id: "b3", name: "Transport", category: "Transport", spent: 880000, limit: 1500000, scope: "personal", period: "month", color: "#4cc9f0" },
  { id: "b4", name: "Entertainment", category: "Entertainment", spent: 1980000, limit: 2000000, scope: "personal", period: "month", color: "#f25f7a" },
  { id: "b5", name: "Utilities", category: "Utilities", spent: 1620000, limit: 2200000, scope: "family", period: "month", color: "#8b7df5" },
];

export const goals: Goal[] = [
  { id: "g1", name: "House down payment", saved: 380000000, target: 800000000, deadline: "2027-06", emoji: "🏠" },
  { id: "g2", name: "Tokyo trip — Spring", saved: 24000000, target: 60000000, deadline: "2026-04", emoji: "🗼" },
  { id: "g3", name: "Emergency fund", saved: 95000000, target: 120000000, deadline: "2026-12", emoji: "🛟" },
];

export const members: Member[] = [
  { id: "m1", name: "Minh Nguyễn", initials: "MN", role: "Owner", contribution: 32500000, color: "#34e0a1" },
  { id: "m2", name: "Linh Phạm", initials: "LP", role: "Editor", contribution: 18200000, color: "#8b7df5" },
  { id: "m3", name: "Bà Hoa", initials: "BH", role: "Viewer", contribution: 0, color: "#ffb547" },
  { id: "m4", name: "Bé An", initials: "BA", role: "Viewer", contribution: 0, color: "#f25f7a" },
];

export const loans: Loan[] = [
  { id: "l1", direction: "lent", counterparty: "Anh Tùng", amount: 5000000, dueDate: "2026-02-15", status: "active" },
  { id: "l2", direction: "borrowed", counterparty: "Mẹ", amount: 12000000, dueDate: "2026-01-30", status: "overdue" },
  { id: "l3", direction: "lent", counterparty: "Hà — đồng nghiệp", amount: 800000, dueDate: "2026-01-20", status: "active" },
];

// 30-day cashflow series (income vs expense)
export const cashflow30d = Array.from({ length: 30 }, (_, i) => {
  const seed = Math.sin(i * 1.3) * 0.5 + 0.5;
  const seed2 = Math.cos(i * 0.8) * 0.5 + 0.5;
  return {
    day: i + 1,
    income: Math.round((1500000 + seed * 4500000 + (i === 5 ? 28000000 : 0)) ),
    expense: Math.round((900000 + seed2 * 3200000 + (i === 12 ? 8500000 : 0))),
  };
});

// category breakdown for current month
export const categoryBreakdown = [
  { name: "Groceries", value: 5360000, color: "#34e0a1" },
  { name: "Dining", value: 3210000, color: "#ffb547" },
  { name: "Transport", value: 880000, color: "#4cc9f0" },
  { name: "Utilities", value: 1620000, color: "#8b7df5" },
  { name: "Healthcare", value: 1850000, color: "#f25f7a" },
  { name: "Shopping", value: 2150000, color: "#e3e7f0" },
  { name: "Entertainment", value: 1980000, color: "#34e0a1" },
];

export const formatVND = (n: number) =>
  new Intl.NumberFormat("vi-VN").format(Math.round(n));

export const formatCompact = (n: number) => {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return String(n);
};

export const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const dd = Math.floor(h / 24);
  return `${dd}d ago`;
};
