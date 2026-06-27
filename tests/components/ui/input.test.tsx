import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Input } from '~/components/ui/input';

describe('Input', () => {
    it('renders a textbox', () => {
        render(<Input />);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('has data-slot="input"', () => {
        render(<Input />);

        expect(screen.getByRole('textbox')).toHaveAttribute('data-slot', 'input');
    });

    it('accepts type and placeholder props', () => {
        render(<Input type="email" placeholder="Enter email" />);

        const input = screen.getByPlaceholderText('Enter email');
        expect(input).toHaveAttribute('type', 'email');
    });

    it('merges a custom className with the base classes', () => {
        render(<Input className="custom-input" />);

        expect(screen.getByRole('textbox')).toHaveClass('custom-input', 'rounded-md');
    });
});
