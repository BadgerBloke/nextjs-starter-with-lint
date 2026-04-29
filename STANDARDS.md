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

## Lint & Format Tooling

- **Biome** is the source of truth for JS, TS, JSX, TSX, JSON, JSONC, and CSS — linting, formatting, and import organization. Configured in `biome.json`
- **Prettier** is scoped to **YAML only** (`*.yaml` / `*.yml` at any depth). It exists because Biome 2.4 doesn't format YAML yet
- **Don't widen Prettier's scope.** Three layers keep it YAML-only:
    1. `.prettierignore` ignore-all + YAML allowlist
    2. Script globs always pass `**/*.{yaml,yml}` — never `prettier --write .`
    3. lint-staged matches only `*.{yaml,yml}` for Prettier
- If a tool overlap appears (both touching the same file), resolve in favor of Biome and remove from Prettier scope
- When Biome ships YAML support, drop Prettier entirely

## TypeScript

- **Strict mode** enabled
- Prefer `interface` for object shapes, `type` for unions/intersections
- Never use `any` — use `unknown` and narrow with type guards

## Data Fetching & State

- **Server Actions + RSC**: Fetch data in Server Components, mutate with Server Actions
- Minimal client-side state — avoid unnecessary `useState`/`useEffect`
- For global or shared client-side state, use **Zustand**
- Lift data fetching to the highest server boundary possible

## Internationalization (i18n)

Built on **next-intl** with a **base + overlay** model. Source lives in `locales/` as **YAML** (committed); runtime is **JSON + generated `index.ts`** emitted into `messages/` by `scripts/gen-messages.ts` (gitignored, never hand-edited).

### Locale model

- **URL locales** = regional variants only (e.g. `en-US`, `en-GB`, `es-ES`, `es-MX`, `hi-IN`). Listed in `src/i18n/routing.ts`
- **Base locales** = per-language full dictionaries (e.g. `en`, `es`, `hi`). Live in `locales/` but **never** appear in a URL
- Each URL locale maps to exactly one base locale via `baseOf` in `src/i18n/bases.ts`
- Default locale = `en-US`. `localePrefix: 'as-needed'` — default locale serves on clean paths (`/`, `/users`); non-default keeps the prefix (`/es-MX`, `/es-MX/users`). `/en-US/...` 307s back to `/...` to canonicalize. `hreflang` alt-links are auto-emitted for SEO
- Switch to `localePrefix: 'always'` for hard-split URLs per locale, or `'never'` to drop the `[locale]` segment entirely and detect from cookie/header only (see next-intl docs — trades SEO for clean URLs)
- **Always create a base even when only one region uses it today** — future regions drop in as overlays without refactor

### File structure

```
locales/                 ← COMMITTED source (YAML)
  en/                    ← base (full dict)
    home.yaml
    loading.yaml
    not-found.yaml
  en-GB/                 ← overlay (partial deltas only)
    home.yaml            ← only keys that differ from base
  en-US/                 ← overlay (may be empty — keep `.gitkeep`)
    .gitkeep
  es/ es-ES/ es-MX/
  hi/ hi-IN/
messages/                ← GENERATED + GITIGNORED (JSON + index.ts per locale)
  en/ en-GB/ en-US/ es/ es-ES/ es-MX/ hi/ hi-IN/
src/i18n/
  routing.ts             ← `locales` (regional) + `defaultLocale`
  bases.ts               ← `baseOf`, `loadBase`, `loadOverlay` (explicit static imports + type annotations that gate drift)
  request.ts             ← loads base + overlay, deep-merges per request
  navigation.ts          ← locale-aware `Link`, `redirect`, `usePathname`, `useRouter`
src/global.d.ts          ← `MessageShape`, `MessageOverride`, `AppConfig.Messages`/`Locale` augment
src/proxy.ts             ← `createMiddleware(routing)` (Next 16 renamed from `middleware.ts`)
scripts/gen-messages.ts  ← compiles `locales/` → `messages/`; emits JSON + `index.ts` per dir
```

### Authoring rules

