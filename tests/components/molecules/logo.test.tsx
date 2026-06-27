import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Logo from '~/components/molecules/logo';

describe('Logo', () => {
    it('renders a link to the homepage', () => {
        render(<Logo />);

        // Link is globally mocked as <a href="...">
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/');
    });

    it('renders the brand name text and the SVG logo title', () => {
        render(<Logo />);

        expect(screen.getByText('MKSingh')).toBeInTheDocument();
        // The SVG has role="img" and aria-labelledby pointing to <title>MKSingh logo</title>
        expect(screen.getByRole('img', { name: 'MKSingh logo' })).toBeInTheDocument();
    });

    it('renders nothing when the hidden prop is true', () => {
        const { container } = render(<Logo hidden />);

        expect(container).toBeEmptyDOMElement();
    });
});
