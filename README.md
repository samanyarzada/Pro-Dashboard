# Pro Dashboard

A modern, responsive, and professional dashboard built with React and Vite.

Pro Dashboard is a frontend dashboard application designed with a clean UI, reusable components, responsive layouts, authentication flow, project management, analytics, profile management, settings, and light/dark theme support.

## Live Demo

The project is deployed with Vercel:

https://pro-dashboard.vercel.app

> Replace the URL above with your actual Vercel deployment URL after deployment.

---

## Features

- Modern and responsive dashboard UI
- Light and dark mode
- Authentication / Login page
- Protected routes
- Dashboard overview
- Project management
- Project details pages
- Project search and filtering
- Project progress tracking
- Analytics page
- Profile management
- Settings page
- Reusable UI components
- Responsive layout for desktop, tablet, and mobile
- Error Boundary for application errors
- Local storage for theme persistence
- Clean and scalable project structure

---

## Pages

### Authentication

- Login

### Dashboard

- Dashboard overview
- Statistics
- Project progress
- Recent projects
- Recent activity

### Projects

- Projects list
- Search projects
- Filter projects by status
- Project details
- Project progress

### Analytics

- Analytics overview
- Project statistics
- Performance information

### Profile

- User profile
- Personal information
- Profile settings

### Settings

- General settings
- Preferences
- Security settings
- Theme settings

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript (ES6+)
- React Router DOM
- CSS3

### Development

- ESLint
- Vite Development Server
- npm

### Deployment

- Vercel
- GitHub

---

## Project Structure

```text
Pro-Dashboard/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── Modal.jsx
│   │   │
│   │   └── layout/
│   │       ├── Navbar.jsx
│   │       └── Sidebar.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── data/
│   │   └── projects.js
│   │
│   ├── layouts/
│   │   ├── AuthLayout.jsx
│   │   └── DashboardLayout.jsx
│   │
│   ├── pages/
│   │   ├── analytics/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── projects/
│   │   ├── settings/
│   │   └── NotFound.jsx
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── App.jsx
│   ├── ErrorBoundary.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```
