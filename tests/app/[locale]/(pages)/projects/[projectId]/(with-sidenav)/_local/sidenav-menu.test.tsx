import userEvent from '@testing-library/user-event';
import type { Route } from 'next';
import { describe, expect, it } from 'vitest';
import SidenavMenu from '~/app/[locale]/(pages)/projects/[projectId]/(with-sidenav)/_local/sidenav-menu';
import type { NavBranch } from '~/lib/interfaces/nav';
import { renderWithIntl, screen } from '~test/support/test-utils';

const item: NavBranch = {
    path: '/projects/1/tasks' as Route,
    labelKey: 'tasks',
    children: [{ href: '/projects/1/tasks/all' as Route, labelKey: 'tasksAll' }],
};

const messages = { nav: { tasks: 'Tasks', tasksAll: 'All Tasks' } };

describe('SidenavMenu', () => {
    it('renders the trigger label', () => {
        renderWithIntl(<SidenavMenu item={item} />, { sidebar: true, messages });

        expect(screen.getByText('Tasks')).toBeInTheDocument();
    });

    it('renders a collapsible trigger button', () => {
        renderWithIntl(<SidenavMenu item={item} />, { sidebar: true, messages });

        expect(screen.getByRole('button', { name: /Tasks/i })).toBeInTheDocument();
    });

    it('reveals child items when the trigger is clicked', async () => {
        const user = userEvent.setup();
        renderWithIntl(<SidenavMenu item={item} />, { sidebar: true, messages });

        await user.click(screen.getByRole('button', { name: /Tasks/i }));

        expect(await screen.findByText('All Tasks')).toBeInTheDocument();
    });

    it('renders no child items without user interaction', () => {
        renderWithIntl(<SidenavMenu item={item} />, { sidebar: true, messages });

        // 'All Tasks' is inside CollapsibleContent which is collapsed by default
        expect(screen.queryByText('All Tasks')).toBeNull();
    });
});
