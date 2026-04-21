'use client';

import { usePathname } from '~/i18n/navigation';

const HiddenForPath = ({ children, pathname: path }: { children: React.ReactNode; pathname?: string }) => {
    const pathname = usePathname();
    return pathname === path ? null : children;
};

export default HiddenForPath;
