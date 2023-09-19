'use client';
import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';

import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';

import { Button, buttonVariants } from '~/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu';
import { NAVBAR_MENUS } from '~/lib/constants/navbar-menus';
import { cn } from '~/lib/utils';

import NavAccordion from './nav-accordion';
import NavMenuDropdown from './nav-dropdown';
import ThemeToggleButton from './theme-toggle-button';

const Navigation = () => {
    const [open, setOpen] = useState(false);
    return (
        <nav className="mx-auto flex h-[4.5rem] w-full max-w-[1344px] items-center px-5 sm:px-10">
            <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => {
                    setOpen(false);
                }}
            >
                <span>Your Logo</span>
            </Link>
            <div
                className={clsx(
                    'absolute left-0 top-[4.375rem] z-20 h-[calc(100vh-4.375rem)] w-full overflow-y-auto bg-[#E9E9E9] p-5 dark:bg-black sm:px-10 xl:static xl:ml-20 xl:flex xl:h-auto xl:items-center xl:overflow-y-visible xl:bg-transparent xl:p-0 xl:dark:bg-transparent',
                    !open && 'hidden'
                )}
            >
                {/* Desktop Navigation Bar */}
                <NavigationMenu className="hidden xl:block">
                    <NavigationMenuList className="">
                        {NAVBAR_MENUS.map(menu =>
                            menu.children ? (
                                <NavMenuDropdown key={uuid()} menu={menu} />
                            ) : (
                                <NavigationMenuItem key={uuid()} className="w-full" asChild>
                                    <Link
                                        href={menu.href}
                                        onClick={() => {
                                            setOpen(false);
                                        }}
                                    >
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            {menu.text}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            )
                        )}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Mobile Navigatin Bar */}
                <div className="flex flex-col gap-2 xl:hidden">
                    {NAVBAR_MENUS.map(menu =>
                        menu.children ? (
                            <NavAccordion key={uuid()} item={menu} onClick={() => setOpen(false)} />
                        ) : (
                            <Link
                                key={uuid()}
                                href={menu.href}
                                onClick={() => {
                                    setOpen(false);
                                }}
                                className={cn(buttonVariants({ variant: 'ghost' }), 'justify-start no-underline')}
                            >
                                {menu.text}
                            </Link>
                        )
                    )}
                </div>
                <div className="ml-4 mt-10 xl:ml-auto xl:mt-0 xl:flex xl:items-center xl:gap-5">
                    <div className="mt-10 flex flex-wrap items-center gap-5 xl:mt-0">
                        <Link className={buttonVariants()} href="/login">
                            Log in
                        </Link>
                        <ThemeToggleButton />
                    </div>
                </div>
            </div>

            <Button variant="outline" size="icon" className="ml-auto xl:hidden" onClick={() => setOpen(open => !open)}>
                {open ? <Cross1Icon className="h-4 w-4" /> : <HamburgerMenuIcon className="h-4 w-4" />}
            </Button>
        </nav>
    );
};

export default Navigation;
