# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Animation-rich portfolio website with 3D effects, scroll animations, and micro-interactions. Dark/futuristic visual style with bold accent colors.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + CSS Modules for complex animations
- **3D/WebGL**: Three.js via React Three Fiber + Drei
- **Animations**: Framer Motion (transitions) + GSAP (scroll animations)
- **Smooth Scroll**: Lenis (@studio-freight/lenis)
- **Icons**: Lucide React

## Commands

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm run start

# Lint
npm run lint
```

## Project Initialization

If the project hasn't been initialized yet:
```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir=false
npm install framer-motion @react-three/fiber @react-three/drei three gsap @studio-freight/lenis lucide-react clsx tailwind-merge
npm install -D @types/three
```

## Architecture

- `app/` - Next.js App Router pages and layouts
- `components/layout/` - Navbar, Footer, custom Cursor
- `components/sections/` - Hero, Projects, Skills, Experience, Contact sections
- `components/three/` - React Three Fiber 3D components (Scene, ParticleField, FloatingShapes, GradientMesh)
- `components/ui/` - Reusable UI components with animations (MagneticButton, TextReveal, GlitchText, Card3D, SplitText)
- `lib/` - GSAP animation presets, utilities, Lenis smooth scroll provider
- `data/` - Project data and content

## Design Tokens

```css
--bg-primary: #0a0a0f;
--bg-secondary: #12121a;
--accent-primary: #6366f1;    /* Indigo */
--accent-secondary: #8b5cf6;  /* Purple */
--accent-tertiary: #06b6d4;   /* Cyan */
--text-primary: #fafafa;
--text-secondary: #a1a1aa;
```

## Performance Targets

- 60fps animations
- Lighthouse score: 90+
- Lazy load 3D components with React Suspense

## Development Workflow

- Use context7 MCP server to check up-to-date documentation when implementing new libraries/frameworks or adding features with them

## Review the Work

- **Invoke the ui-ux-reviewer subagent** to review your work and implement suggestions where needed.
- Iterate on the review process when needed.