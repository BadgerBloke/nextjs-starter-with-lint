type MenuItem = {
    href: string;
    text: string;
};

export type NavbarMenuType = MenuItem & {
    children?: MenuItem[];
};

export const NAVBAR_MENUS: NavbarMenuType[] = [
    {
        href: '/',
        text: 'Home',
    },
    {
        href: '/blogs',
        text: 'Blogs',
        children: [
            {
                href: '/blogs/web-development',
                text: 'Web Development',
            },
            {
                href: '/blogs/desktop-application',
                text: 'Desktop Application',
            },
            {
                href: '/blogs/identity-and-access',
                text: 'Identity & Access',
            },
        ],
    },
];
