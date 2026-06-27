import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

describe('DropdownMenu', () => {
    it('renders the trigger as a button with data-slot="dropdown-menu-trigger"', () => {
        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Item one</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        const trigger = screen.getByRole('button', { name: 'Open menu' });
        expect(trigger).toBeInTheDocument();
        expect(trigger).toHaveAttribute('data-slot', 'dropdown-menu-trigger');
    });

    it('menu items are absent from the DOM while the menu is closed', () => {
        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Item one</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        expect(screen.queryByText('Item one')).not.toBeInTheDocument();
    });

    it('shows menu items after clicking the trigger', async () => {
        const user = userEvent.setup();
        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Item one</DropdownMenuItem>
                    <DropdownMenuItem>Item two</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        await user.click(screen.getByRole('button', { name: 'Open menu' }));

        expect(await screen.findByText('Item one')).toBeInTheDocument();
        expect(await screen.findByText('Item two')).toBeInTheDocument();
    });

    it('each item carries data-slot="dropdown-menu-item" when the menu is open', async () => {
        const user = userEvent.setup();
        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Item one</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        await user.click(screen.getByRole('button', { name: 'Open menu' }));
        await screen.findByText('Item one');

        expect(document.querySelector('[data-slot="dropdown-menu-item"]')).toBeInTheDocument();
    });

    it('renders the full set of menu parts (group, label, checkbox, radio, sub, separator)', async () => {
        const user = userEvent.setup();
        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuLabel inset>Section</DropdownMenuLabel>
                        <DropdownMenuItem inset variant="destructive">
                            Delete
                            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>Show grid</DropdownMenuCheckboxItem>
                    <DropdownMenuRadioGroup value="a">
                        <DropdownMenuRadioItem value="a">Option A</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="b">Option B</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>Nested</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        await user.click(screen.getByRole('button', { name: 'Open menu' }));

        expect(await screen.findByText('Section')).toBeInTheDocument();
        expect(screen.getByText('Show grid')).toHaveAttribute('data-slot', 'dropdown-menu-checkbox-item');
        expect(screen.getByText('Option A')).toHaveAttribute('data-slot', 'dropdown-menu-radio-item');
        expect(screen.getByText('Delete')).toHaveAttribute('data-variant', 'destructive');
        expect(screen.getByText('More')).toHaveAttribute('data-slot', 'dropdown-menu-sub-trigger');
    });
});
