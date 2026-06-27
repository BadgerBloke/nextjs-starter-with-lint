import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Typography from '~/components/atoms/typography';

describe('Typography', () => {
    it('renders children in the variant default element (h1 for hero)', () => {
        render(<Typography variant="hero">Big title</Typography>);

        const el = screen.getByRole('heading', { level: 1, name: 'Big title' });
        expect(el).toBeInTheDocument();
    });

    it('defaults to a paragraph element', () => {
        render(<Typography>Body copy</Typography>);

        const el = screen.getByText('Body copy');
        expect(el.tagName).toBe('P');
    });

    it('honours the `as` override', () => {
        render(
            <Typography variant="h2" as="span">
                Span heading
            </Typography>
        );

        const el = screen.getByText('Span heading');
        expect(el.tagName).toBe('SPAN');
    });

    it('merges a custom className with the variant classes', () => {
        render(
            <Typography variant="muted" className="custom-x">
                Muted
            </Typography>
        );

        const el = screen.getByText('Muted');
        expect(el).toHaveClass('custom-x', 'text-muted-foreground');
    });
});
