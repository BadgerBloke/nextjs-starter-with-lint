'use client';

import Logo from '~/components/molecules/logo';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
} from '~/components/ui/sidebar';
import { projectNav } from '~/lib/constants/project-nav';
import { isNavBranch } from '~/lib/interfaces/nav';

import SidebarLink from './sidebar-link';
import SidenavMenu from './sidenav-menu';

const AppSidebar = ({ projectId }: { projectId: string }) => {
    const items = projectNav(projectId);
    return (
        <Sidebar variant="floating">
            <SidebarHeader className="mb-3">
                <Logo />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-2">
                            {items.map(item =>
                                isNavBranch(item) ? (
                                    <SidenavMenu key={item.labelKey} item={item} />
                                ) : (
                                    <SidebarLink
                                        key={item.labelKey}
                                        href={item.href}
                                        labelKey={item.labelKey}
                                        icon={item.icon}
                                    />
                                )
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;
