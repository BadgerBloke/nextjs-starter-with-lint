import type { Route } from 'next';

import type { NavItem, NavLabelKey, NavLeaf } from '~/lib/interfaces/nav';
import { isNavBranch } from '~/lib/interfaces/nav';

export type Crumb = { labelKey: NavLabelKey; href?: Route };

const findLeaf = (items: NavItem[], href: string): NavLeaf | null => {
    for (const item of items) {
        if (isNavBranch(item)) {
            const hit = findLeaf(item.children, href);
            if (hit) return hit;
        } else if (item.href === href) {
            return item;
        }
    }
    return null;
};

const findBranch = (items: NavItem[], path: string) => {
    for (const item of items) {
        if (isNavBranch(item) && item.path === path) return item;
    }
    return null;
};

export const buildCrumbs = (pathname: string, nav: NavItem[]): Crumb[] => {
    const segments = pathname.split('/').filter(Boolean);
    const crumbs: Crumb[] = [];
    let accumulated = '';

    for (const segment of segments) {
        accumulated += `/${segment}`;
        const leaf = findLeaf(nav, accumulated);
        if (leaf) {
            crumbs.push({ labelKey: leaf.labelKey, href: leaf.href });
            continue;
        }
        const branch = findBranch(nav, accumulated);
        if (branch) crumbs.push({ labelKey: branch.labelKey });
    }

    return crumbs;
};
