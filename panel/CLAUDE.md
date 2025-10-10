# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application with React 19, TypeScript, and Tailwind CSS v4. The project is a multi-step form application with a premium credit card theme, implementing a hero landing page, case number verification, and seed phrase display flow.

## Development Commands

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture

### Application Flow
The app uses a state-based routing system in [app/page.tsx](app/page.tsx) with three main views:
1. **Hero Section** (`hero` view) - Landing page with rotating credit card animation
2. **Case Number Form** (`case-form` view) - Validation form requiring case number `CASE-2024-001`
3. **Seed Phrase Page** (`seed-phrase` view) - Displays 12-word seed phrase with copy functionality

State transitions are managed through callbacks: `onGetStarted`, `onSuccess`, and `onBack`.

### Key Components

**Page Components** (located in project root):
- [hero-section.tsx](hero-section.tsx) - Landing page with statistics and CTA
- [case-number-form.tsx](case-number-form.tsx) - Case number validation (hardcoded to `CASE-2024-001`)
- [seed-phrase-page.tsx](seed-phrase-page.tsx) - Seed phrase display with reveal/hide and copy functionality
- [rotating-card.tsx](rotating-card.tsx) - 3D rotating card component with styled-jsx animations

**UI Components** ([components/ui/](components/ui/)):
- Shadcn/ui components (button, input) following the "new-york" style variant
- All components use the `cn()` utility from [lib/utils.ts](lib/utils.ts) for className merging

### Styling System

- **Tailwind CSS v4** with PostCSS integration
- **Design tokens**: CSS variables defined in [app/globals.css](app/globals.css) using oklch color space
- **Typography**: Space Mono font (400, 700 weights) for monospace aesthetic
- **Dark mode**: Supports `.dark` class variant via custom Tailwind variant
- **Theme colors**: Neutral base color with CSS variables for theming

### Path Aliases

Configured in [tsconfig.json](tsconfig.json):
```typescript
"@/*" maps to "./*"
```

This allows imports like `@/components/ui/button` from anywhere in the project.

### Component Configuration

The project uses [components.json](components.json) for Shadcn/ui configuration:
- Style: `new-york`
- RSC: Enabled (React Server Components)
- Icon library: `lucide-react`
- Base color: `neutral`

### Static Assets

External images are loaded from i.ibb.co for the rotating credit card:
- Front: `https://i.ibb.co/LdWYSCJM/Cardf.png`
- Back: `https://i.ibb.co/JFxTfQyv/Cardb.png`

## Important Implementation Details

### State Management
All pages use `"use client"` directive - this is a client-side rendered application with no server components currently in use.

### Hardcoded Values
- Case number validation expects exactly: `CASE-2024-001`
- Seed phrase is hardcoded as 12-word array in [seed-phrase-page.tsx](seed-phrase-page.tsx:19-32)

### Animation Details
The rotating card uses styled-jsx with a 15-second CSS animation (`elegantRotate`) that rotates the card on Y, X, and Z axes with scale effects.

## Technology Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **React**: 19.1.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.1.9 with PostCSS
- **UI Components**: Radix UI primitives via Shadcn/ui
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation (available but not currently used)
- **Fonts**: Geist (Sans & Mono), Space Mono
