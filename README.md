# PinjamAset — Asset Lending Frontend

Frontend for **PinjamAset**, an internal company asset lending app — employees borrow laptops, cameras, projectors and other equipment, line managers approve the requests, and GA admins manage inventory, handover and returns.

This is a demo build: there is no backend or real authentication. Data comes from local fixtures (`src/lib/fixtures.ts`) and the active role lives in a cookie (`pa-role`) that the role switcher in the top bar writes.

Built to match the MSIGHT Figma design.

## Features

- **Role-based experience** — three roles with distinct navigation and landing pages:

  | Role | Landing page | Flow |
  | --- | --- | --- |
  | Employee | `/catalogue` | Browse equipment, request a loan, track my loans |
  | Line Manager | `/approvals` | Approve or reject pending requests, view team loans |
  | GA Admin | `/inventory` | Manage inventory, handover queue, returns, all requests |

  `/` redirects based on the current role (defaults to Employee).

- **Component library** following atomic design, exported from the barrel at `src/components/index.ts`:
  - *Atoms* — Button, Input, Checkbox, Switch, Tab, Icon, IconButton, Avatar, FilterChip, StatusBadge
  - *Molecules* — Alert, AssetCard, ConfirmDialog, EmptyState, KpiCard, NavItem, RoleSwitcher, TimelineStep, Toast
  - *Organisms* — DataTable, Sidebar, TopBar
  - *Templates* — AppShell, Page
- **Design tokens** in `src/app/tokens.css`, wired into Tailwind CSS v4
- **Tests** — components and pages covered with Vitest + Testing Library

## Tech Stack

- [Next.js](https://nextjs.org) 16 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 with custom design tokens
- [lucide-react](https://lucide.dev) icons
- Vitest + Testing Library + jsdom

## Getting Started

```bash
# installs crash without this flag in this repo
npm install --legacy-peer-deps

npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You land on the Employee catalogue by default — use the role switcher in the top bar to move between Employee, Line Manager and GA Admin.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint with ESLint |
| `npm run test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## Project Structure

```
src/
  app/            # Routes: dashboard, catalogue, inventory, approvals,
                  # loans, returns, handover, equipment/[id], login
  components/     # Component library (atoms → molecules → organisms → templates)
  lib/            # Role model + cookie helper, demo fixtures
  test/           # Vitest setup
```
