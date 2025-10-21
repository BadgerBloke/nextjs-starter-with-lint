import { Route } from 'next';
import { v7 as uuid } from 'uuid';

import { Icon, IconArticleFilled, IconHome2 } from '@tabler/icons-react';

type MenuType = {
    id: string;
    href: Route;
    text: string;
    icon: Icon;
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
        icon: IconHome2 as Icon,
        havePage: true,
    },
    {
        id: uuid(),
        href: '/', // Don't leave href as blank string otherwise accordion will not work.
        text: 'Dropdown',
        icon: IconArticleFilled as Icon,
        havePage: false,
        children: [
            {
                id: uuid(),
                href: '/',
                text: 'Item 1',
                havePage: true,
            },
            {
                id: uuid(),
                href: '/',
                text: 'Item 2',
                havePage: true,
            },
            {
                id: uuid(),
                href: '/',
                text: 'Item 3',
                havePage: true,
            },
        ],
    },
];

export const headerMenu = (orgId?: string) => {
    return HEADER_MENUS.map(menu => {
        return { ...menu, href: menu.href.replace('{{orgId}}', String(orgId)) } as HeaderMenuType;
    });
};
