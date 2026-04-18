# Next.js Starter Template

A modern Next.js starter template with App Router, TypeScript, Tailwind CSS v4, shadcn/ui, and a comprehensive linting setup.

## Features

- **Next.js 16** with App Router and Server Components
- **TypeScript** in strict mode
- **Tailwind CSS v4** with shadcn/ui components
- **Atomic Design** component architecture (atoms, molecules, organisms)
- **ESLint & Prettier** with plugins for React, TypeScript, accessibility, and import sorting
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

| Script         | Description                             |
| -------------- | --------------------------------------- |
| `dev`          | Start the development server            |
| `build`        | Build for production                    |
| `start`        | Start the production server             |
| `lint`         | Run ESLint                              |
| `lint:fix`     | Run ESLint with auto-fix                |
| `format`       | Format code with Prettier               |
| `check-types`  | Type-check with TypeScript              |
| `check-format` | Check formatting without writing        |
| `test-all`     | Run format, lint, type-check, and build |

## Project Structure

```
.
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (pages)/            # Route groups for pages
│   │   ├── globals.css         # Global styles
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── atoms/              # Basic building blocks (no internal deps)
│   │   ├── molecules/          # Composed from atoms only
│   │   ├── organisms/          # Composed from atoms and/or molecules
│   │   └── ui/                 # shadcn/ui components (CLI-managed)
│   ├── hooks/                  # Shared custom hooks
│   └── lib/                    # Utilities, constants, interfaces, config
├── CLAUDE.md                   # AI agent instructions (imports the files below)
├── AGENTS.md                   # Next.js agent rules
├── STANDARDS.md                # Project coding standards
├── SKILLS.md                   # Recommended Claude Code skills
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
└── tsconfig.json               # TypeScript configuration
```

## Standards

See [STANDARDS.md](./STANDARDS.md) for the full coding standards covering naming conventions, component architecture, styling, testing, and more.

## Claude Code Skills

This project recommends a set of Claude Code skills that extend the AI agent with project-specific tooling (e.g. shadcn component registry access). See [SKILLS.md](./SKILLS.md) for the list and install commands.

## License

This project is licensed under the [MIT License](./LICENSE).
