# Project Standards

## Naming Conventions

- Files: `kebab-case` (e.g. `my-component.tsx`, `user-profile.ts`)
- Components: `PascalCase` (e.g. `MyComponent`, `UserProfile`)
- Variables/functions: `camelCase`
- Routes/folders: `kebab-case`

## Project Structure

- **Hybrid approach**: Atomic design (`atoms/`, `molecules/`, `organisms/`) for shared/reusable components, feature-based folders for page-specific code
- Pages go in `src/app/(pages)/` using route groups
- Shared utilities in `src/lib/`
- Shared UI primitives in `src/components/ui/` (installed via the registry CLI documented in `SKILLS.md`)

## Component Architecture

- **Server-first**: Default to Server Components. Only add `'use client'` when the component needs interactivity, hooks, or browser APIs
- Split components when they have distinct responsibilities or become too large
- Props interfaces go in a separate `interfaces.ts` file when shared, or co-located when component-specific

### Atomic Design Rules

- **`src/components/ui/`** — Reserved exclusively for registry-installed UI primitives. Components here are added **only** via the registry CLI(s) and install-time rules documented in `SKILLS.md` — never hand-written or manually edited. No custom/hand-written component ever belongs in `ui/`; custom work goes into `atoms/`, `molecules/`, `organisms/`, or a page's `_local/` folder. Refer to `SKILLS.md` for the current list of supported registries and the priority order between them
- **Atoms** (`src/components/atoms/`) — Zero internal dependencies (no imports from molecules/organisms)
- **Molecules** (`src/components/molecules/`) — May depend only on atoms
- **Organisms** (`src/components/organisms/`) — May depend on atoms and/or molecules
- Only **shared** components belong in `src/components/`. "Shared" means the component is **imported in more than one place** — not merely rendered on multiple pages. A component imported once in a layout (even if that layout renders across many pages) is layout-specific, not shared

### Page/Layout-Specific Code

- Each page or layout that needs its own components, server actions, or styles gets a **`_local/`** folder inside its route directory (e.g. `app/(pages)/users/_local/`)
- The `_local/` folder holds everything specific to that page/layout: components, server actions, CSS files, etc.
- The underscore prefix ensures Next.js excludes it from routing

### `_local/` File Organization

Organize `_local/` by concern, not by file type:

- **`interfaces.ts`** — Shared types and interfaces used across multiple files within this `_local/`
- **`mock-constants.ts`** (or `constants.ts`) — Static data, enums, lookup maps. Will become API calls later
- **`util.ts`** — Pure utility functions (formatters, helpers) specific to this page
- **`*-actions.ts`** — Server actions (`'use server'`)
- **Component files** — One component per file; default export; arrow function expression

When a section (e.g. a tab) has its own interactive sub-components, give it a **folder**:

```
_local/
├── interfaces.ts
├── mock-constants.ts
├── util.ts
├── payment-actions.ts
├── payments-tabs.tsx          ← thin shell, composes children
├── collections-tab/
│   ├── index.tsx              ← server component (table)
│   └── refund-button.tsx      ← 'use client' (only the interactive part)
├── payouts-tab/
│   ├── index.tsx
│   └── payout-button.tsx
└── revenue-summary-tab.tsx    ← flat file when no interactivity needed
```

When a section is simple (no interactive sub-parts), keep it as a **flat file** — no folder needed.

### Client Boundary Rules

- **Push `'use client'` to the deepest leaf possible** — never mark a parent client just because a child needs interactivity
- Extract only the interactive element (a button, a form input, a toggle) into its own tiny `'use client'` file
- Parent components stay server-rendered and **compose** client children
- A server component CAN import and render a client component from `src/components/ui/` (e.g. `Tabs`, `Sheet`) — the server component itself does not need `'use client'` for this
- Use library primitives (e.g. `SheetClose` with `render` prop) to avoid `useState` entirely when possible
- Use `PropsWithChildren` from React instead of custom `{ children: React.ReactNode }` interfaces

## Styling

- **Tailwind utilities + project theme tokens (CSS variables)** for theming — the tokens are defined in `globals.css` and shared by every primitive in `src/components/ui/`, regardless of which registry it came from
- Use the project's theme tokens (CSS variables) for colors, spacing, and design consistency — never hard-code colors or spacing that bypass the token system
- **`globals.css` stays clean** — only truly global styles belong there
- When a page or layout needs unique/heavy styling, create a **separate CSS file co-located inside that page's or layout's feature folder** — never dump page-specific styles into `globals.css`
- **Tailwind-first even in custom CSS files** — use `@apply` to compose Tailwind utilities into custom classes, and CSS variables for theming
- Raw/custom CSS is acceptable as a last resort when Tailwind genuinely can't express the styling, but always attempt a Tailwind-based solution first

## TypeScript

- **Strict mode** enabled
- Prefer `interface` for object shapes, `type` for unions/intersections
- Never use `any` — use `unknown` and narrow with type guards

## Data Fetching & State

- **Server Actions + RSC**: Fetch data in Server Components, mutate with Server Actions
- Minimal client-side state — avoid unnecessary `useState`/`useEffect`
- For global or shared client-side state, use **Zustand**
- Lift data fetching to the highest server boundary possible

## Error Handling

- **Layout-level boundaries by default**: Place `error.tsx`, `loading.tsx`, and `not-found.tsx` at layout boundaries
- Add per-page boundaries only when a specific page needs distinct error/loading UX
- Use Sonner toasts for transient user-facing feedback

## Performance

- **Aggressive optimization**: Use `next/image` for all images, `next/font` for fonts
- Dynamic imports (`next/dynamic`) for heavy/below-fold components
- Monitor and maintain strict bundle size awareness
- Lazy load non-critical content

## Testing

- **Vitest + React Testing Library** for unit and component tests
- **Playwright** for end-to-end tests
- Unit/component test files co-located next to source
- E2E tests in a separate top-level test directory

## Accessibility

- **WCAG 2.1 AA** compliance required
- Semantic HTML elements mandatory — no `<div>` soup
- ARIA labels on all interactive elements
- Full keyboard navigation support for all interactive components

## Git & Workflow

- **Conventional Commits**: Use prefixes — `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:`
- Commit subject: concise summary (imperative mood, ~50 chars)
- Commit body: detailed description of why and what changed
- Trunk-based development on `trunk` branch

## Dependencies

- **Pragmatic approach**: Add packages when they save significant effort
- Prefer well-maintained, popular libraries with active communities
- Justify new additions — don't add a package for something trivially implementable
