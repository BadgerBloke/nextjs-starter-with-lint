# Next.js Starter Template

A modern Next.js starter template with App Router, TypeScript, Tailwind CSS v4, shadcn/ui, and a comprehensive linting setup.

## Features

- **Next.js 16** with App Router and Server Components
- **TypeScript** in strict mode
- **Tailwind CSS v4** with shadcn/ui components
- **Atomic Design** component architecture (atoms, molecules, organisms)
- **next-intl** i18n with base+overlay locale model and YAML-authored dictionaries
- **Biome** for linting, formatting, and import sorting (one tool, fast)
- **Husky & lint-staged** for pre-commit code quality checks
- **Commitlint** for conventional commit messages
- **Bun** as the package manager

## Getting Started

### Prerequisites

- Node.js (v24 or later)
- [Bun](https://bun.sh/) (recommended) or any package manager (`pnpm`, `yarn`, `npm`)

### Installation

```bash
git clone https://github.com/MKSinghDev/nextjs-starter.git
cd nextjs-starter
bun install
```

### Development

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Script           | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `dev`            | Compile i18n YAML once, then run watcher + Next dev in parallel  |
| `build`          | Compile i18n YAML, then build for production                     |
| `start`          | Start the production server                                      |
| `gen:i18n`       | Compile `messages/**/*.yaml` → sibling `.json` (source of truth) |
| `gen:i18n:watch` | Same as `gen:i18n` plus chokidar watcher for live regen          |
| `lint`           | Lint with Biome                                                  |
| `lint:fix`       | Lint and auto-fix with Biome                                     |
| `format`         | Format code with Biome                                           |
| `check-types`    | Compile i18n YAML, then type-check with TypeScript               |
| `check-format`   | Check formatting without writing                                 |
| `check-lint`     | Lint without writing                                             |
| `test`           | Run unit/component tests (Vitest) in watch mode                  |
| `test:run`       | Run unit/component tests once                                    |
| `test:coverage`  | Run unit/component tests with coverage thresholds                |
| `test:governance`| Assert every authored component has a mirror test in `tests/`    |
| `test:e2e`       | Run Playwright end-to-end tests                                  |
| `test-all`       | Run format, lint, type-check, governance, coverage, and build    |

## Project Structure

```
.
├── locales/                    # i18n YAML source (committed)
│   ├── en/                     # base locale (full dict)
│   ├── en-GB/ en-US/           # regional overlays (partial deltas or .gitkeep)
│   ├── es/ es-ES/ es-MX/
│   └── hi/ hi-IN/
├── messages/                   # i18n generated output (JSON + index.ts, GITIGNORED)
├── scripts/
│   ├── gen-messages.ts         # locales/ → messages/ compiler (one-shot + watch)
│   └── test-governance.ts      # asserts every component has a mirror test
├── tests/                      # unit/component tests (Vitest), mirrors src/ tree
│   └── support/                # shared test helpers (renderWithIntl)
├── e2e/                        # end-to-end tests (Playwright)
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/           # all routes nested under locale segment
│   │   │   └── (pages)/        # route groups for pages
│   │   ├── globals.css         # Global styles
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── atoms/              # Basic building blocks (no internal deps)
│   │   ├── molecules/          # Composed from atoms only
│   │   ├── organisms/          # Composed from atoms and/or molecules
│   │   └── ui/                 # shadcn/ui components (CLI-managed)
│   ├── hooks/                  # Shared custom hooks
│   ├── i18n/                   # routing, base/overlay loaders, request config
│   ├── lib/                    # Utilities, constants, interfaces, config
│   ├── global.d.ts             # AppConfig augment + MessageShape/MessageOverride
│   └── proxy.ts                # next-intl locale middleware (Next 16 name)
├── CLAUDE.md                   # AI agent instructions (imports the files below)
├── AGENTS.md                   # Next.js agent rules
├── STANDARDS.md                # Project coding standards
├── TESTING.md                  # Testing standards (unit/component + E2E)
├── SKILLS.md                   # Recommended Claude Code skills
├── biome.json                  # Biome lint + format configuration
├── next.config.ts              # Next.js configuration (wrapped with next-intl plugin)
└── tsconfig.json               # TypeScript configuration
```

## Internationalization

- URL locales are **regional variants only** (`en-US`, `en-GB`, `es-ES`, `es-MX`, `hi-IN`). Listed in `src/i18n/routing.ts`. Default locale serves on clean paths (`/`, `/users`) via `localePrefix: 'as-needed'`; non-default keeps the prefix (`/es-MX`, `/es-MX/users`)
- Each regional variant maps to a **base locale** (`en`, `es`, `hi`) via `baseOf` in `src/i18n/bases.ts`. Bases are never URL-addressable
- Dictionaries authored in **YAML** under `locales/<locale>/*.yaml` (committed). Compiled to `messages/<locale>/*.json` + per-locale `index.ts` by `scripts/gen-messages.ts` (`messages/` is fully gitignored; regenerated on every build / dev / check-types)
- Runtime deep-merges base dict + regional overlay per request. Overlays hold only the keys that differ
- Keys are fully type-checked — `useTranslations('home')` and `t('title')` autocomplete against the `en` reference shape

Adding or editing translations, and the full locale-addition recipe, lives in [STANDARDS.md](./STANDARDS.md#internationalization-i18n).

**Don't need i18n?** Ask Claude to _"remove i18n"_ and it runs the `remove-i18n` skill at [`.claude/skills/remove-i18n/SKILL.md`](./.claude/skills/remove-i18n/SKILL.md) — that same file also serves as the manual removal checklist if you'd rather strip it by hand.

## Standards

See [STANDARDS.md](./STANDARDS.md) for the full coding standards covering naming conventions, component architecture, styling, and more, and [TESTING.md](./TESTING.md) for the testing standards (unit/component + E2E).

## Claude Code Skills

This project recommends a set of Claude Code skills that extend the AI agent with project-specific tooling (e.g. shadcn component registry access). See [SKILLS.md](./SKILLS.md) for the list and install commands.

## License

This project is licensed under the [MIT License](./LICENSE).
