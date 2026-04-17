INSERT INTO wallets (id, name, type, balance, currency, scope, color, last4) VALUES
  ('w1', 'Techcombank Visa', 'bank', 48720000, 'VND', 'personal', '#34e0a1', '4821'),
  ('w2', 'Cash Wallet', 'cash', 2150000, 'VND', 'personal', '#ffb547', NULL),
  ('w3', 'MoMo', 'ewallet', 1380000, 'VND', 'personal', '#f25f7a', NULL),
  ('w4', 'Family Joint — VCB', 'bank', 124500000, 'VND', 'family', '#8b7df5', '7733'),
  ('w5', 'House Savings', 'savings', 380000000, 'VND', 'family', '#4cc9f0', NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO transactions (id, type, amount, category, category_icon, merchant, note, date, wallet_id, scope, status, member) VALUES
  ('t1', 'expense', 185000, 'Dining', '🍜', 'Phở Thìn Lò Đúc', 'Lunch with team', NOW() - INTERVAL '45 minutes', 'w1', 'personal', 'completed', NULL),
  ('t2', 'income', 28500000, 'Salary', '💼', 'Acme Corp Payroll', NULL, NOW() - INTERVAL '180 minutes', 'w1', 'personal', 'completed', NULL),
  ('t3', 'expense', 42000, 'Transport', '🛵', 'Grab Bike', NULL, NOW() - INTERVAL '220 minutes', 'w3', 'personal', 'completed', NULL),
  ('t4', 'expense', 1240000, 'Groceries', '🛒', 'Winmart Royal City', 'Weekly grocery run', NOW() - INTERVAL '360 minutes', 'w4', 'family', 'completed', 'Linh'),
  ('t5', 'expense', 320000, 'Utilities', '💡', 'EVN — Electricity', NULL, NOW() - INTERVAL '480 minutes', 'w4', 'family', 'pending', 'Minh'),
  ('t6', 'transfer', 5000000, 'Transfer', '🔁', '→ House Savings', NULL, NOW() - INTERVAL '720 minutes', 'w5', 'family', 'completed', 'Minh'),
  ('t7', 'expense', 89000, 'Coffee', '☕', '% Arabica Hanoi', NULL, NOW() - INTERVAL '1100 minutes', 'w2', 'personal', 'completed', NULL),
  ('t8', 'expense', 2150000, 'Shopping', '🛍️', 'Uniqlo Vincom', NULL, NOW() - INTERVAL '1500 minutes', 'w1', 'personal', 'completed', NULL),
  ('t9', 'income', 4500000, 'Freelance', '💻', 'Design contract — H.K.', NULL, NOW() - INTERVAL '2100 minutes', 'w1', 'personal', 'completed', NULL),
  ('t10', 'expense', 760000, 'Dining', '🍣', 'Sushi Hokkaido', NULL, NOW() - INTERVAL '2400 minutes', 'w4', 'family', 'completed', 'Linh'),
  ('t11', 'expense', 1850000, 'Healthcare', '🏥', 'Vinmec — Pediatric', NULL, NOW() - INTERVAL '2880 minutes', 'w4', 'family', 'completed', 'Minh'),
  ('t12', 'expense', 540000, 'Entertainment', '🎬', 'CGV — Aeon Mall', NULL, NOW() - INTERVAL '3300 minutes', 'w1', 'personal', 'completed', NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO budgets (id, name, category, spent, limit, scope, period, color) VALUES
  ('b1', 'Dining out', 'Dining', 2450000, 3000000, 'personal', 'month', '#ffb547'),
  ('b2', 'Groceries', 'Groceries', 4120000, 5000000, 'family', 'month', '#34e0a1'),
  ('b3', 'Transport', 'Transport', 880000, 1500000, 'personal', 'month', '#4cc9f0'),
  ('b4', 'Entertainment', 'Entertainment', 1980000, 2000000, 'personal', 'month', '#f25f7a'),
  ('b5', 'Utilities', 'Utilities', 1620000, 2200000, 'family', 'month', '#8b7df5')
ON CONFLICT (id) DO NOTHING;

INSERT INTO members (id, name, initials, role, contribution, color) VALUES
  ('m1', 'Minh Nguyễn', 'MN', 'Owner', 32500000, '#34e0a1'),
  ('m2', 'Linh Phạm', 'LP', 'Editor', 18200000, '#8b7df5'),
  ('m3', 'Bà Hoa', 'BH', 'Viewer', 0, '#ffb547'),
  ('m4', 'Bé An', 'BA', 'Viewer', 0, '#f25f7a')
ON CONFLICT (id) DO NOTHING;

INSERT INTO loans (id, direction, counterparty, amount, due_date, status) VALUES
  ('l1', 'lent', 'Anh Tùng', 5000000, '2026-02-15', 'active'),
  ('l2', 'borrowed', 'Mẹ', 12000000, '2026-01-30', 'overdue'),
  ('l3', 'lent', 'Hà — đồng nghiệp', 800000, '2026-01-20', 'active')
ON CONFLICT (id) DO NOTHING;

INSERT INTO goals (id, name, saved, target, deadline, emoji) VALUES
  ('g1', 'House down payment', 380000000, 800000000, '2027-06', '🏠'),
  ('g2', 'Tokyo trip — Spring', 24000000, 60000000, '2026-04', '🗼'),
  ('g3', 'Emergency fund', 95000000, 120000000, '2026-12', '🛟')
ON CONFLICT (id) DO NOTHING;
