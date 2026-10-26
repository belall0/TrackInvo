# TrackInvo

## Overview

TrackInvo is an invoice tracking system that allows users to create, view, and manage their customers and invoices.

## Getting Started

### Local development

Use Node.js 22.19+ (22.x) or 24+, and pnpm 12.11.2. Keep `pnpm-lock.yaml` committed.

1. Run `pnpm install --frozen-lockfile`.
2. Copy `.env.example` to `.env.local` and fill in `DATABASE_URL` and `AUTH_SECRET`.
   Generate a secret locally with `node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"`.
   Set `AUTH_URL` to your local origin (normally `http://localhost:3000`).
3. Create a dedicated development PostgreSQL database. To apply the existing migrations to it, run
   `pnpm exec prisma migrate deploy` after checking that `DATABASE_URL` points to that development database.
4. Run `pnpm dev`. The Prisma client is generated automatically before development and production builds.

Next.js and the Prisma CLI both read `.env.local` through Next.js's environment loader.
All application secrets stay server-side; no `NEXT_PUBLIC_` variables are required.
Only enable `AUTH_TRUST_HOST` behind a reverse proxy you control that overwrites forwarded host headers.

Checks: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm audit`, and `pnpm build`.
Run the production build with `pnpm start`.
The tests use Node's experimental module mocking to isolate database calls; they do not contact PostgreSQL.

Optional demo data: `pnpm exec prisma db seed` **deletes all existing application data in the configured database**
before inserting demo accounts with public demo passwords. Use it only with a disposable development database.
The modernization work does not require a new database migration and did not run migrations or seeds.

### Neon setup

This checkout is linked to the `Track Invo` Neon project (`small-voice-02175244`), branch `production`.
Run `neon deploy` to apply `neon.ts` and refresh the Postgres variables in `.env.local`.
The local `.neon` link and environment files are ignored by Git.

The existing Prisma PostgreSQL adapter uses the pooled `DATABASE_URL` for application queries.
Prisma migrations use `DATABASE_URL_UNPOOLED` when supplied, falling back to `DATABASE_URL`
for local PostgreSQL. Apply the existing migrations with `pnpm exec prisma migrate deploy`.
Keep `AUTH_SECRET` and `AUTH_URL` in the same environment file as described above.
`neon deploy` configures the database services; deploy the Next.js app to your application host separately.

See [MODERNIZATION.md](./MODERNIZATION.md) for dependency compatibility decisions, validation results, and remaining checks.

### Live demo

A live version of TrackInvo can be found [https://invo.belalmuhammad.me/](https://invo.belalmuhammad.me/).

You can test the application using the following credentials:

Email: `ahmed@example.com`
Password: `password123`

alternatively, feel free to create your own account.

## Technologies Used

- Next.js
- Auth.js
- TypeScript
- Tailwind CSS
- Shadcn/ui
- PostgreSQL
- Prisma

## Features

- Authentication: users can sign up and log in to the application.
- Customers Management: users can create, view, update, and delete customers.
- Invoices Management: users can create, view, update, and delete invoices.
