import { ReactNode } from 'react';
import Link from 'next/link';

import Typography from '~/components/atoms/typography';
import { ModeToggle } from '~/components/molecules/mode-toggle';
import { ScrollArea } from '~/components/ui/scroll-area';
import { Separator } from '~/components/ui/separator';
import { Sheet, SheetClose, SheetContent, SheetTitle } from '~/components/ui/sheet';

const SheetSide = ({ children, open, onClick }: { children: ReactNode; open: boolean; onClick: () => void }) => {
    return (
        <Sheet open={open} onOpenChange={onClick}>
            <SheetContent side="left" className="p-4">
                <SheetTitle className="sr-only">Mobile menu</SheetTitle>
                <div className="mb-4 flex w-full items-center justify-between">
                    <SheetClose asChild>
                        <Link href="/" className="flex items-center gap-2 lg:min-w-48 px-2">
                            <Typography variant="large">MKSingh</Typography>
                        </Link>
                    </SheetClose>
                </div>
                <ScrollArea className="flex h-[calc(100vh-120px)] flex-col">
                    {children}
                    <Separator className="my-1" />
                    <div className="my-5 flex flex-wrap items-center gap-5">
                        <ModeToggle variant="image" />
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default SheetSide;
