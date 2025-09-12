Leadership Section Redesign Notes (Styling Only)

Goals
- Premium card visuals, consistent grid, responsive across breakpoints
- AA contrast, focus-visible, keyboard navigable tabs

Changes
- Grid: gap-8 with sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Card: rounded-2xl, ring-1, shadow-sm → hover:shadow-lg, hover:-translate-y-0.5
- Image: aspect-[4/5], rounded top, object-cover, lazy+async
- Body: name (text-lg), role (text-sm), subtle chip for "View profile"
- Tabs: subtle shadow, hover bg on inactive, preserved keyboard arrows

Accessibility
- Alt text uses "<Name> – <Role>"
- Focus-visible rings for card/tab interactions

No logic, props, routes, or API changes.

