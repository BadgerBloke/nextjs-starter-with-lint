import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Separator } from '~/components/ui/separator';

describe('Separator', () => {
    it('renders with data-slot="separator"', () => {
        const { container } = render(<Separator />);

        expect(container.querySelector('[data-slot="separator"]')).toBeInTheDocument();
    });

    it('applies the shrink-0 and bg-border base classes', () => {
        const { container } = render(<Separator />);

        const el = container.querySelector('[data-slot="separator"]');
        expect(el).toHaveClass('shrink-0', 'bg-border');
    });

    it('merges a custom className with the base classes', () => {
        const { container } = render(<Separator className="my-separator" />);

        const el = container.querySelector('[data-slot="separator"]');
        expect(el).toHaveClass('my-separator', 'shrink-0');
    });

    it('renders with a vertical orientation prop without error', () => {
        const { container } = render(<Separator orientation="vertical" />);

        expect(container.querySelector('[data-slot="separator"]')).toBeInTheDocument();
    });
});
