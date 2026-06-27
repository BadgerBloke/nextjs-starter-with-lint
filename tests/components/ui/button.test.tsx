import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '~/components/ui/button';

describe('Button', () => {
    it('renders its children', () => {
        render(<Button>Save</Button>);

        expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    it('applies the variant + size classes', () => {
        render(
            <Button variant="destructive" size="lg">
                Delete
            </Button>
        );

        expect(screen.getByRole('button', { name: 'Delete' })).toHaveClass('text-destructive');
    });

    it('fires onClick when pressed', async () => {
        const onClick = vi.fn();
        const user = userEvent.setup();
        render(<Button onClick={onClick}>Click me</Button>);

        await user.click(screen.getByRole('button', { name: 'Click me' }));

        expect(onClick).toHaveBeenCalledOnce();
    });

    it('does not fire onClick when disabled', async () => {
        const onClick = vi.fn();
        const user = userEvent.setup();
        render(
            <Button disabled onClick={onClick}>
                Disabled
            </Button>
        );

        await user.click(screen.getByRole('button', { name: 'Disabled' }));

        expect(onClick).not.toHaveBeenCalled();
    });
});
