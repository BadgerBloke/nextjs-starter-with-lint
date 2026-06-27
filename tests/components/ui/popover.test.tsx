import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from '~/components/ui/popover';

describe('Popover', () => {
    it('renders the trigger as a button with data-slot="popover-trigger"', () => {
        render(
            <Popover>
                <PopoverTrigger>Open</PopoverTrigger>
                <PopoverContent>
                    <PopoverTitle>Settings</PopoverTitle>
                </PopoverContent>
            </Popover>
        );

        const trigger = screen.getByRole('button', { name: 'Open' });
        expect(trigger).toBeInTheDocument();
        expect(trigger).toHaveAttribute('data-slot', 'popover-trigger');
    });

    it('content is absent from the DOM before the trigger is clicked', () => {
        render(
            <Popover>
                <PopoverTrigger>Open</PopoverTrigger>
                <PopoverContent>
                    <PopoverTitle>Settings</PopoverTitle>
                </PopoverContent>
            </Popover>
        );

        expect(screen.queryByText('Settings')).not.toBeInTheDocument();
    });

    it('shows title and description inside the content after clicking the trigger', async () => {
        const user = userEvent.setup();
        render(
            <Popover>
                <PopoverTrigger>Open</PopoverTrigger>
                <PopoverContent>
                    <PopoverHeader>
                        <PopoverTitle>Settings</PopoverTitle>
                        <PopoverDescription>Manage your preferences.</PopoverDescription>
                    </PopoverHeader>
                </PopoverContent>
            </Popover>
        );

        await user.click(screen.getByRole('button', { name: 'Open' }));

        expect(await screen.findByText('Settings')).toBeInTheDocument();
        expect(await screen.findByText('Manage your preferences.')).toBeInTheDocument();
    });

    it('open content carries data-slot="popover-content"', async () => {
        const user = userEvent.setup();
        render(
            <Popover>
                <PopoverTrigger>Open</PopoverTrigger>
                <PopoverContent>
                    <PopoverTitle>Title</PopoverTitle>
                </PopoverContent>
            </Popover>
        );

        await user.click(screen.getByRole('button', { name: 'Open' }));
        await screen.findByText('Title');

        expect(document.querySelector('[data-slot="popover-content"]')).toBeInTheDocument();
    });
});
