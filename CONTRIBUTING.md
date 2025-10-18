# Contributing to QuickStay (Hotel-Booking)

Thanks for your interest in contributing! This guide walks you through the setup, coding standards, and pull request process. New contributors are welcome — issues labeled with good first issue or gssoc 25 are great starting points.

## Quick Start

1. Fork the repo on GitHub.
2. Clone your fork:
   - HTTPS: `git clone https://github.com/<your-username>/Hotel-Booking.git`
3. Add the upstream remote:
   - `git remote add upstream https://github.com/manishkumar8312/Hotel-Booking.git`
4. Create a feature branch:
   - `git checkout -b docs/add-env-examples` (use a descriptive name)

## Local Setup

- Requirements:
  - Node.js 18+ (20+ recommended)
  - npm 9+
  - MongoDB (local or Atlas)

- Install and run:
  - Backend
    - `cd server`
    - `npm install`
    - Copy env: `cp .env.example .env` and fill values
    - `npm run server` (defaults to http://localhost:3000)
  - Frontend
    - `cd client`
    - `npm install`
    - Copy env: `cp .env.example .env` and fill values
    - `npm run dev` (defaults to http://localhost:5173)

## Environment Variables

- Templates are provided in `server/.env.example` and `client/.env.example`.
- Never commit real secrets. `.env` is already gitignored.

## Coding Standards

- Lint: `npm run lint` (from client/)
- Prefer Conventional Commits for messages, e.g.
  - `feat: add hotel rating component`
  - `fix: resolve navbar overlap on mobile`
  - `docs: align env examples with README`
- Keep PRs focused and small when possible.

## Commit & PR Process

1. Ensure your branch is up to date:
   - `git fetch upstream` ; `git rebase upstream/main`
2. Commit changes with clear messages.
3. Push to your fork:
   - `git push -u origin <branch-name>`
4. Open a Pull Request targeting `main` of the upstream repo.
5. In the PR description, include:
   - What/why of the change
   - Screenshots for UI changes (before/after)
   - Linked issue: `Closes #<issue-number>`

## Issue Types You Can Pick

- docs: Improving README, adding CONTRIBUTING, CODE_OF_CONDUCT, LICENSE
- bug: UI/UX polish (e.g., mobile overlaps), 404 handling, minor runtime fixes
- feat: Small features (e.g., simple client-side validation)
- perf: Minor optimizations (e.g., memoization)

## Communication

- Be respectful and follow our Code of Conduct.
- If unsure, open an issue or draft PR to discuss.

Happy contributing! 💙