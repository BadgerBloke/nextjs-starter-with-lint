import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, vi } from 'vitest';

// ── Global mocks shared by every test ─────────────────────────────────────────

// Locale-aware navigation (next-intl). jsdom has no Next router context, so the
// real `~/i18n/navigation` hooks would throw. Tests that assert on the active
// path override `usePathname` per-file via `vi.mocked(usePathname).mockReturnValue(...)`.
vi.mock('~/i18n/navigation', () => ({
    Link: ({ href, children, ...props }: { href: unknown; children?: ReactNode }) => (
        <a href={typeof href === 'string' ? href : '#'} {...props}>
            {children}
        </a>
    ),
    usePathname: vi.fn(() => '/'),
    useRouter: vi.fn(() => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
        refresh: vi.fn(),
    })),
    redirect: vi.fn(),
    getPathname: vi.fn(() => '/'),
}));

// jsdom doesn't implement matchMedia — required by useIsMobile (sidebar et al).
beforeEach(() => {
    vi.stubGlobal(
        'matchMedia',
        vi.fn((query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            addListener: vi.fn(),
            removeListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }))
    );
});

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});
