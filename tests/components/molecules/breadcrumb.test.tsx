import { describe, expect, it } from 'vitest';
import Breadcrumb from '~/components/molecules/breadcrumb';
import { renderWithIntl, screen } from '~test/support/test-utils';

const messages = {
    nav: {
        overview: 'Overview',
        tasks: 'Tasks',
        tasksAll: 'All Tasks',
    },
};

describe('Breadcrumb', () => {
    it('renders the overview crumb for the project root path', () => {
        renderWithIntl(<Breadcrumb pathname="/projects/1" projectId="1" />, { messages });

        expect(screen.getByText('Overview')).toBeInTheDocument();
    });

    it('renders all crumbs for a nested path', () => {
        renderWithIntl(<Breadcrumb pathname="/projects/1/tasks/all" projectId="1" />, { messages });

        expect(screen.getByText('Overview')).toBeInTheDocument();
        expect(screen.getByText('Tasks')).toBeInTheDocument();
        expect(screen.getByText('All Tasks')).toBeInTheDocument();
    });

    it('renders non-last hrefs as links and the last crumb as plain text', () => {
        renderWithIntl(<Breadcrumb pathname="/projects/1/tasks/all" projectId="1" />, { messages });

        // 'overview' is not the last crumb and has an href — rendered as a Link
        expect(screen.getByRole('link', { name: /Overview/i })).toBeInTheDocument();
        // 'tasksAll' is the last crumb — rendered as a span (not a link)
        expect(screen.queryByRole('link', { name: /All Tasks/i })).toBeNull();
    });

    it('renders nothing for a pathname that matches no nav items', () => {
        const { container } = renderWithIntl(<Breadcrumb pathname="/no-match-path" projectId="1" />, { messages });

        expect(container.firstChild).toBeNull();
    });
});
