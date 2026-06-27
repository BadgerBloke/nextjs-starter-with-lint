import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import NotFoundPage from '~/components/molecules/not-found';

describe('NotFoundPage', () => {
    it('renders a "Not Found" heading', () => {
        render(<NotFoundPage />);

        expect(screen.getByRole('heading', { name: 'Not Found' })).toBeInTheDocument();
    });

    it('renders the resource-not-found description', () => {
        render(<NotFoundPage />);

        expect(screen.getByText('Could not find requested resource')).toBeInTheDocument();
    });

    it('renders a "Return Home" link pointing to /', () => {
        render(<NotFoundPage />);

        // Link is globally mocked as <a href="...">
        const link = screen.getByRole('link', { name: 'Return Home' });
        expect(link).toHaveAttribute('href', '/');
    });
});
