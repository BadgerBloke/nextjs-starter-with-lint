'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { cn } from '~/lib/utils';

const RightPortionWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    return (
        <div
            className={cn(
                'flex items-center gap-2 shrink-0',
                clsx({ 'max-md:hidden': pathname !== '/', 'ml-auto': pathname === '/' })
            )}
        >
            {children}
        </div>
    );
};

export default RightPortionWrapper;
