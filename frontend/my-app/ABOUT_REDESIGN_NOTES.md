About Page Redesign Notes (Styling & Structure Only)

Scope
- Hero, Stats strip, Mission & Vision, Values grid, Timeline, Leadership, Partners belt, CTA
- No logic, props, routes, or API changes

Design System
- Using global tokens (Option B Clean/Light) from tailwind.config.js
- Container: max-w-screen-xl mx-auto with responsive padding
- Rhythm: sections use py-12 md:py-20; grids with gap-6/8
- Typography: h1 text-4xl md:text-6xl (hero), section titles text-3xl; body leading-relaxed

Components
- Stats Strip: 4 KPI cards with icon+value+label, hover lift
- Mission & Vision: emphasized cards with subtle lift
- Values Grid: 4 cards, consistent paddings and shadows
- Timeline: stepped layout with alternating sides and accent dot
- Leadership: as existing component with enhanced tabs/cards (handled elsewhere)
- Partners: logo placeholders in monochrome belt, equal sized blocks
- CTA: navy section with primary/secondary actions

Accessibility
- Contrast checked against navy/white palette
- Focus-visible rings on interactive elements

Files Touched
- src/pages/About.jsx (UI-only changes, structure + styling)

Notes
- All content preserved; only visuals/layout reorganized.

