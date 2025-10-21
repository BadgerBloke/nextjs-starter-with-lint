import { Route } from 'next';
import { v7 as uuid } from 'uuid';

import { Icon, IconDropletDown, IconLayoutDashboard, IconSettings } from '@tabler/icons-react';

type MenuType = {
    id: string;
    href: Route;
    text: string;
    icon: Icon;
    name?: string;
    path?: string;
    havePage: boolean;
};

export type SideNavMenuType = MenuType & {
    children?: Omit<MenuType, 'icon'>[];
};

const SIDE_NAV_MENUS: Array<SideNavMenuType> = [
    {
        id: uuid(),
        href: '/users/{{userId}}' as Route,
        text: 'Dashboard',
        icon: IconLayoutDashboard as Icon,
        name: 'user',
        path: 'user',
        havePage: true,
    },
    {
        id: uuid(),
        href: '/users/{{userId}}/settings' as Route,
        text: 'Settings',
        icon: IconSettings as Icon,
        path: 'settings',
        havePage: true,
    },
    {
        id: uuid(),
        href: '/users/{{userId}}/' as Route,
        text: 'Dropdown',
        icon: IconDropletDown as Icon,
        path: 'dropdown',
        havePage: false,
        children: [
            {
                id: uuid(),
                href: '/users/{{userId}}/dropdown/item-1' as Route,
                text: 'Item 1',
                path: 'item-1',
                havePage: true,
            },
        ],
    },
];

export const sideNavMenu = (userId: string) => {
    return SIDE_NAV_MENUS.map(menu => {
        return { ...menu, href: menu.href.replace('{{userId}}' as Route, userId) } as SideNavMenuType;
    });
};

export type BreadcrumbItemType = { id: string; label: string; href?: Route; havePage: boolean }[];
export const generateItems = (pathname: string) => {
    const routes = pathname.split('/'); // .filter(e => !e.startsWith('{{'));
    const items: BreadcrumbItemType = [];
    routes.forEach(route => {
        if (route) {
            const obj = findItemByPath(SIDE_NAV_MENUS, route);

            if (obj) {
                items.push({ id: uuid(), label: obj.name || obj.text, href: obj.href, havePage: obj.havePage });
            } else {
                items.push({ id: uuid(), label: route, havePage: false });
            }
        }
    });
    return items;
};

const findItemByPath = (data: Array<SideNavMenuType>, path: string): Omit<MenuType, 'icon'> | null => {
    for (const item of data) {
        if (item.path === path) {
            return item;
        }
        if (item.children) {
            const result: Omit<MenuType, 'icon'> | null = findItemByPath(item.children as SideNavMenuType[], path);
            if (result) {
                return result;
            }
        }
    }
    return null;
};
