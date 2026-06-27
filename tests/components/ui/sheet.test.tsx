import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '~/components/ui/sheet';

describe('Sheet', () => {
    it('renders the trigger as a button with data-slot="sheet-trigger"', () => {
        render(
            <Sheet>
                <SheetTrigger>Open sheet</SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Panel Title</SheetTitle>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        );

        const trigger = screen.getByRole('button', { name: 'Open sheet' });
        expect(trigger).toBeInTheDocument();
        expect(trigger).toHaveAttribute('data-slot', 'sheet-trigger');
    });

    it('sheet content is absent before the trigger is clicked', () => {
        render(
            <Sheet>
                <SheetTrigger>Open sheet</SheetTrigger>
                <SheetContent>
                    <SheetTitle>Panel Title</SheetTitle>
                </SheetContent>
            </Sheet>
        );

        expect(screen.queryByText('Panel Title')).not.toBeInTheDocument();
    });

    it('shows title and description inside the sheet after clicking the trigger', async () => {
        const user = userEvent.setup();
        render(
            <Sheet>
                <SheetTrigger>Open sheet</SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Panel Title</SheetTitle>
                        <SheetDescription>Manage your settings.</SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        );

        await user.click(screen.getByRole('button', { name: 'Open sheet' }));

        expect(await screen.findByText('Panel Title')).toBeInTheDocument();
        expect(await screen.findByText('Manage your settings.')).toBeInTheDocument();
    });

    it('open sheet carries data-slot="sheet-content"', async () => {
        const user = userEvent.setup();
        render(
            <Sheet>
                <SheetTrigger>Open sheet</SheetTrigger>
                <SheetContent>
                    <SheetTitle>Panel Title</SheetTitle>
                </SheetContent>
            </Sheet>
        );

        await user.click(screen.getByRole('button', { name: 'Open sheet' }));
        await screen.findByText('Panel Title');

        expect(document.querySelector('[data-slot="sheet-content"]')).toBeInTheDocument();
    });

    it('omits the close button and honours a custom side when configured', async () => {
        const user = userEvent.setup();
        render(
            <Sheet>
                <SheetTrigger>Open sheet</SheetTrigger>
                <SheetContent side="left" showCloseButton={false}>
                    <SheetTitle>Left Panel</SheetTitle>
                </SheetContent>
            </Sheet>
        );

        await user.click(screen.getByRole('button', { name: 'Open sheet' }));
        await screen.findByText('Left Panel');

        const content = document.querySelector('[data-slot="sheet-content"]');
        expect(content).toHaveAttribute('data-side', 'left');
        expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
    });
});
