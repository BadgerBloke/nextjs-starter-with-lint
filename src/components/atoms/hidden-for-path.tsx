'use client';

import { usePathname } from 'next/navigation';

const HiddenForPath = ({ children, pathname: path }: { children: React.ReactNode; pathname?: string }) => {
    const pathname = usePathname();
    return pathname === path ? null : children;
};

export default HiddenForPath;
