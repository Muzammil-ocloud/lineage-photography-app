# Lineage Photography App

Production-ready Next.js full-stack application with Supabase authentication, PostgreSQL database, and a scalable layered architecture.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS v4**
- **Supabase** (Auth + PostgreSQL + Storage-ready)
- **React Hook Form** + **Zod**
- **ESLint** + **Prettier**
- **next-themes** (dark mode)
- **Sonner** (toasts)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Database setup

Run the migration in `supabase/migrations/001_profiles.sql` via the Supabase SQL editor or CLI.

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | Description                     |
| ------------------- | ------------------------------- |
| `npm run dev`       | Start development server        |
| `npm run build`     | Production build                |
| `npm run start`     | Start production server         |
| `npm run lint`      | Run ESLint                      |
| `npm run lint:fix`  | Fix ESLint issues               |
| `npm run format`    | Format with Prettier            |
| `npm run typecheck` | TypeScript check                |
| `npm run check`     | Typecheck + lint + format check |

## Architecture

```
Browser → Next.js App Router (RSC + Client Components)
              ↓
        Server Actions / API Routes
              ↓
           Services (business logic)
              ↓
        Repositories (data access)
              ↓
        Supabase Client (Auth + PostgreSQL)
```

**Supabase is used only for:** Authentication, PostgreSQL, and Storage (future). All backend logic runs in Next.js API routes and server actions — no Edge Functions.

## Folder Structure

```
src/
├── app/
│   ├── (auth)/          # Login, signup, password reset
│   ├── (dashboard)/     # Protected dashboard + profile
│   ├── api/             # Route handlers (auth, users, profile)
│   └── actions/         # Server actions
├── components/
│   ├── ui/              # Button, Input, Card, Skeleton...
│   ├── forms/           # Auth & profile forms
│   ├── layouts/         # Marketing, auth, dashboard layouts
│   └── shared/          # Theme toggle, empty states
├── lib/
│   ├── supabase/        # Browser, server, admin, middleware clients
│   ├── api/             # Response helpers, error handler, auth guard
│   └── constants/       # Route constants
├── services/            # Business logic layer
├── repositories/        # Database access layer
├── validations/         # Shared Zod schemas
├── types/               # Database & API types
├── hooks/               # Client hooks
├── providers/           # Theme & toast providers
└── styles/              # Global CSS
```

## Auth Flow

1. User signs up/logs in via server actions → Supabase Auth
2. Middleware refreshes session cookies on every request
3. Protected routes (`/dashboard`, `/profile`) redirect unauthenticated users to `/login`
4. Auth routes redirect authenticated users to `/dashboard`
5. Profile auto-created on first login via service layer + DB trigger

## API Routes

| Method    | Route               | Description            |
| --------- | ------------------- | ---------------------- |
| GET       | `/api/auth/session` | Current session        |
| POST      | `/api/auth/logout`  | Logout                 |
| GET       | `/api/users/me`     | Current user + profile |
| GET/PATCH | `/api/profile`      | Profile CRUD           |
