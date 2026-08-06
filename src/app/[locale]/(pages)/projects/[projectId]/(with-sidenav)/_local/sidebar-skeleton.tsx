import Logo from '~/components/molecules/logo';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from '~/components/ui/sidebar';
import { Skeleton } from '~/components/ui/skeleton';

const placeholderRows = ['overview', 'tasks', 'documents', 'team', 'settings', 'billing'];

const SidebarSkeleton = () => (
    <Sidebar variant="floating">
        <SidebarHeader className="mb-3">
            <Logo />
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu className="gap-2">
                        {placeholderRows.map(row => (
                            <SidebarMenuItem key={row}>
                                <Skeleton className="h-8 w-full" />
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
);

export default SidebarSkeleton;
