import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';

describe('Collapsible', () => {
    it('renders the root with data-slot="collapsible"', () => {
        const { container } = render(
            <Collapsible>
                <CollapsibleTrigger>Toggle</CollapsibleTrigger>
                <CollapsibleContent>Hidden content</CollapsibleContent>
            </Collapsible>
        );

        expect(container.querySelector('[data-slot="collapsible"]')).toBeInTheDocument();
    });

    it('renders the trigger with data-slot="collapsible-trigger"', () => {
        render(
            <Collapsible>
                <CollapsibleTrigger>Toggle</CollapsibleTrigger>
                <CollapsibleContent>Content</CollapsibleContent>
            </Collapsible>
        );

        expect(screen.getByRole('button', { name: 'Toggle' })).toHaveAttribute('data-slot', 'collapsible-trigger');
    });

    it('marks the panel as open when the trigger is clicked', async () => {
        const user = userEvent.setup();
        const { container } = render(
            <Collapsible>
                <CollapsibleTrigger>Toggle</CollapsibleTrigger>
                <CollapsibleContent>Panel content</CollapsibleContent>
            </Collapsible>
        );

        await user.click(screen.getByRole('button', { name: 'Toggle' }));

        expect(container.querySelector('[data-slot="collapsible-content"]')).toHaveAttribute('data-open');
    });
});
