BEGIN;

CREATE TABLE IF NOT EXISTS wallets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  balance NUMERIC NOT NULL DEFAULT 0,
  currency TEXT NOT NULL,
  scope TEXT NOT NULL,
  color TEXT NOT NULL,
  last4 TEXT
);

CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  amount NUMERIC NOT NULL CHECK (amount >= 0),
  category TEXT NOT NULL,
  category_icon TEXT NOT NULL,
  merchant TEXT NOT NULL,
  note TEXT,
  date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  wallet_id TEXT NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
  scope TEXT NOT NULL,
  status TEXT NOT NULL,
  member TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS budgets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  spent NUMERIC NOT NULL DEFAULT 0,
  limit NUMERIC NOT NULL,
  scope TEXT NOT NULL,
  period TEXT NOT NULL,
  color TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  initials TEXT NOT NULL,
  role TEXT NOT NULL,
  contribution NUMERIC NOT NULL DEFAULT 0,
  color TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS loans (
  id TEXT PRIMARY KEY,
  direction TEXT NOT NULL,
  counterparty TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  due_date DATE NOT NULL,
  status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS goals (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  saved NUMERIC NOT NULL DEFAULT 0,
  target NUMERIC NOT NULL,
  deadline TEXT NOT NULL,
  emoji TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_transactions_scope ON transactions(scope);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
CREATE INDEX IF NOT EXISTS idx_wallets_scope ON wallets(scope);

COMMIT;
