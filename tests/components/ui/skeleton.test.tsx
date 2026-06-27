import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Skeleton } from '~/components/ui/skeleton';

describe('Skeleton', () => {
    it('renders a div with data-slot="skeleton"', () => {
        const { container } = render(<Skeleton />);

        expect(container.querySelector('[data-slot="skeleton"]')).toBeInTheDocument();
    });

    it('includes animate-pulse and rounded-md classes by default', () => {
        const { container } = render(<Skeleton />);

        const el = container.querySelector('[data-slot="skeleton"]');
        expect(el).toHaveClass('animate-pulse', 'rounded-md');
    });

    it('merges a custom className with the base classes', () => {
        const { container } = render(<Skeleton className="h-10 w-full" />);

        const el = container.querySelector('[data-slot="skeleton"]');
        expect(el).toHaveClass('h-10', 'w-full', 'animate-pulse');
    });
});
