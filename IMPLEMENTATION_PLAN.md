# Portfolio Website - Implementation Plan

## Context
Building a next-level, animation-rich portfolio website to showcase projects. The goal is to create a visually stunning, unique experience that combines 3D effects, scroll animations, and micro-interactions with a visual style that blends dark/futuristic elements with clean design and bold colors.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + CSS Modules for complex animations
- **3D/WebGL**: Three.js via React Three Fiber + Drei helpers
- **Animations**: Framer Motion (transitions) + GSAP (scroll animations)
- **Smooth Scroll**: Lenis
- **Icons**: Lucide React
- **Fonts**: Custom variable fonts (Inter + Space Grotesk)

## Architecture

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with smooth scroll provider
│   ├── page.tsx            # Home page with all sections
│   ├── globals.css         # Global styles, custom properties
│   └── projects/
│       └── [slug]/page.tsx # Individual project pages
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Animated navbar with magnetic links
│   │   ├── Footer.tsx      # Animated footer
│   │   └── Cursor.tsx      # Custom cursor with hover effects
│   ├── sections/
│   │   ├── Hero.tsx        # 3D hero with particles/shapes
│   │   ├── Projects.tsx    # Project showcase grid
│   │   ├── Skills.tsx      # Animated skills visualization
│   │   ├── Experience.tsx  # Timeline with scroll animations
│   │   └── Contact.tsx     # Interactive contact form
│   ├── three/
│   │   ├── Scene.tsx       # Main 3D scene wrapper
│   │   ├── ParticleField.tsx
│   │   ├── FloatingShapes.tsx
│   │   └── GradientMesh.tsx
│   └── ui/
│       ├── MagneticButton.tsx
│       ├── TextReveal.tsx
│       ├── GlitchText.tsx
│       ├── Card3D.tsx
│       └── SplitText.tsx
├── lib/
│   ├── animations.ts       # GSAP animation presets
│   ├── utils.ts            # Helper functions
│   └── smooth-scroll.tsx   # Lenis provider
├── data/
│   └── projects.ts         # Project data
└── public/
    └── assets/             # Images, models, fonts
```

## Key Features by Section

### 1. Hero Section
- **3D Background**: Animated particle field or floating geometric shapes using R3F
- **Text Animations**: Split text reveal with staggered character animation
- **Gradient Mesh**: Animated gradient blob that responds to mouse movement
- **Scroll Indicator**: Animated arrow that bounces

### 2. Projects Section
- **3D Card Hover**: Cards tilt based on mouse position (perspective transform)
- **Image Reveal**: Mask/clip-path animations on hover
- **Magnetic Effect**: Cards slightly pull toward cursor
- **Staggered Grid**: Projects animate in sequence on scroll
- **Project Modal/Page**: Smooth transition to detailed project view

### 3. Skills Section
- **Floating Tech Icons**: 3D floating logos that orbit or float
- **Skill Bars**: Animated progress bars with number counting
- **Category Tabs**: Smooth tab transitions with content morphing
- **Hover States**: Icons scale and glow on hover

### 4. Experience Section
- **Vertical Timeline**: Line draws as user scrolls
- **Card Reveals**: Experience cards slide in from alternating sides
- **Date Markers**: Pulsing dots that activate on scroll
- **Parallax Backgrounds**: Subtle depth effect

### 5. Contact Section
- **Animated Form**: Input fields with floating labels and focus effects
- **Glitch Effect**: Glitchy text animation on section title
- **Social Links**: Magnetic hover effect with scale
- **Success Animation**: Confetti or particle burst on submit

### 6. Global Elements
- **Custom Cursor**: Circle cursor that scales/morphs on interactive elements
- **Page Transitions**: Smooth slide/fade transitions between pages
- **Navbar**: Blur backdrop, hide/show on scroll, magnetic links
- **Loading Screen**: Creative preloader with progress animation
- **Noise Texture**: Subtle grain overlay for depth

## Visual Design Tokens

```css
/* Color Palette - Dark Futuristic with Bold Accents */
--bg-primary: #0a0a0f;
--bg-secondary: #12121a;
--accent-primary: #6366f1;    /* Indigo */
--accent-secondary: #8b5cf6;  /* Purple */
--accent-tertiary: #06b6d4;   /* Cyan */
--text-primary: #fafafa;
--text-secondary: #a1a1aa;
--gradient: linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4);
```

## Implementation Phases

### Phase 1: Foundation
1. Initialize Next.js 14 project with TypeScript
2. Set up Tailwind CSS with custom theme
3. Create base layout with smooth scroll (Lenis)
4. Implement custom cursor component
5. Set up Framer Motion page transitions

### Phase 2: 3D Setup
1. Configure React Three Fiber
2. Create particle field/floating shapes background
3. Add mouse-reactive gradient mesh
4. Optimize for performance (lazy loading, suspense)

### Phase 3: Hero Section
1. Build hero layout with 3D scene
2. Implement split text reveal animation
3. Add scroll indicator
4. Create responsive adjustments

### Phase 4: Projects Section
1. Create project data structure
2. Build 3D tilt card component
3. Implement staggered scroll reveal
4. Add hover effects and magnetic pull

### Phase 5: Skills Section
1. Build floating 3D icons scene
2. Create animated skill bars
3. Implement category filtering
4. Add hover interactions

### Phase 6: Experience Section
1. Create timeline component
2. Implement scroll-triggered line drawing
3. Add card reveal animations
4. Style date markers

### Phase 7: Contact Section
1. Build animated form inputs
2. Add glitch text effect
3. Implement magnetic social links
4. Create form validation and submission

### Phase 8: Polish
1. Add loading screen
2. Implement navbar animations
3. Add noise texture overlay
4. Performance optimization
5. Mobile responsiveness
6. SEO meta tags

## Verification
1. Run `npm run dev` and test all sections
2. Verify animations work smoothly at 60fps
3. Test on mobile devices (responsive)
4. Lighthouse performance audit (target: 90+)
5. Test all interactive elements (cursor, buttons, forms)
6. Verify smooth scrolling and page transitions

## Dependencies to Install
```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir=false
npm install framer-motion @react-three/fiber @react-three/drei three gsap @studio-freight/lenis lucide-react clsx tailwind-merge
npm install -D @types/three
```
