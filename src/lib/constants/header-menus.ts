import { BotMessageSquare, DollarSign, Home, LucideIcon, PhoneIcon, Users } from 'lucide-react';

type MenuType = {
    href: string;
    text: string;
    icon: LucideIcon;
    name?: string;
    path?: string;
    havePage: boolean;
    isPrivate?: boolean;
};

export type HeaderMenuType = MenuType & {
    children?: Omit<MenuType, 'icon'>[];
};

const HEADER_MENUS: Array<HeaderMenuType> = [
    {
        href: '/',
        text: 'Home',
        icon: Home,
        havePage: true,
    },
    {
        href: '/agents/restore-image',
        text: 'Explore',
        icon: BotMessageSquare,
        havePage: true,
        isPrivate: true,
    },
    {
        href: '/pricing',
        text: 'Pricing',
        icon: DollarSign,
        havePage: true,
        isPrivate: false,
    },
    {
        href: '/about-us',
        text: 'About Us',
        icon: Users,
        havePage: true,
        isPrivate: false,
    },
    {
        href: '/contact-us',
        text: 'Contact Us',
        icon: PhoneIcon,
        havePage: true,
        isPrivate: false,
    },
];

export const headerMenu = (orgId?: string) => {
    return HEADER_MENUS.map(menu => {
        return { ...menu, href: menu.href.replace('{{orgId}}', String(orgId)) };
    });
};
