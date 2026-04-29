import {
    CheckListIcon,
    CreditCardIcon,
    DashboardSquare02Icon,
    File02Icon,
    Settings01Icon,
    UserMultiple02Icon,
} from '@hugeicons/core-free-icons';
import type { Route } from 'next';

import type { NavItem } from '~/lib/interfaces/nav';

export const projectNav = (projectId: string): NavItem[] => [
    {
        href: `/projects/${projectId}` as Route,
        labelKey: 'overview',
        icon: DashboardSquare02Icon,
    },
    {
        path: `/projects/${projectId}/tasks` as Route,
        labelKey: 'tasks',
        icon: CheckListIcon,
        children: [
            { href: `/projects/${projectId}/tasks/all` as Route, labelKey: 'tasksAll' },
            { href: `/projects/${projectId}/tasks/mine` as Route, labelKey: 'tasksMine' },
        ],
    },
    {
        path: `/projects/${projectId}/documents` as Route,
        labelKey: 'documents',
        icon: File02Icon,
        children: [
            { href: `/projects/${projectId}/documents/plans` as Route, labelKey: 'documentsPlans' },
            { href: `/projects/${projectId}/documents/reports` as Route, labelKey: 'documentsReports' },
            { href: `/projects/${projectId}/documents/archive` as Route, labelKey: 'documentsArchive' },
        ],
    },
    {
        path: `/projects/${projectId}/team` as Route,
        labelKey: 'team',
        icon: UserMultiple02Icon,
        children: [
            { href: `/projects/${projectId}/team/members` as Route, labelKey: 'teamMembers' },
            { href: `/projects/${projectId}/team/roles` as Route, labelKey: 'teamRoles' },
        ],
    },
    {
        href: `/projects/${projectId}/settings` as Route,
        labelKey: 'settings',
        icon: Settings01Icon,
    },
    {
        href: `/projects/${projectId}/billing` as Route,
        labelKey: 'billing',
        icon: CreditCardIcon,
    },
];
