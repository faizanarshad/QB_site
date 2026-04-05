# QBrix Solutions — Website

Marketing site for **QBrix Solutions**: AI, machine learning, computer vision, e-commerce, and robotics & automation offerings. Built with the Next.js App Router, Tailwind CSS, and Framer Motion.

## Stack

| Area | Technology |
|------|------------|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| UI | React 18, TypeScript, [Tailwind CSS](https://tailwindcss.com/) |
| Motion | [Framer Motion](https://www.framer.com/motion/) |
| Auth & data | [NextAuth.js](https://next-auth.js.org/), [Prisma](https://www.prisma.io/) |
| Analytics | [Vercel Speed Insights](https://vercel.com/docs/speed-insights) (production) |
| Icons | [react-icons](https://react-icons.github.io/react-icons/) |

## Prerequisites

- **Node.js** 18 or newer
- **npm** (or compatible package manager)
- **PostgreSQL** (or compatible DB) when using Prisma features — see environment variables below

## Environment variables

Production and local builds that run `prisma db push` need a database URL. Prisma is configured to read:

- `qbrix_DATABASE_URL` — connection string for the app database (see `prisma/schema.prisma`)

Optional values for auth and third-party integrations are documented under `docs/` (for example `docs/AUTH_SETUP.md`, `docs/DATABASE_SETUP.md`).

## Getting started

```bash
git clone <repository-url>
cd QB_site
npm install
npm run dev
```

The dev server defaults to **http://localhost:3001**. Use `npm run dev:3000` for port 3000.

> **Note:** `npm run build` runs Prisma generate, `prisma db push`, and `next build`. Ensure `qbrix_DATABASE_URL` is set (or adjust the build script for your CI) so the build can reach the database.

## NPM scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Development server (port 3001) |
| `npm run dev:3000` | Development server on port 3000 |
| `npm run build` | Prisma generate + db push + production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run vercel-build` | Same as build (Vercel) |
| `npm run db:generate` | `prisma generate` |
| `npm run db:push` / `db:migrate` / `db:studio` / `db:seed` | Database workflows |

## Repository layout (high level)

```
src/app/          # Routes: home, services, ai-solutions, portfolio, team, blog, contact, career, …
src/components/ # Shared UI: Header, Footer, Hero, AnimatedHero, …
public/images/    # Static assets (brand, hero, AI solutions flashcards, favicons)
prisma/           # Schema and migrations
docs/             # Detailed guides (auth, DB, Vercel, images, careers, …)
```

## Documentation

Extended setup, deployment, and feature guides live in **`docs/README.md`** and the other files under **`docs/`**, including:

- Authentication
- Database setup
- Vercel deployment
- Images and performance notes
- Career applications

## License

See the repository license file if present; otherwise treat usage as defined by the project owners.
