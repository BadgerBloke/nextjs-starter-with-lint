import { SlotProps } from 'input-otp';

import { cn } from '~/lib/utils';

const Slot = (props: SlotProps) => {
    return (
        <div
            className={cn(
                'border-input bg-background text-foreground relative -ms-px flex size-9 items-center justify-center border font-medium shadow-xs transition-[color,box-shadow] first:ms-0 first:rounded-s-md last:rounded-e-md',
                { 'border-ring ring-ring/50 z-10 ring-[3px]': props.isActive }
            )}
        >
            {props.char !== null && <div>{props.char}</div>}
        </div>
    );
};

export default Slot;
