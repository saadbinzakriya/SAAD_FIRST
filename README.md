# MyyCV — Student Portfolio Builder

A multi-tenant portfolio builder: visitors redeem a one-time access code, build
their own portfolio at a personal URL (`yoursite.com/their-name`), and can
download it as an ATS-friendly, Europass, or Gulf-style CV — all from one
deployment.

## Features

- **Token-gated onboarding** — single-use access codes you generate and distribute
- **Multi-tenant** — every person gets their own slug (`/their-name`), private edit password, and independent content
- **5 color themes + 4 fonts**, mixable independently, with a system-preference-aware default
- **Animated, interactive UI** — custom cursor, magnetic buttons, tilt cards, scroll reveals
- **CV export** — ATS-friendly, Europass, and Gulf/GCC PDF formats generated client-side from the same portfolio data
- **Owner dashboard** (`/owner`) — generate/revoke access codes, see all created portfolios
- **Error boundary** — shows a helpful message instead of a blank page if something goes wrong

## Tech stack

React 18, Vite, React Router, Supabase (Postgres + public API), @react-pdf/renderer, Tailwind (via CDN, core utilities only)

## Project structure

```
src/
  App.jsx                 Route definitions
  main.jsx                Entry point (wraps app in ErrorBoundary)
  ErrorBoundary.jsx        Fallback UI for runtime errors
  lib/supabase.js         Supabase client (reads env vars)
  portfolio/lib.jsx        Shared design system: sections, animations, themes, fonts, editor tabs
  pages/
    TokenGatePage.jsx      "/" -- redeem a code, choose a URL + password
    PublicPortfolioPage.jsx "/:slug" -- the public-facing portfolio
    EditorPage.jsx          "/edit/:slug" -- password-gated content editor
    OwnerPage.jsx            "/owner" -- token + portfolio management
  cv/
    ATSCV.jsx, EuropassCV.jsx, GulfCV.jsx   PDF templates
    CVDownloadButtons.jsx    Generates + downloads the PDFs (lazy-loaded)
supabase-schema.sql        Run once in a new Supabase project
fix-token-policies.sql     Patch for databases created before the RLS fix
```

## Setup

### 1. Create a Supabase project (free)

1. supabase.com -> New Project
2. SQL Editor -> paste supabase-schema.sql -> Run
3. Settings -> API Keys -> copy your Project URL and Publishable (or anon) key

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-key
VITE_OWNER_PASSWORD=choose-your-own
```

### 3. Run locally

```
npm install
npm run dev
```

### 4. Deploy

Push to GitHub, then import the repo on Netlify or Vercel (both configs included -- public/_redirects and vercel.json):

- Build command: npm run build
- Output directory: dist
- Add the same three environment variables in your hosting platform's dashboard (not just .env -- that file is gitignored and never uploaded)

## Security notes (read before real use)

- The owner password and edit passwords are checked in the browser, not enforced by the database. This is fine for a lightweight tool but not bank-grade security -- see the comments in supabase-schema.sql.
- Never commit a real .env file. .gitignore already excludes it, but double-check before pushing.

## Known limitations

- The @react-pdf/renderer bundle is large (~1.2MB); it's lazy-loaded so it doesn't affect normal portfolio browsing, but the CV section takes a moment to load on first click.
- Real-time updates aren't implemented -- if the owner and a student both have a page open at the same time, changes won't sync live between them until a refresh.
