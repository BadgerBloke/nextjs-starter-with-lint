import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Unit + component tests (Vitest + React Testing Library).
// E2E lives in `e2e/` and is owned by Playwright — excluded here.
export default defineConfig({
    plugins: [react()],
    // Native tsconfig `paths` resolution (the `~/*` alias) — replaces vite-tsconfig-paths.
    resolve: {
        tsconfigPaths: true,
    },
    test: {
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.tsx'],
        // Unit/component tests live in `tests/`, mirroring the `src/` tree.
        include: ['tests/**/*.{test,spec}.{ts,tsx}'],
        exclude: ['node_modules', '.next', 'e2e', 'messages'],
        css: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'lcov'],
            reportsDirectory: './coverage',
            include: ['src/components/**/*.tsx', 'src/app/**/_local/**/*.tsx'],
            // Mirror the governance script's exemptions (barrels, types, actions, opt-outs).
            exclude: ['**/interfaces.ts', '**/*.d.ts', '**/*-actions.ts'],
            thresholds: {
                lines: 70,
                functions: 70,
                statements: 70,
                // Lower floor: a chunk of branches are environment-gated (mobile
                // detection, cookie persistence, keyboard shortcuts in sidebar) or
                // data-driven (empty nav lists) and aren't reasonably reachable in
                // jsdom unit tests. Statements/lines/functions stay at 70.
                branches: 65,
            },
        },
    },
});
