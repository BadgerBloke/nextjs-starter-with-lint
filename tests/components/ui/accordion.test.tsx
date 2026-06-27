import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';

function renderAccordion() {
    return render(
        <Accordion>
            <AccordionItem value="item-1">
                <AccordionTrigger>Section one</AccordionTrigger>
                <AccordionContent>Content one</AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

describe('Accordion', () => {
    it('renders the root with data-slot="accordion"', () => {
        const { container } = renderAccordion();

        expect(container.querySelector('[data-slot="accordion"]')).toBeInTheDocument();
    });

    it('renders the trigger label', () => {
        renderAccordion();

        expect(screen.getByText('Section one')).toBeInTheDocument();
    });

    it('renders the trigger element with data-slot="accordion-trigger"', () => {
        const { container } = renderAccordion();

        expect(container.querySelector('[data-slot="accordion-trigger"]')).toBeInTheDocument();
    });

    it('marks the panel as open when the trigger is clicked', async () => {
        const user = userEvent.setup();
        const { container } = renderAccordion();

        const trigger = container.querySelector('[data-slot="accordion-trigger"]') as HTMLElement;
        await user.click(trigger);

        expect(container.querySelector('[data-slot="accordion-content"]')).toHaveAttribute('data-open');
    });
});
