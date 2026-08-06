import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import LogoMark from '~/components/atoms/logo-mark';

describe('LogoMark', () => {
    it('renders the brand name and tagline', () => {
        render(<LogoMark />);

        expect(screen.getByText('MKSingh')).toBeInTheDocument();
        expect(screen.getByText('FullStack Developer')).toBeInTheDocument();
    });

    it('renders the labelled SVG mark', () => {
        render(<LogoMark />);

        expect(screen.getByRole('img', { name: 'MKSingh logo' })).toBeInTheDocument();
    });

    it('renders no link so it is safe as a Suspense fallback', () => {
        render(<LogoMark />);

        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
});
