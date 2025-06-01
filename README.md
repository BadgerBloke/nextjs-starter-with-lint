# NextJS Starter Template with Linting

A modern, full-featured Next.js starter template utilizing the App Router,
TypeScript, Tailwind CSS v4, and an extensive linting setup. The feat/clerk-auth
branch enhances this foundation by integrating Clerk authentication with custom
UI components, along with utilities like Zod and conform-to/react for robust
form handling and validation.

## 🚀 Features

### Core Features (Available in trunk)

- Next.js App Router: Utilizes the latest App Router for file-based routing.
- TypeScript: Ensures type safety and developer productivity.
- Tailwind CSS v4: Offers a utility-first CSS framework for rapid UI development.
- ESLint & Prettier: Enforces consistent code style and formatting.
- Husky & lint-staged: Automates code quality checks on commits.
- Commitlint: Maintains standardized commit messages.
- Bun Support: Includes a bun.lock file for Bun package manager compatibility.

### Additional Features in feat/clerk-auth

- Clerk Authentication: Integrates Clerk for user authentication with custom UI components.
- Zod: Provides schema-based form validation.
- conform-to/react: Enhances form handling with React.
- shadcn UI Components: Tailored authentication UI built with Tailwind CSS.

## 📦 Getting Started

### Prerequisites

- Node.js (v22 or later)
- Package Manager: `pnpm`, `yarn`, `npm`, or `bun`

### Installation

1. Clone the Repository

```bash
git clone https://github.com/BadgerBloke/nextjs-starter-with-lint.git
cd nextjs-starter-with-lint
```

2. Install Dependencies
   Using `bun`

```bash
bun install
```

Alternatively, use `yarn`, `npm`, or `pnpm` as per your preference.

3. Configure Environment Variables

Copy the example environment file and set the necessary variables:

```bash
cp env.example .env
```

Note: For the feat/clerk-auth branch, ensure you set the Clerk-related
environment variables as specified in the env.example file.

4. Run the Development Server

```bash
bun dev
```

Open <http://localhost:3000> in your browser to view the application.

## 🛠️ Scripts

| Scripts  | Description                            |
| -------- | -------------------------------------- |
| `dev`    | Starts the development servera         |
| `build`  | Builds the application for productiona |
| `start`  | Starts the production server           |
| `lint`   | Runs ESLint for code linting           |
| `format` | Formats code using Prettier            |

## 🧪 Linting & Formatting

This template includes a comprehensive linting and formatting setup:

- ESLint: Configured with plugins for React, TypeScript, accessibility, and import sorting.
- Prettier: Ensures consistent code formatting.
- Husky & lint-staged: Automatically runs linting and formatting on staged files before commits.
- Commitlint: Enforces conventional commit messages.

## 🔐 Authentication with Clerk (Available in [`feat/clerk-auth`](https://github.com/BadgerBloke/nextjs-starter-with-lint/tree/feat/clerk-auth))

The `feat/clerk-auth` branch integrates Clerk for authentication:

- Custom UI Components: Authentication interfaces built with Tailwind CSS.
- Protected Routes: Ensures secure access to authenticated pages.
- Form Handling: Utilizes Zod and conform-to/react for robust form validation and handling.

> Note: Ensure you have the necessary Clerk environment variables set in
> your .env file.

## 🧱 Project Structure

```plaintext
.
├── .github/               # GitHub configurations
├── .husky/                # Husky hooks
├── public/                # Static assets
├── src/                   # Application source code
│   ├── app/               # Next.js App Router pages
│   ├── components/        # Reusable UI components
│   ├── lib/               # Utility functions and libraries
│   ├── middleware.ts      # App middleware
├── .prettierrc            # Prettier configuration
├── env.example            # Example environment variables
├── eslint.config.mjs      # ESLint configuration
├── next.config.ts         # Next.js configuration
└── tsconfig.json          # TypeScript configuration

```

## 📄 License

This project is licensed under the [MIT License]().
