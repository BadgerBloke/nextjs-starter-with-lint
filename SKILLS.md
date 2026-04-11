# Required Claude Code Skills

> **Instructions to Claude — read carefully:**
>
> 1. **Use these skills.** For any task that matches a skill below (see its _"Use for"_ line), you **must** invoke the skill via the Skill tool. Do not fall back to generic knowledge, web search, or guessing — the skill is the source of truth for that domain in this project.
> 2. **Check availability first.** Before starting such a task, confirm the skill is present in your available skills list. If it is missing, **stop**, tell the user to run the install command shown, and do not proceed until they confirm installation.

> **Package manager note:** Install commands use `bunx` because this project uses Bun. Substitute your package manager if different (`npx`, `pnpm dlx`, `yarn dlx`).

## shadcn/ui

**Use for:** Any work involving `src/components/ui/`, adding or updating shadcn primitives, picking components from the registry, theming, or composing shadcn blocks. Replaces the previously-used shadcn MCP server.

**Install:**

```bash
bunx --bun skills add shadcn/ui
```
