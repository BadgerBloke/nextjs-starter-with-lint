import { describe, expect, it } from 'vitest';
import Header from '~/app/[locale]/(pages)/projects/[projectId]/(with-sidenav)/_local/header';
import { renderWithIntl, screen } from '~test/support/test-utils';

describe('Header (with-sidenav)', () => {
    it('renders the search input', () => {
        renderWithIntl(<Header />, { sidebar: true });

        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    it('renders the search input with type="search"', () => {
        renderWithIntl(<Header />, { sidebar: true });

        expect(screen.getByPlaceholderText('Search...')).toHaveAttribute('type', 'search');
    });

    it('renders the locale switcher button', () => {
        renderWithIntl(<Header />, { sidebar: true });

        expect(screen.getByRole('button', { name: /English \(US\)/i })).toBeInTheDocument();
    });
});
