This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

**A NextJS `app` router `TypeScript` and `TailwindCSS` starter template with `eslint`, `prettier`, and `husky` along with `lintstaged` configuration.**

First, run the development server:

```bash
pnpm dev
# or
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Update the Dependencies

NextJS default dependencies

```shell
pnpm update next react react-dom
```

These are also NextJS's default but I've segregated these into devDependencies

```shell
pnpm update -D @types/node @types/react @types/react-dom autoprefixer eslint eslint-config-next postcss tailwindcss typescript
```

Linting and Husky Dependencies<br/>
📝 Updating the linting dependencies may break the linting flow in that case you should keep the current version of these dependencies.

```shell
pnpm update -D @next/eslint-plugin-next @typescript-eslint/eslint-plugin eslint-config-google eslint-config-prettier eslint-config-standard-with-typescript eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-n eslint-plugin-prettier eslint-plugin-promise eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-simple-import-sort husky lint-staged match-sorter prettier-plugin-tailwindcss
```

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
