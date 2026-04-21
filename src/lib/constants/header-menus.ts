import { Route } from 'next';
import { v7 as uuid } from 'uuid';

import { Home01Icon, News01Icon } from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';

type MenuType = {
    id: string;
    href: Route;
    text: string;
    icon: IconSvgElement;
    name?: string;
    path?: string;
    havePage: boolean;
};

export type HeaderMenuType = MenuType & {
    children?: Omit<MenuType, 'icon'>[];
};

const HEADER_MENUS: Array<HeaderMenuType> = [
    {
        id: uuid(),
        href: '/',
        text: 'Home',
        icon: Home01Icon,
        havePage: true,
    },
    {
        id: uuid(),
        href: '/',
        text: 'Dropdown',
        icon: News01Icon,
        havePage: false,
        children: [
            { id: uuid(), href: '/', text: 'Item 1', havePage: true },
            { id: uuid(), href: '/', text: 'Item 2', havePage: true },
            { id: uuid(), href: '/', text: 'Item 3', havePage: true },
        ],
    },
];

export const headerMenu = (orgId?: string) => {
    return HEADER_MENUS.map(menu => {
        return { ...menu, href: menu.href.replace('{{orgId}}', String(orgId)) } as HeaderMenuType;
    });
};
