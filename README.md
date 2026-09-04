# Finora — Personal Finance Management SaaS

> **"Take control of your money."**  
> A production-grade, full-stack personal finance and wealth management application built with Next.js 16 (App Router), TypeScript, Tailwind CSS, Supabase PostgreSQL with Row Level Security (RLS), TanStack Query, React Hook Form, Zod, and Recharts.

---

## 🚀 Live Demo & Portfolio Highlights

Finora is designed as a portfolio showcase demonstrating mastery of modern frontend and full-stack software engineering:

- **Full CRUD Transactions**: Add, edit, filter, search, sort, and delete income & expenses with real-time feedback.
- **Dynamic Budget Tracking**: Set monthly limits per category with real-time calculated spending progress, automatic threshold warnings (>80%), and exceeded alerts (>=100%).
- **Interactive Analytics (Recharts)**: Visual cash flow trajectory, comparative Income vs Expense bar charts, monthly expense trends, donut category distribution, and ranked top spending categories.
- **Database-Level Row Level Security (RLS)**: Strict PostgreSQL security ensuring users can only read, create, update, and delete their own financial records.
- **1-Click Recruiter Sandbox Mode**: Seamlessly explore all CRUD, charts, filters, and budgets with pre-loaded mock datasets without needing an external Supabase account.
- **Complete Dark & Light Mode**: Seamless theme switching with high-contrast fintech aesthetics across all tables, charts, dialogs, and components.
- **Indonesian Rupiah (IDR) Native**: Fully formatted currency (`Rp12.500.000`) and date handling (`03 Sep 2026`).

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router with Server & Client Components) |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS v4 + Design Tokens + CSS Variables |
| **Backend & DB** | Supabase (PostgreSQL, Row Level Security, Auth, Triggers) |
| **State & Fetching** | TanStack React Query v5 |
| **Forms & Validation**| React Hook Form + Zod Schema Validation |
| **Visual Charts** | Recharts (Area, Bar, Pie, Line, ResponsiveContainer) |
| **Icons** | Lucide React |
| **Theming** | `next-themes` (Dark, Light, System) |
| **Toasts / Notifications**| Sonner |

---

## 📁 Architecture & Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Inter font, Theme, Query, Auth, Toast providers)
│   ├── page.tsx                # Landing page & feature showcase
│   ├── login/page.tsx          # Login page with Zod validation + Recruiter sandbox
│   ├── register/page.tsx       # Register page with password match validation
│   ├── dashboard/page.tsx      # Dynamic summary cards, trend charts & widgets
│   ├── transactions/page.tsx   # Ledger with search, multi-filter, sorting & CRUD
│   ├── budgets/page.tsx        # Monthly budget progress & status indicators
│   ├── analytics/page.tsx      # Time-window filtered cashflow & category analytics
│   ├── settings/page.tsx       # Profile, theme, notification & database management
│   ├── auth/callback/route.ts  # Supabase OAuth and confirmation code exchange
│   ├── loading.tsx             # Global skeleton loader
│   ├── error.tsx               # Error boundary with retry action
│   └── not-found.tsx           # 404 page
│
├── components/
│   ├── ui/                     # Reusable design primitives (Button, Input, Card, Dialog, etc.)
│   ├── layout/                 # Sidebar, Header, MobileNav, UserNav, ThemeToggle, BrandLogo
│   ├── common/                 # CategoryIcon, EmptyState, ErrorState, PageHeader
│   ├── dashboard/              # SummaryCard, ExpenseOverviewChart, ExpenseCategoryChart, etc.
│   ├── transactions/           # TransactionTable, TransactionFilters, TransactionModal, etc.
│   ├── budgets/                # BudgetCard, BudgetModal, DeleteBudgetDialog, BudgetSummaryHeader
│   ├── analytics/              # IncomeVsExpenseChart, ExpenseTrendChart, TopSpendingList, etc.
│   ├── settings/               # ProfileSettings, AppearanceSettings, SeedDemoDataModal, etc.
│   └── providers/              # QueryProvider, ThemeProvider, AuthProvider, ToasterProvider
│
├── lib/
│   ├── supabase/               # Browser, Server, and Middleware Supabase clients
│   ├── services/               # API service repository & localStorage sandbox store
│   ├── queries/                # Custom TanStack Query hooks (transactions, budgets, stats, etc.)
│   ├── validations/            # Zod schemas (auth, transaction, budget, profile)
│   ├── constants.ts            # Default categories, navigation, and color tokens
│   └── utils.ts                # IDR currency formatting, date helpers, percentage calculations
│
├── types/                      # Database schema and domain TypeScript interfaces
└── supabase/
    └── schema.sql              # Complete PostgreSQL schema, RLS policies, triggers & seeds
```

---

## 🗄 Database Schema & RLS Policies

The complete database migration script is located at `supabase/schema.sql`.

### Tables Overview

1. **`profiles`**
   - `id` (UUID, Primary Key, references `auth.users(id)`)
   - `full_name` (TEXT)
   - `email` (TEXT)
   - `avatar_url` (TEXT)
   - `currency` (VARCHAR)
   - `created_at`, `updated_at` (TIMESTAMPTZ)

2. **`categories`**
   - `id` (UUID, Primary Key)
   - `name` (TEXT)
   - `type` ('income' | 'expense')
   - `icon` (TEXT)
   - `color` (TEXT)

3. **`transactions`**
   - `id` (UUID, Primary Key)
   - `user_id` (UUID, Foreign Key `auth.users(id)`)
   - `category_id` (UUID, Foreign Key `categories(id)`)
   - `title` (TEXT)
   - `description` (TEXT)
   - `amount` (NUMERIC(15,2))
   - `type` ('income' | 'expense')
   - `transaction_date` (DATE)
   - `created_at`, `updated_at` (TIMESTAMPTZ)

4. **`budgets`**
   - `id` (UUID, Primary Key)
   - `user_id` (UUID, Foreign Key `auth.users(id)`)
   - `category_id` (UUID, Foreign Key `categories(id)`)
   - `amount` (NUMERIC(15,2))
   - `month` (VARCHAR(7) e.g. '2026-09')
   - Unique Constraint: `(user_id, category_id, month)`

### Row Level Security (RLS)

All user-specific tables (`profiles`, `transactions`, `budgets`) have RLS enabled with explicit policies:
```sql
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own transactions"
  ON public.transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions"
  ON public.transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own transactions"
  ON public.transactions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own transactions"
  ON public.transactions FOR DELETE
  USING (auth.uid() = user_id);
```

---

## ⚙️ Environment Variables

Create `.env.local` by copying `.env.local.example`:

```bash
cp .env.local.example .env.local
```

Populate the values from your Supabase Dashboard:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

*(Note: If left blank or using placeholder values, Finora automatically engages its offline interactive sandbox mode).*

---

## 💻 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/finora.git
   cd finora
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Supabase Database:**
   - Go to your [Supabase Dashboard](https://supabase.com/dashboard).
   - Open the **SQL Editor**.
   - Copy and paste the contents of `supabase/schema.sql` and run the script.

4. **Run the local development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 🧪 Validation and Verification Commands

Run code checks and build verification:

```bash
# TypeScript verification
npx tsc --noEmit

# ESLint check
npm run lint

# Production build test
npm run build
```

---

## 🚢 Production Deployment (Vercel)

1. Push your code to GitHub.
2. Import repository to [Vercel](https://vercel.com).
3. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

---

## 👨‍💻 Portfolio Author

- **Developer**: Frontend & Full-Stack Engineer
- **Project**: Finora Personal Finance SaaS
- **License**: MIT
