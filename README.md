# Pro Dashboard

A responsive project-management dashboard built with React and Vite, with a
polished light and dark theme.

## Features

- Light and dark theme: follows the OS setting by default, remembers your choice, no flash on load
- Sign-in with protected routes and return-to-page after login
- Dashboard with live figures calculated from your projects
- Projects: create, edit, delete, search, filter by status and sort
- Project details with deadline countdown and team list
- Analytics: revenue chart (3 / 6 / 12 months), status breakdown, top projects, performance summary
- Profile and Settings that actually save (currency, compact mode, notifications, password demo)
- Toast notifications, confirm dialogs, accessible modals and keyboard focus styles
- Responsive from phone to desktop; respects reduced-motion
- Data persists in `localStorage` (projects, settings, theme, profile)

## Getting started

```bash
npm install
npm run dev
```

Demo account: `admin@example.com` / `123456`

```bash
npm run build     # production build in dist/
npm run preview   # preview the build locally
```

## Structure

```text
src/
├── components/
│   ├── common/      Button, Card, Modal, Icon, charts, forms…
│   └── layout/      Sidebar, Navbar
├── context/         Theme, Auth, Settings, Projects, Toast
├── data/            Sample projects and activity
├── hooks/           useClickOutside, useDocumentTitle
├── layouts/         AuthLayout, DashboardLayout
├── pages/           auth, dashboard, projects, analytics, profile, settings
├── routes/          AppRoutes, ProtectedRoute
├── styles/          tokens (light/dark), base, components, layout, pages
└── utils/           format, status, storage
```

All colours come from CSS variables in `src/styles/tokens.css`. To re-brand the
app, change `--primary` (light) and the matching value under
`html[data-theme="dark"]`.

## Next steps

Authentication and data are simulated on the client. To go to production,
replace `login`, `changePassword` and the project actions in
`src/context/` with real API calls.

## Deployment

The repo includes `vercel.json` so client-side routes work on Vercel.
