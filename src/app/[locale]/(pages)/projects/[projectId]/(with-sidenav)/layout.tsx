import { SidebarProvider } from '~/components/ui/sidebar';

import AppSidebar from './_local/app-sidebar';
import Header from './_local/header';

const PagesLayout = async ({ children, params }: LayoutProps<'/[locale]/projects/[projectId]'>) => {
    const { projectId } = await params;
    return (
        <SidebarProvider>
            <AppSidebar projectId={projectId} />
            <main className="relative overflow-x-hidden min-h-dvh w-full pt-20 lg:pr-2">
                <Header />
                {children}
            </main>
        </SidebarProvider>
    );
};

export default PagesLayout;
