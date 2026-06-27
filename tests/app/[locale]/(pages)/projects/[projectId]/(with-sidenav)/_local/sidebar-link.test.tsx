import type { Route } from 'next';
import { describe, expect, it, vi } from 'vitest';
import SidebarLink from '~/app/[locale]/(pages)/projects/[projectId]/(with-sidenav)/_local/sidebar-link';
import { usePathname } from '~/i18n/navigation';
import { renderWithIntl, screen } from '~test/support/test-utils';

const messages = { nav: { overview: 'Overview' } };

describe('SidebarLink', () => {
    it('renders the translated label inside a link to href', () => {
        renderWithIntl(<SidebarLink href={'/projects/1' as Route} labelKey="overview" />, {
            messages,
            sidebar: true,
        });

        const link = screen.getByRole('link', { name: 'Overview' });
        expect(link).toHaveAttribute('href', '/projects/1');
    });

    it('marks the button active when the pathname matches href', () => {
        vi.mocked(usePathname).mockReturnValue('/projects/1');

        renderWithIntl(<SidebarLink href={'/projects/1' as Route} labelKey="overview" />, {
            messages,
            sidebar: true,
        });

        // base-ui renders the active data-attribute as an empty string when truthy.
        expect(screen.getByRole('link', { name: 'Overview' })).toHaveAttribute('data-active');
    });
});
