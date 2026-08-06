// @no-unit-test — async Server Component, covered by E2E instead

import AppSidebar from './app-sidebar';

interface ProjectSidebarProps {
    params: LayoutProps<'/[locale]/projects/[projectId]'>['params'];
}

const ProjectSidebar = async ({ params }: ProjectSidebarProps) => {
    const { projectId } = await params;

    return <AppSidebar projectId={projectId} />;
};

export default ProjectSidebar;
