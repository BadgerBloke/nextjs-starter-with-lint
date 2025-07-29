import { JSX } from 'react';
import Link from 'next/link';

import Typography from '~/components/atoms/typography';
import { ScrollArea } from '~/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent } from '~/components/ui/sheet';

type SheetSide = 'top' | 'right' | 'bottom' | 'left';

const SheetSide = ({
    children,
    trigger,
    open,
    side = 'left',
    onClick,
}: {
    children: React.ReactNode;
    trigger: JSX.Element;
    open: boolean;
    side?: SheetSide;
    onClick: () => void;
}) => {
    return (
        <Sheet open={open} onOpenChange={onClick}>
            <SheetContent side={side} className="p-0">
                <div className="mb-4 flex w-full items-center justify-between p-4">
                    <Link href="/" className="flex items-center gap-2" onClick={onClick}>
                        <Typography variant="large">MKSingh</Typography>
                    </Link>
                    <SheetClose asChild>{trigger}</SheetClose>
                </div>
                <ScrollArea className="h-[calc(100vh-120px)] px-2">{children}</ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default SheetSide;
