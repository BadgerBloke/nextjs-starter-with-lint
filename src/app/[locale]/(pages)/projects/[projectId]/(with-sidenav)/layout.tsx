import { Suspense } from 'react';

import { SidebarProvider } from '~/components/ui/sidebar';

import Header from './_local/header';
import ProjectSidebar from './_local/project-sidebar';
import SidebarSkeleton from './_local/sidebar-skeleton';

const PagesLayout = ({ children, params }: LayoutProps<'/[locale]/projects/[projectId]'>) => (
    <SidebarProvider>
        <Suspense fallback={<SidebarSkeleton />}>
            <ProjectSidebar params={params} />
        </Suspense>
        <main className="relative overflow-x-hidden min-h-dvh w-full pt-20 lg:pr-2">
            <Header />
            {children}
        </main>
    </SidebarProvider>
);

export default PagesLayout;
