import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ScrollArea } from '~/components/ui/scroll-area';

describe('ScrollArea', () => {
    it('renders with data-slot="scroll-area" on the root element', () => {
        const { container } = render(<ScrollArea>Content</ScrollArea>);

        expect(container.querySelector('[data-slot="scroll-area"]')).toBeInTheDocument();
    });

    it('renders children inside the viewport', () => {
        render(
            <ScrollArea>
                <p>Scrollable content</p>
            </ScrollArea>
        );

        expect(screen.getByText('Scrollable content')).toBeInTheDocument();
    });

    it('renders the viewport with data-slot="scroll-area-viewport"', () => {
        const { container } = render(<ScrollArea>Content</ScrollArea>);

        // jsdom has no layout engine so custom scrollbars do not render, but the
        // viewport wrapper is always present.
        expect(container.querySelector('[data-slot="scroll-area-viewport"]')).toBeInTheDocument();
    });

    it('merges a custom className onto the root', () => {
        const { container } = render(<ScrollArea className="custom-scroll">Content</ScrollArea>);

        expect(container.querySelector('[data-slot="scroll-area"]')).toHaveClass('custom-scroll');
    });
});
