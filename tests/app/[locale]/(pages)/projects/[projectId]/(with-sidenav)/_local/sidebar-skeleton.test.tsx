import { describe, expect, it } from 'vitest';

import SidebarSkeleton from '~/app/[locale]/(pages)/projects/[projectId]/(with-sidenav)/_local/sidebar-skeleton';
import { renderWithIntl, screen } from '~test/support/test-utils';

describe('SidebarSkeleton', () => {
    it('renders the logo so the fallback matches the loaded sidebar', () => {
        renderWithIntl(<SidebarSkeleton />, { sidebar: true });

        expect(screen.getByText('MKSingh')).toBeInTheDocument();
    });

    it('renders one placeholder row per nav item', () => {
        const { container } = renderWithIntl(<SidebarSkeleton />, { sidebar: true });

        expect(container.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(6);
    });

    it('renders no nav links', () => {
        renderWithIntl(<SidebarSkeleton />, { sidebar: true });

        expect(screen.queryByRole('link', { name: 'Overview' })).not.toBeInTheDocument();
    });
});
