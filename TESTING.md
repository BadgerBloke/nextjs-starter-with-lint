# Testing Standards

Precise, enforceable rules for writing tests in this project. **Read this fully before adding or changing any test.** It is the source of truth — do not fall back to generic testing habits where this document is specific.

## Tooling

| Layer | Tool | Lives in |
| --- | --- | --- |
| Unit + component | **Vitest + React Testing Library** | `tests/` (mirrors `src/`) |
| End-to-end | **Playwright** | `e2e/` |

- Config: `vitest.config.mts`, `vitest.setup.tsx`, `playwright.config.ts`.
- Do **not** add Cypress, Jest, or `@playwright/experimental-ct` — the stack above is fixed.

## Layout & naming

Unit/component tests are **NOT co-located**. They live in a top-level `tests/` folder that **mirrors the `src/` tree**. The mapping is mechanical:

```
src/components/atoms/foo.tsx                         → tests/components/atoms/foo.test.tsx
src/components/ui/button.tsx                         → tests/components/ui/button.test.tsx
src/app/[locale]/(pages)/.../_local/header.tsx      → tests/app/[locale]/(pages)/.../_local/header.test.tsx
```

Rules:

- Test file = source path with `src/` swapped for `tests/` and the extension changed to `.test.tsx`.
- Shared test helpers live in **`tests/support/`** (e.g. `renderWithIntl`).
- E2E specs live in **`e2e/`** as `*.spec.ts`, owned by Playwright.
- **Import aliases inside tests** (never relative `../../`):
  - `~/*` → `src/*` (the component under test, e.g. `~/components/ui/button`). `_local` components import as `~/app/[locale]/...`.
  - `~test/*` → `tests/*` (helpers, e.g. `~test/support/test-utils`).

## What MUST have a test (governance)

`scripts/test-governance.ts` enforces test presence. A source file **requires a mirror test** when ALL of:

1. It ends in `.tsx` (JSX component — `.ts` utils/actions/interfaces are never mandated).
2. It is under `src/components/**` (incl. registry `ui/`) **or** under any `_local/` folder in `src/app/**`.
3. It is not a barrel `index.tsx` **in `components/`** (note: `_local/index.tsx` IS a real component and IS required).
4. Its basename is not exempt: `interfaces.ts`, `constants.ts`, `mock-constants.ts`, `util.ts`, `utils.ts`, `types.ts`.
5. It does not match `*-actions.ts`, `*.d.ts`, `*.test.tsx`, `*.spec.tsx`.
6. It does not contain the opt-out pragma (below).

### Opt-out: `@no-unit-test`

Some files genuinely cannot be unit-tested — chiefly **async Server Components** (jsdom cannot render them). Add a comment containing `@no-unit-test` (with a short reason) to the source file and governance will skip it. Cover that component with an **E2E test** instead. Do not abuse this to dodge writing a test for a renderable component.

### Where governance runs

| Stage | Check | Severity |
| --- | --- | --- |
| **pre-commit** (`test:governance --staged` via husky) | new/modified component is paired with its test; a deleted/renamed component deletes/renames its test **in the same commit** | hard error (blocks commit) |
| **pre-push** (husky) | full coverage (`test:coverage`) clears thresholds | hard error |
| **CI** (`.github/workflows/ci.yml`) | governance + coverage + build + E2E | the real gate — husky is bypassable with `--no-verify`, CI is not |

## Coverage thresholds

Set in `vitest.config.mts`, measured over `src/components/**` and `src/app/**/_local/**`:

