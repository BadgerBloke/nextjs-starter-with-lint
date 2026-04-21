import type { Route } from 'next';

import type { IconSvgElement } from '@hugeicons/react';

import type { MessageShape } from '~/global';

export type NavLabelKey = keyof MessageShape['nav'];

type BaseNavItem = {
    labelKey: NavLabelKey;
    icon?: IconSvgElement;
};

export type NavLeaf = BaseNavItem & { href: Route };
export type NavBranch = BaseNavItem & { path: Route; children: NavLeaf[] };
export type NavItem = NavLeaf | NavBranch;

export const isNavBranch = (item: NavItem): item is NavBranch => 'children' in item;
