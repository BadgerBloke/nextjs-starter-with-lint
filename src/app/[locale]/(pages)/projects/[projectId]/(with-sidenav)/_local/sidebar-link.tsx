'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';

import { SidebarMenuButton, SidebarMenuItem } from '~/components/ui/sidebar';
import { Link, usePathname } from '~/i18n/navigation';
import type { NavLeaf } from '~/lib/interfaces/nav';

const SidebarLink = ({ href, labelKey, icon }: NavLeaf) => {
    const pathname = usePathname();
    const t = useTranslations('nav');

    return (
        <SidebarMenuItem>
            <SidebarMenuButton render={<Link href={href} />} isActive={pathname === href}>
                {icon ? <HugeiconsIcon icon={icon} strokeWidth={2} className="mr-2 size-5" /> : null}
                <span>{t(labelKey)}</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};

export default SidebarLink;
