import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next-themes', () => ({
    useTheme: () => ({ theme: 'system' }),
}));

import { Toaster } from '~/components/ui/sonner';

describe('Toaster', () => {
    it('mounts without throwing', () => {
        expect(() => render(<Toaster />)).not.toThrow();
    });

    it('renders a live region accessible as "region" role', () => {
        render(<Toaster />);

        // sonner renders <section aria-label="Notifications …" aria-live="polite">
        const region = screen.getByRole('region', { name: /notifications/i });
        expect(region).toBeInTheDocument();
    });

    it('the live region is polite so screen readers are not interrupted', () => {
        render(<Toaster />);

        const region = screen.getByRole('region', { name: /notifications/i });
        expect(region).toHaveAttribute('aria-live', 'polite');
    });
});
