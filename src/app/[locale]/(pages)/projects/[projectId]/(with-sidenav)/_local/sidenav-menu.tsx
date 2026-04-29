'use client';

import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';
import {
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '~/components/ui/sidebar';
import { Link, usePathname } from '~/i18n/navigation';
import type { NavBranch } from '~/lib/interfaces/nav';

const SidenavMenu = ({ item }: { item: NavBranch }) => {
    const pathname = usePathname();
    const t = useTranslations('nav');

    return (
        <Collapsible>
            <SidebarMenuItem>
                <CollapsibleTrigger className="group/collapsible" render={<SidebarMenuButton tooltip={t(item.labelKey)} />}>
                    {item.icon ? <HugeiconsIcon icon={item.icon} strokeWidth={2} className="mr-2 size-5" /> : null}
                    <span>{t(item.labelKey)}</span>
                    <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        strokeWidth={2}
                        className="ml-auto transition-transform duration-200 group-data-panel-open/collapsible:rotate-90"
                    />
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {item.children.map(child => (
                            <SidebarMenuSubItem key={child.href}>
                                <SidebarMenuSubButton render={<Link href={child.href} />} isActive={pathname === child.href}>
                                    {t(child.labelKey)}
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
};

export default SidenavMenu;
