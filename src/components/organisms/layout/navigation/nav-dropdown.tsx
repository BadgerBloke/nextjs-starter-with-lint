import Link from 'next/link';
import { v4 as uuid } from 'uuid';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { NavigationMenuItem, NavigationMenuTrigger } from '~/components/ui/navigation-menu';
import { NavbarMenuType } from '~/lib/constants/navbar-menus';

const NavMenuDropdown = ({ menu }: { menu: NavbarMenuType }) => {
    return (
        <NavigationMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <NavigationMenuTrigger>{menu.text}</NavigationMenuTrigger>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {menu.children?.map(e => (
                        <DropdownMenuItem key={uuid()}>
                            <Link href={e.href}>{e.text}</Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </NavigationMenuItem>
    );
};

export default NavMenuDropdown;
