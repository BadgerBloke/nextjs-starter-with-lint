import Link from 'next/link';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { NavigationMenuItem, NavigationMenuTrigger } from '~/components/ui/navigation-menu';
import { HeaderMenuType } from '~/lib/constants/header-menus';

const NavMenuDropdown = ({ menu }: { menu: HeaderMenuType }) => {
    return (
        <NavigationMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger render={<NavigationMenuTrigger />}>{menu.text}</DropdownMenuTrigger>
                <DropdownMenuContent>
                    {menu.children?.map(e => (
                        <Link href={e.href} key={e.id}>
                            <DropdownMenuItem className="cursor-pointer">{e.text}</DropdownMenuItem>
                        </Link>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </NavigationMenuItem>
    );
};

export default NavMenuDropdown;
