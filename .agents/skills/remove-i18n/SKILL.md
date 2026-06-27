---
name: remove-i18n
description: Remove next-intl i18n from this template and revert routing to a single locale (English, no URL prefix). Use when user wants to strip i18n, disable localization, remove the [locale] segment, drop multi-language support, or simplify the template back to its pre-i18n shape. Triggers on phrases like "remove i18n", "disable i18n", "drop localization", "get rid of locale", "I don't need translations", "single language only".
---

# Remove i18n from the template

This template ships with next-intl wired for multi-locale routing under `[locale]`. Some users will not need that. This skill performs a clean, surgical removal and verifies the build.

## When to use

Invoke when the user wants to:

- Strip the i18n layer entirely (no translations, no locale in URL)
- Go back to a single-language app
- Simplify the template

Do NOT use if the user just wants to:

- Add/remove a single locale → edit `src/i18n/routing.ts` + `src/i18n/bases.ts`, and add/remove the `locales/<locale>/` dir
- Change the default locale → edit `routing.defaultLocale`
- Edit translations → edit `locales/<locale>/*.yaml` (never touch the generated `messages/` dir)

If the user's intent is ambiguous, ask via `AskUserQuestion` before destroying files.

## Preconditions — verify before touching anything

1. `git status` is clean (or user has explicitly confirmed uncommitted work is OK to lose). If dirty, stop and ask.
2. `locales/`, `src/i18n/`, `src/proxy.ts`, `src/global.d.ts` exist — confirms template is in the post-i18n state (`messages/` may or may not exist; it's a generated dir). If all absent, report "i18n not present" and exit.
3. User-authored code depending on i18n imports (`next-intl`, `~/i18n/...`, `useTranslations`, `getTranslations`, `~/i18n/navigation`) exists only inside files this skill already rewrites. Grep the codebase:
    ```
    Grep pattern="next-intl|~/i18n/|useTranslations|getTranslations" glob="src/**/*.{ts,tsx}"
    ```
    If hits exist outside `src/i18n/`, `src/proxy.ts`, `src/global.d.ts`, `src/app/[locale]/**`, `src/app/layout.tsx`, report the paths to the user and ask whether to (a) delete those lines or (b) abort. Do not silently strip user code.

## Removal steps — execute in this order

### 1. Move pages out of `[locale]`

The current tree is `src/app/[locale]/(pages)/...`. Move contents back up so routes are served directly from `src/app/(pages)/...`.

```
git mv src/app/[locale]/(pages) src/app/(pages)
```

Then delete the now-empty `[locale]` directory and its layout:

```
rm -rf src/app/[locale]
```

### 2. Revert route type params

Any layout/page that had `LayoutProps<'/[locale]/...'>` or `PageProps<'/[locale]/...'>` must drop the `[locale]` prefix. At minimum check:

- `src/app/(pages)/users/[userId]/(with-sidenav)/layout.tsx` → `LayoutProps<'/users/[userId]'>`

Grep for any remaining `'/[locale]` string literals in app route types and fix each.

### 3. Remove translation calls from pages

Revert `useTranslations`/`getTranslations` usages to literal strings. At minimum:

- `src/app/(pages)/(only-header)/page.tsx` → restore the literal `Home page` render; drop the `useTranslations` import.

Grep for all usages:

```
Grep pattern="useTranslations|getTranslations" glob="src/**/*.{ts,tsx}"
```

For each hit, restore the original literal text or remove the translated string. Ask the user if the literal isn't recoverable.

### 4. Delete i18n files and dirs

```
rm -rf locales
rm -rf messages
rm -rf src/i18n
rm -f src/proxy.ts
rm -f src/global.d.ts
rm -f scripts/gen-messages.ts
```

If `scripts/` becomes empty, delete it. `messages/` is gitignored but may still exist on disk from a previous `gen:i18n` run — remove it regardless.

### 5. Revert `next.config.ts`

Replace entire file with:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    cacheComponents: true,
};

export default nextConfig;
```

### 6. Revert `package.json`

- Scripts to restore:
    ```json
    "dev": "next dev",
    "build": "next build",
    "check-types": "tsc --pretty --noEmit",
    ```
- Scripts to delete: `gen:i18n`, `gen:i18n:watch`.
- Dependencies to remove: `next-intl`
- DevDependencies to remove: `yaml`, `chokidar`, `concurrently`

Use `bun remove next-intl yaml chokidar concurrently` — let Bun update `package.json` and `bun.lock` together. Do NOT hand-edit `bun.lock`.

### 7. Revert `.gitignore`

Remove the i18n block:

```
# i18n generated output (compiled from locales/*.yaml by scripts/gen-messages.ts)
/messages
```

### 8. Revert `README.md`

- Remove the `next-intl` bullet from the Features list.
- Revert the Scripts table to the pre-i18n version (drop `gen:i18n`, `gen:i18n:watch`, drop the YAML-compile notes from `dev`/`build`/`check-types`).
- Revert the Project Structure tree: drop `locales/`, `messages/`, `scripts/`, `src/i18n/`, `src/global.d.ts`, `src/proxy.ts`, and the `[locale]/` line under `src/app/`.
- Delete the entire `## Internationalization` section and its pointer to STANDARDS.md.
- The `## Internationalization` link in the Standards section (if any) should be removed.

### 9. Revert `STANDARDS.md`

Delete the entire `## Internationalization (i18n)` section (from the `## Internationalization (i18n)` heading through the end of its last subsection, stopping before `## Error Handling`).

### 10. Clean + verify

```
rm -rf .next
bun install
bun run check-types
bun run build
```

If any step fails, report the exact error to the user and stop — do not attempt fixes without confirmation. The typical post-removal pitfall is a stale `useTranslations` import missed in step 3.

Curl verify the app still serves on `/`:

```
bun run dev &
until curl -sI http://localhost:3000/ >/dev/null; do sleep 2; done
curl -sI http://localhost:3000/   # should be 200, NOT 307 to /en-US
pkill -f "next dev"
```

If `/` redirects, some route structure or middleware leftover remains — grep for `createMiddleware`, `NextIntlClientProvider`, `routing.locales` across the repo.

## Report back

After removal, give the user a concise summary: files deleted, files modified, deps removed, build status. Confirm URL behavior (`/` → 200 directly).
