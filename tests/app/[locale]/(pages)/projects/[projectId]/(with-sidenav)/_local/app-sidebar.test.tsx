import { describe, expect, it } from 'vitest';
import AppSidebar from '~/app/[locale]/(pages)/projects/[projectId]/(with-sidenav)/_local/app-sidebar';
import { renderWithIntl, screen } from '~test/support/test-utils';

const messages = {
    nav: {
        overview: 'Overview',
        tasks: 'Tasks',
        documents: 'Documents',
        team: 'Team',
        settings: 'Settings',
        billing: 'Billing',
    },
};

describe('AppSidebar', () => {
    it('renders the logo', () => {
        renderWithIntl(<AppSidebar projectId="1" />, { sidebar: true, messages });

        expect(screen.getByText('MKSingh')).toBeInTheDocument();
    });

    it('renders the Overview nav item as a link', () => {
        renderWithIntl(<AppSidebar projectId="1" />, { sidebar: true, messages });

        expect(screen.getByRole('link', { name: /Overview/i })).toBeInTheDocument();
    });

    it('renders all top-level nav labels', () => {
        renderWithIntl(<AppSidebar projectId="1" />, { sidebar: true, messages });

        expect(screen.getByText('Overview')).toBeInTheDocument();
        expect(screen.getByText('Tasks')).toBeInTheDocument();
        expect(screen.getByText('Documents')).toBeInTheDocument();
        expect(screen.getByText('Team')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('Billing')).toBeInTheDocument();
    });
});