- statements ≥ 70, lines ≥ 70, functions ≥ 70
- **branches ≥ 65** (lower floor: many branches are environment-gated — mobile detection, cookie persistence, keyboard shortcuts — or data-driven, and aren't reachable in jsdom).

If a PR drops coverage below a floor, add meaningful tests — do not lower the floor without recording why in the config comment.

## Writing a component test

### Global mocks (already set up — do NOT re-declare)

`vitest.setup.tsx` registers these for every test:

- **`~/i18n/navigation`** — `Link` renders as a plain `<a>`; `usePathname()` → `'/'`; `useRouter()` → object of spies; `redirect`/`getPathname` are spies. To assert on the active path, override per-file: `import { usePathname } from '~/i18n/navigation'; vi.mocked(usePathname).mockReturnValue('/x');`.
- **`window.matchMedia`** — stubbed (`matches: false`). Required by `useIsMobile`/sidebar.
- **jest-dom matchers** (`toBeInTheDocument`, `toHaveClass`, …) and RTL `cleanup` after each test.

### Choosing a render helper

- **No i18n / no sidebar context** → `import { render, screen } from '@testing-library/react';`.
- **Uses `useTranslations`/`useLocale`** → `import { renderWithIntl, screen } from '~test/support/test-utils';` and pass `messages`. Missing keys fall back to the key string (no throw), so assert on either the provided label or the raw key.
- **Uses `useSidebar` / sidebar parts** → `renderWithIntl(ui, { sidebar: true })` (wraps in `SidebarProvider`). `useSidebar` throws outside a provider.

`renderWithIntl(ui, { locale?, messages?, sidebar? })` — `locale` defaults to `'en-US'`.

### Per-file mocks

For modules a specific test needs to control, `vi.mock` at the top of that file (hoisted — declare the spy with `vi.fn()` above the import of the component):

```tsx
const setTheme = vi.fn();
vi.mock('next-themes', () => ({ useTheme: () => ({ setTheme }) }));
import ModeToggle from '~/components/molecules/mode-toggle';
```

### base-ui (coss/shadcn primitive) gotchas

- **Overlays open on interaction.** Dropdown/Popover/Menu/Dialog(Sheet)/Tooltip content is portaled and absent until the trigger is activated. Pattern:
  ```tsx
  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: 'Open' }));
  expect(await screen.findByText('Item')).toBeInTheDocument();
  ```
- **Active/open/selected data-attributes render as an EMPTY string when true.** Assert presence, not value: `expect(el).toHaveAttribute('data-active')` — never `toHaveAttribute('data-active', 'true')`.
- **Every primitive sets a `data-slot`.** Prefer asserting `data-slot`, accessible role, and text over class strings.
- **Group parts need their group.** e.g. `DropdownMenuLabel` must sit inside `DropdownMenuGroup` or base-ui throws `MenuGroupContext is missing`.
- **jsdom has no layout engine.** Components that depend on overflow/measurement (e.g. ScrollArea scrollbars) won't mount those parts — assert the structural slots (`scroll-area-viewport`) instead.
- **Library-owned markup may differ from your wrapper.** e.g. sonner's `<Toaster>` renders `<section role="region" aria-label="Notifications…" aria-live="polite">` — query that, don't assert classNames the library controls.

### Typed props in tests

- Routes: `import type { Route } from 'next';` then `'/projects/1' as Route`.
- i18n `nav` keys: use real keys from `locales/en/nav.yaml` (e.g. `overview`, `tasks`, `documents`, `team`, `settings`, `billing`).

### Quality bar

- 2–4 meaningful `it` cases per component: render, key props/variants, primary interaction, and a notable conditional (e.g. `disabled`, empty state).
- Test behavior and accessible output (roles, names, text), not implementation detail.
- Strict TypeScript — **no `any`**. Biome style: 4-space indent, single quotes, semicolons, arrow functions.
- If a base-ui interaction is too flaky in jsdom, **simplify the assertion to a structure/render check — do not delete the test**.

## E2E tests (Playwright)

- Specs in `e2e/*.spec.ts`. `import { test, expect } from '@playwright/test';`.
- `playwright.config.ts` sets `baseURL` (`http://localhost:3000`) and boots the app via `webServer: bun run dev` (which runs `gen:i18n` first). CI swaps to a production server.
- Use relative paths: `await page.goto('/')`. Default locale (`en-US`) serves on clean paths (`localePrefix: 'as-needed'`).
- Use async/RSC-heavy flows here — anything that can't render in jsdom (see `@no-unit-test`).
- Locators: prefer `getByRole`/`getByText`. Example:
  ```ts
  test('home shows welcome heading', async ({ page }) => {
      await page.goto('/');
      await expect(page.getByRole('heading', { level: 1, name: 'Welcome to the Next.js Starter' })).toBeVisible();
  });
  ```

## Commands

| Command | Purpose |
| --- | --- |
| `bun run test` | Vitest watch mode |
| `bun run test:run` | Run unit/component tests once |
| `bun run test:coverage` | Run with coverage thresholds (pre-push + CI) |
| `bun run test:governance` | Full sweep: every component has a mirror test |
| `bun run test:e2e` | Run Playwright E2E |
| `bun run test:e2e:ui` | Playwright UI mode |

## Template — component test

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '~/components/ui/button';

describe('Button', () => {
    it('renders its children', () => {
        render(<Button>Save</Button>);
        expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    it('does not fire onClick when disabled', async () => {
        const onClick = vi.fn();
        const user = userEvent.setup();
        render(
            <Button disabled onClick={onClick}>
                Disabled
            </Button>
        );
        await user.click(screen.getByRole('button', { name: 'Disabled' }));
        expect(onClick).not.toHaveBeenCalled();
    });
});
```

## Template — i18n + sidebar component test

```tsx
import type { Route } from 'next';
import { describe, expect, it } from 'vitest';

import SidebarLink from '~/app/[locale]/(pages)/projects/[projectId]/(with-sidenav)/_local/sidebar-link';
import { renderWithIntl, screen } from '~test/support/test-utils';

describe('SidebarLink', () => {
    it('renders the translated label inside a link to href', () => {
        renderWithIntl(<SidebarLink href={'/projects/1' as Route} labelKey="overview" />, {
            messages: { nav: { overview: 'Overview' } },
            sidebar: true,
        });
        expect(screen.getByRole('link', { name: 'Overview' })).toHaveAttribute('href', '/projects/1');
    });
});
```
