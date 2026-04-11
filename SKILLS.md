# Required Claude Code Skills

> **Instructions to Claude — read carefully. These run at the start of every new conversation in this project.**
>
> **Step 1 — Audit on project load (do this before the first real task).**
> When this file enters your context at the start of a session, immediately compare the skills listed below against your available skills list (delivered via the session-start system reminder). Do this **once, up front** — do not wait for a matching task to surface the problem.
>
> **Step 2 — If any required skill is missing, stop and guide the user.**
> Before doing any work in the project, post a short message to the user that:
>
> 1. Names which required skill(s) are missing.
> 2. Gives the exact install command(s) from the sections below.
> 3. Tells them to run the command(s) and then **start a new session** (skills loaded mid-conversation are not picked up until the next session-start reminder).
> 4. Explicitly says you will wait — do not proceed with their original request until they confirm installation is done.
>
> Keep this message brief and actionable. Example tone: _"Heads up — this project expects the `cosscom/coss` and `shadcn` skills to be loaded, and I don't see `cosscom/coss` in my available skills. Please run `bunx --bun skills add cosscom/coss`, then start a new session so I can pick it up. I'll hold off on your request until then."_
>
> **Step 3 — If all required skills are present, proceed silently.**
> Do not announce that skills are loaded. Just go ahead with the user's request, and invoke each skill via the Skill tool whenever a task matches its _"Use for"_ line. The skills are the source of truth for their domains in this project — do not fall back to generic knowledge, web search, or guessing when a matching skill is available.
>
> **Step 4 — Never silently skip a required skill.**
> If during a task you realize a required skill is missing (e.g. the audit was stale, or a new skill was added to this file), stop at that point and run Step 2 before continuing.

> **Package manager note:** Install commands use `bunx` because this project uses Bun. Substitute your package manager if different (`npx`, `pnpm dlx`, `yarn dlx`).

## UI primitives: one folder, two registries

All UI primitives live in `src/components/ui/` and are installed through the **shadcn CLI** — there is only one CLI and one destination folder. The difference between coss and shadcn is which **registry** the component is pulled from at install time:

- **coss registry** — use the `@coss/` namespace: `bunx --bun shadcn@latest add @coss/<name>` (e.g. `@coss/calendar`).
- **shadcn registry** — use the bare name: `bunx --bun shadcn@latest add <name>` (e.g. `calendar`).

Once a component is installed, its file in `src/components/ui/` looks the same regardless of which registry it came from. **The preference below applies only at install time — not to already-installed files.**

### Install-time priority

1. **Check coss first.** Before installing any primitive, check whether coss provides it (via the coss skill). If it does, install from the coss registry.
2. **Fall back to shadcn.** Only use the bare shadcn registry when coss does not have the component.
3. **Don't duplicate.** If a primitive already exists in `src/components/ui/`, use it as-is — do not re-install it from the other registry just to "switch sources."
4. **Migration is opt-in.** When touching an existing shadcn primitive that now has a coss equivalent, migrating to coss is allowed but not required — only do it if the user asks or the coss version materially improves the feature.

## coss ui (preferred registry)

**Use for:** Any UI work where a coss primitive exists — adding components, composing dialogs/forms/menus/selects/toasts, styling, theming, and answering questions about coss APIs, composition patterns, or migration from shadcn to coss. This skill is the source of truth for **what coss offers and how to use it**; installation itself still happens through the shadcn CLI with the `@coss/` namespace.

Typical triggers:

- "Add a settings dialog with a form and save/cancel buttons."
- "Add a select with grouped options and a search filter."
- "Migrate this shadcn dropdown menu to coss."
- "Build a toast notification for form submission errors."

**Install the skill:**

```bash
bunx --bun skills add cosscom/coss
```

## shadcn/ui (fallback registry)

**Use for:** UI work when coss does not provide the component you need, maintenance of existing `src/components/ui/` files (regardless of whether they came from coss or shadcn originally), picking components from the shadcn registry, theming, and composing shadcn blocks.

Before installing a **new** primitive from the shadcn registry, you must have first checked the coss skill and confirmed no suitable coss equivalent exists.

**Install the skill:**

```bash
bunx --bun skills add shadcn/ui
```
