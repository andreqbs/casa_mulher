# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server on port 3000 (0.0.0.0)
npm run build     # Production build via Vite
npm run preview   # Preview production build
npm run lint      # Type-check only (tsc --noEmit)
npm run clean     # Remove dist/
```

No test runner is configured. Lint is TypeScript type-checking only.

## Environment

Copy `.env.example` to `.env.local` and set:
- `GEMINI_API_KEY` — Google Gemini API key (required for AI features)

## Architecture

**Stack**: React 19 + TypeScript + Vite + Tailwind CSS 3 + Motion (animations)

This is a **mobile-first single-page app** (max-w-md layout) for the "Casa da Mulher Brasileira" — a support resource for women experiencing domestic violence. It combines a violence-cycle quiz, educational content, emergency contacts, and wellness tools.

### State Management

All state lives in `src/App.tsx` and is passed down via props — no Context or external stores:

```ts
activeTab: string        // bottom nav tab
currentView: ViewState   // which full-screen view is shown
quizScore: number        // passed from QuizView → ResultView
```

Navigation is purely state-driven (`setCurrentView`), not URL-based.

### Views & Navigation Flow

| ViewState | Component | Purpose |
|---|---|---|
| `home` | `HomeView` | Landing: quiz CTA, featured cards, story link |
| `para-voce` | `CareToolsView` | Wellness: exercises, meditation, journaling |
| `sos` | `EmergencyView` | Emergency contacts (180, 190, 188) |
| `quiz` | `QuizView` | 5-question violence cycle assessment |
| `result` | `ResultView` | SVG gauge + risk zone result |
| `education` | `EducationView` | 3-stage violence cycle explanation |
| `learn-more` | `LearnMore` | 4-stage relationship progression guide |

`Layout.tsx` wraps all views and provides the bottom navigation bar with a floating SOS button.

### Styling Conventions

- `cn()` helper from `src/lib/utils.ts` (clsx + tailwind-merge) for conditional classes
- Custom brand colors defined in `tailwind.config.js`: `brand-purple`, `brand-purple-light`, `brand-pink`, `brand-green`, `brand-yellow`
- Custom fonts: `font-sans` = Inter, `font-display` = Space Grotesk
- Card radius pattern: `rounded-3xl` for large cards, `rounded-2xl` for smaller elements
- Motion library (not Framer Motion) for animations: `initial/animate/whileTap/whileInView`

### Path Alias

`@/` resolves to the project root (configured in both `vite.config.ts` and `tsconfig.json`).

### Safety Feature

`EducationView` and `LearnMore` include a "fast exit" button that redirects to `https://www.google.com` — this is intentional for user safety and must be preserved.
