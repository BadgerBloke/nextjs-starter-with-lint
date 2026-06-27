import { describe, expect, it } from 'vitest';
import Header from '~/app/[locale]/(pages)/(only-header)/_local/index';
import { renderWithIntl, screen } from '~test/support/test-utils';

describe('Header (only-header)', () => {
    it('renders the logo text', () => {
        renderWithIntl(<Header />);

        expect(screen.getByText('MKSingh')).toBeInTheDocument();
    });

    it('renders the locale switcher button with the current locale label', () => {
        renderWithIntl(<Header />);

        // LocaleSwitcher renders a button with the current locale label
        expect(screen.getByRole('button', { name: /English \(US\)/i })).toBeInTheDocument();
    });

    it('renders the mobile navigation toggle button', () => {
        renderWithIntl(<Header />);

        expect(screen.getByRole('button', { name: /toggle navigation menu/i })).toBeInTheDocument();
    });
});
