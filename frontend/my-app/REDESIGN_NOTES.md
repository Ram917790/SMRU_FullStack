# UI Redesign Notes (Styling-Only)

Chosen Palette: Option B (Clean/Light)
- primary: #0F766E, primary-foreground: #FFFFFF
- secondary: #3B82F6, accent: #F97316, warning: #F59E0B, success: #10B981
- bg: #F8FAFC, card: #FFFFFF, card-foreground: #0F172A, border: #E5E7EB

Typography
- Headings: Poppins (tailwind: font-heading). Fluid scales used per page (e.g., text-3xl md:text-5xl for hero, text-2xl md:text-3xl for section titles)
- Body: Poppins (tailwind: font-body), leading-relaxed, normal tracking

Spacing & Layout
- Container centered with responsive padding (1rem→3rem via tailwind container extension)
- Vertical rhythm: sections use py-16 to py-20 consistently
- Grids: grid cols responsive (1/2/3/4), consistent gap-6/8

Radii & Shadows
- Radii scale: sm .375rem, md .75rem, lg 1rem, xl 1.5rem, 2xl 2rem
- Shadows scale: xs/sm/md/lg/xl for cards, hover lift with subtle shadows

Transitions & Motion
- Durations: 150/300/500ms; subtle opacity/translate/scale only, respects prefers-reduced-motion

Accessibility
- WCAG AA contrast via chosen palette
- Focus-visible rings added to interactive elements
- Keyboard navigability on tabs and links preserved

Files Touched (UI-only comments added at top as applicable)
- src/pages/About.jsx: spacing, values/timeline cards, leadership tabs/cards
- src/pages/Schools.jsx: sidebar, cards, headers standardized
- src/pages/School.jsx: header/cards tokens and focus
- src/pages/Leadership.jsx: tabs shadow/hover, cards hover
- src/pages/LeaderProfile.jsx: focus-visible, containers
- src/pages/Careers.jsx: tab buttons focus, job cards focus-within
- src/pages/Contact.jsx: buttons focus-visible, minor spacing
- src/pages/Home.jsx: header comment for UI-only scope
- src/styles/globals.css: utilities and helpers
- tailwind.config.js: design tokens (colors, shadows, radii, transitions, container)

Notes
- No changes to logic, props, routes, or API calls
- All edits use Tailwind utility classes or tokenized values


