import express from "express";
import cors from "cors";
import { randomUUID } from "crypto";
import { query, getClient } from "./db.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors({ origin: process.env.CORS_ORIGIN ?? "http://localhost:5173" }));
app.use(express.json());

function parsePositiveInt(value: unknown, fallback: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

app.get("/api/health", async (req, res) => {
  try {
    const result = await query("SELECT true AS ok");
    res.json({ ok: result.rows[0]?.ok ?? false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "Database connection failed." });
  }
});

app.get("/api/wallets", async (req, res) => {
  const result = await query("SELECT * FROM wallets ORDER BY name");
  res.json(result.rows);
});

app.get("/api/transactions", async (req, res) => {
  const clauses: string[] = [];
  const params: unknown[] = [];

  if (req.query.scope) {
    params.push(String(req.query.scope));
    clauses.push(`scope = $${params.length}`);
  }
  if (req.query.type) {
    params.push(String(req.query.type));
    clauses.push(`type = $${params.length}`);
  }
  if (req.query.status) {
    params.push(String(req.query.status));
    clauses.push(`status = $${params.length}`);
  }

  const limit = parsePositiveInt(req.query.limit, 100);
  params.push(limit);

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const sql = `SELECT * FROM transactions ${where} ORDER BY date DESC LIMIT $${params.length}`;
  const result = await query(sql, params);
  res.json(result.rows);
});

app.post("/api/transactions", async (req, res) => {
  const {
    type,
    amount,
    category,
    categoryIcon,
    merchant,
    note,
    date,
    walletId,
    scope,
    status,
    member,
  } = req.body;

  if (!type || !amount || !category || !walletId || !scope || !status || !merchant) {
    return res.status(400).json({ error: "Missing required transaction fields." });
  }

  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount < 0) {
    return res.status(400).json({ error: "Amount must be a positive number." });
  }

  const transactionId = randomUUID();
  const timestamp = date ? new Date(date).toISOString() : new Date().toISOString();
  const icon = String(categoryIcon ?? category.slice(0, 2));

  const client = await getClient();
  try {
    await client.query("BEGIN");

    await client.query(
      `INSERT INTO transactions (
        id, type, amount, category, category_icon, merchant, note, date,
        wallet_id, scope, status, member
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        transactionId,
        type,
        numericAmount,
        category,
        icon,
        merchant,
        note ?? null,
        timestamp,
        walletId,
        scope,
        status,
        member ?? null,
      ]
    );

    if (type === "income" || type === "expense") {
      const balanceDelta = type === "income" ? numericAmount : -numericAmount;
      await client.query("UPDATE wallets SET balance = balance + $1 WHERE id = $2", [balanceDelta, walletId]);
    }

    await client.query("COMMIT");
    res.status(201).json({ id: transactionId, type, amount: numericAmount, category, categoryIcon: icon, merchant, note, date: timestamp, walletId, scope, status, member });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ error: "Unable to create transaction." });
  } finally {
    client.release();
  }
});

app.get("/api/budgets", async (req, res) => {
  const result = await query("SELECT * FROM budgets ORDER BY name");
  res.json(result.rows);
});

app.get("/api/members", async (req, res) => {
  const result = await query("SELECT * FROM members ORDER BY name");
  res.json(result.rows);
});

app.get("/api/loans", async (req, res) => {
  const result = await query("SELECT * FROM loans ORDER BY due_date DESC");
  res.json(result.rows);
});

app.get("/api/goals", async (req, res) => {
  const result = await query("SELECT * FROM goals ORDER BY deadline DESC");
  res.json(result.rows);
});

app.get("/api/dashboard", async (req, res) => {
  const [summaryResult, walletResult, recentResult] = await Promise.all([
    query(`
      SELECT
        COUNT(*) FILTER (WHERE type = 'expense') AS expense_count,
        COUNT(*) FILTER (WHERE type = 'income') AS income_count,
        COALESCE(SUM(amount) FILTER (WHERE type = 'expense'), 0) AS expense_total,
        COALESCE(SUM(amount) FILTER (WHERE type = 'income'), 0) AS income_total
      FROM transactions
    `),
    query("SELECT * FROM wallets ORDER BY balance DESC"),
    query("SELECT * FROM transactions ORDER BY date DESC LIMIT 5"),
  ]);

  res.json({
    summary: summaryResult.rows[0],
    wallets: walletResult.rows,
    recentTransactions: recentResult.rows,
  });
});

app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});
