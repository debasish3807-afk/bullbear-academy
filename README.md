# BullBear Academy

India's premium trading education platform built with Next.js 15, React 19, TypeScript, Tailwind CSS, Firebase, and Framer Motion.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Auth/DB:** Firebase (Auth, Firestore, Storage)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Charts:** Chart.js + react-chartjs-2
- **State:** Zustand
- **Validation:** Zod

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in your Firebase credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI and layout components
│   ├── layout/       # Navbar, Footer, MarketTicker
│   └── ui/           # Button, Card, Badge, Progress, etc.
├── hooks/            # Custom React hooks
├── lib/              # Utilities, constants, Firebase config
│   ├── constants/    # Course data, market data
│   └── firebase/     # Firebase initialization
└── styles/           # Global CSS
```

## Features

- 30+ production pages
- AI-powered learning recommendations
- Live market ticker with Indian stock data
- Professional trading calculators
- Gamification (XP, streaks, badges, leaderboards)
- Full admin dashboard
- Student and teacher dashboards
- Firebase Authentication (Google, Email, Phone)
- Responsive design (mobile-first)
- Accessibility (WCAG 2.1 AA)
- SEO optimized with metadata API

## Deployment

```bash
npm run build
# Deploy to Firebase Hosting, Vercel, or any Node.js host
```

## License

Proprietary. All rights reserved.
