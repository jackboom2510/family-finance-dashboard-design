# Family Finance Backend

This backend provides a PostgreSQL-backed API for the family finance dashboard.
It exposes read and write endpoints for wallets, transactions, budgets, members, loans, goals, and dashboard summaries.

## Setup

1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and configure your PostgreSQL connection:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/family_finance
PORT=4000
CORS_ORIGIN=http://localhost:5173
```

4. Initialize the database:

```bash
npm run db:init
```

5. Start the backend in development mode:

```bash
npm run dev
```

## Available endpoints

- `GET /api/health`
- `GET /api/dashboard`
- `GET /api/wallets`
- `GET /api/transactions`
- `POST /api/transactions`
- `GET /api/budgets`
- `GET /api/members`
- `GET /api/loans`
- `GET /api/goals`

## Notes

- The backend uses PostgreSQL as the primary data store.
- CORS is enabled for the Vite frontend at `http://localhost:5173` by default.
- Transaction creation updates wallet balances for `income` and `expense` transactions.
