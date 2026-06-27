import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const setTheme = vi.fn();
vi.mock('next-themes', () => ({
    useTheme: () => ({ setTheme }),
}));

import ModeToggle from '~/components/molecules/mode-toggle';

describe('ModeToggle', () => {
    beforeEach(() => setTheme.mockClear());

    it('renders an accessible theme toggle button', () => {
        render(<ModeToggle />);

        expect(screen.getByRole('button', { name: 'Toggle theme' })).toBeInTheDocument();
    });

    it('sets the theme when a menu item is chosen', async () => {
        const user = userEvent.setup();
        render(<ModeToggle />);

        await user.click(screen.getByRole('button', { name: 'Toggle theme' }));
        await user.click(await screen.findByText('Dark'));

        expect(setTheme).toHaveBeenCalledWith('dark');
    });
});
