import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';

function renderTooltip() {
    return render(
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>Hover me</TooltipTrigger>
                <TooltipContent>Tooltip text</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

describe('Tooltip', () => {
    it('renders the trigger with data-slot="tooltip-trigger"', () => {
        renderTooltip();

        expect(screen.getByText('Hover me')).toHaveAttribute('data-slot', 'tooltip-trigger');
    });

    it('renders the trigger text', () => {
        renderTooltip();

        expect(screen.getByText('Hover me')).toBeInTheDocument();
    });
});