- **Edit YAML in `locales/` only.** Never hand-edit anything under `messages/` — the whole dir is regenerated by the compiler
- One YAML file per namespace. Kebab-case filename → camelCase namespace key in generated `index.ts` (e.g. `not-found.yaml` → `notFound`)
- Nest freely inside a file (e.g. `home.dashboard.widgets.title`) — next-intl resolves dotted paths
- Empty overlay dirs keep a `.gitkeep` so git tracks the locale

### Typesafety contract

- `Messages` type in `src/global.d.ts` is `typeof en` — the `en` base is the canonical shape source
- `useTranslations('ns')` and `t('key')` autocomplete + compile-error on typos
- **Drift gate:** `loadBase` is typed `Record<BaseLocale, () => Promise<{ default: MessageShape }>>` — any non-`en` base missing a key (or with a different shape) fails tsc at the `loadBase` assignment in `bases.ts`. Same for overlays via `MessageOverride`
- Never pass dynamic strings to `useTranslations` / `t` — always string literals so TS can gate them

### Using translations

```tsx
// Server component
import { getTranslations } from 'next-intl/server';
const t = await getTranslations('home');
<h1>{t('title')}</h1>;

// Client component
('use client');
import { useTranslations } from 'next-intl';
const t = useTranslations('home');
```

For locale-aware navigation always import from `~/i18n/navigation` (auto-prepends locale):

```tsx
import { Link } from '~/i18n/navigation';
<Link href="/users">...</Link>;
```

### Adding a new locale

**New region on an existing base** (e.g. `en-AU`):

1. `mkdir locales/en-AU` — drop any delta YAMLs (e.g. `locales/en-AU/home.yaml`); if no deltas yet, `touch locales/en-AU/.gitkeep`
2. `routing.ts` → push `'en-AU'` to `locales`
3. `bases.ts` → add `'en-AU': 'en'` to `baseOf` and a `loadOverlay['en-AU']` entry

**New language** (e.g. `fr`):

1. `mkdir locales/fr` — author full YAML dict (one file per namespace, covering every key `en` has)
2. `mkdir locales/fr-FR` (and any other regions) — delta YAMLs or `.gitkeep`
3. `routing.ts` → add regional variants to `locales`
4. `bases.ts` → extend `BaseLocale` union, add `baseOf` rows, `loadBase['fr']`, `loadOverlay` rows

Never add a base locale to `routing.locales` — bases are not URL-addressable. The compiler emits `messages/<locale>/index.ts` automatically on the next `gen:i18n` run.

### Pipeline

- `bun run gen:i18n` — compile `locales/**/*.yaml` → `messages/<locale>/*.json` + `messages/<locale>/index.ts`
- `bun run gen:i18n:watch` — chokidar watcher on `locales/`, regenerates per-locale index on change
- `bun run dev` — runs `gen:i18n` once, then `gen:i18n:watch` + `next dev` in parallel
- `bun run build` / `bun run check-types` — both prefix with `gen:i18n` so `messages/` exists before Next/tsc reads it
- `/messages` is fully gitignored; **all** committed source lives in `/locales`

### Don't need i18n? Remove it cleanly

This template ships i18n wired up. If your app is single-language, strip it instead of leaving it dormant.

- **AI-assisted (recommended):** invoke the `remove-i18n` skill at `.claude/skills/remove-i18n/SKILL.md`. Ask Claude something like _"remove i18n"_ or _"drop localization"_ — the skill handles file deletes, import reverts, `package.json`/`.gitignore`/`next.config.ts` cleanup, dep removal via `bun remove`, and a build verification.
- **Manual:** follow the numbered steps in that same `SKILL.md` file — it doubles as the human checklist. High-level: move `src/app/[locale]/(pages)` back to `src/app/(pages)`, revert `LayoutProps` path params, drop `useTranslations` calls, delete `locales/`, `messages/`, `src/i18n/`, `src/proxy.ts`, `src/global.d.ts`, `scripts/gen-messages.ts`, revert `next.config.ts` and the `dev`/`build`/`check-types` scripts, `bun remove next-intl yaml chokidar concurrently`, strip the i18n `.gitignore` block, delete this section.

After removal, `/` should serve your app directly (no 307 to `/en-US`).

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
