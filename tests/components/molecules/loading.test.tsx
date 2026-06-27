import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Loader from '~/components/molecules/loading';

describe('Loader', () => {
    it('renders the default "Loading..." message', () => {
        render(<Loader />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders a custom message', () => {
        render(<Loader message="Please wait" />);

        expect(screen.getByText('Please wait')).toBeInTheDocument();
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    it('renders no message text when message is an empty string', () => {
        render(<Loader message="" />);

        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    it('renders without error when a custom size is provided', () => {
        const { container } = render(<Loader size={40} message="Sizing" />);

        expect(screen.getByText('Sizing')).toBeInTheDocument();
        expect(container.firstChild).toBeInTheDocument();
    });
});
