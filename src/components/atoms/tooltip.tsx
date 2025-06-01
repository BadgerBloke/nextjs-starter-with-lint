import { ReactNode } from 'react';

import { TooltipContentProps } from '@radix-ui/react-tooltip';

import { Tooltip as TooltipPrimitive, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';
import { cn } from '~/lib/utils';

interface TooltipProps extends TooltipContentProps {
    children: ReactNode;
    className?: string;
    message: string;
    delayDuration?: number;
}

const Tooltip = ({ children, className, message, delayDuration = 0, ...props }: TooltipProps) => (
    <TooltipProvider delayDuration={delayDuration}>
        <TooltipPrimitive>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent
                className={cn('border-input bg-popover text-popover-foreground border px-2 py-1 text-xs', className)}
                {...props}
            >
                {message}
            </TooltipContent>
        </TooltipPrimitive>
    </TooltipProvider>
);

export default Tooltip;
