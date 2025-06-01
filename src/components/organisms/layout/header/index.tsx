'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

import Typography from '~/components/atoms/typography';
import { Button, buttonVariants } from '~/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu';
import { SheetClose } from '~/components/ui/sheet';
import { headerMenu } from '~/lib/constants/header-menus';
import { cn } from '~/lib/utils';

import NavAccordion from './nav-accordion';
import NavMenuDropdown from './nav-dropdown';
import Pannel from './pannel';

const Header = ({ orgId, className }: { orgId?: string; className?: string }) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    return (
        <div className="bg-background/30 sticky top-0 z-20 backdrop-blur-lg">
            <header className={cn('container mx-auto flex h-[4.5rem] w-full items-center px-5 sm:px-10', className)}>
                <Link href="/" className="flex items-center gap-2 lg:min-w-48 px-2" onClick={() => setOpen(false)}>
                    <Typography variant="large">MKSingh</Typography>
                </Link>
                <div className="ml-auto flex items-center gap-3 xl:hidden">
                    {/* <ModeToggle /> */}
                    <SignedIn>
                        <div className="flex size-9 items-center justify-center overflow-hidden rounded-full">
                            <UserButton />
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <Link
                            href={`/auth/sign-in${typeof window !== 'undefined' ? '?redirect_url=' + window?.location?.href : ''}`}
                            className={cn(buttonVariants())}
                        >
                            Sign in
                        </Link>
                    </SignedOut>
                    <Button variant="outline" size="icon" onClick={() => setOpen(open => !open)} aria-label="Menu">
                        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </Button>
                </div>
                <div
                    className={clsx(
                        'top-[4.375rem] left-0 z-20 hidden h-[calc(100vh-4.375rem)] w-full flex-1 justify-center overflow-y-auto bg-[#E9E9E9] p-5 sm:px-10 xl:static xl:flex xl:h-auto xl:items-center xl:overflow-y-visible xl:bg-transparent xl:p-0 dark:bg-black xl:dark:bg-transparent'
                    )}
                >
                    {/* Desktop Navigation Bar */}
                    <NavigationMenu className="hidden xl:block">
                        <NavigationMenuList className="gap-4">
                            {headerMenu(orgId)?.map(menu =>
                                menu.children ? (
                                    <NavMenuDropdown key={menu.href} menu={menu} />
                                ) : (
                                    <NavigationMenuItem key={menu.href} className="w-full">
                                        <NavigationMenuLink asChild>
                                            <Link href={menu.href} className={navigationMenuTriggerStyle()}>
                                                {menu.text}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                )
                            )}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="ml-auto hidden items-center gap-4 text-xl font-bold xl:flex">
                    <SignedIn>
                        <div className="flex size-9 items-center justify-center overflow-hidden rounded-full">
                            <UserButton />
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <Link
                            href={`/auth/sign-in${typeof window !== 'undefined' ? '?redirect_url=' + window?.location?.href : ''}`}
                            className={cn(buttonVariants())}
                        >
                            Sign in
                        </Link>
                    </SignedOut>
                </div>
                {/* Mobile Navigation Bar */}
                <Pannel onClick={() => setOpen(false)} open={open}>
                    <div className="flex flex-col gap-2">
                        {headerMenu(orgId)?.map(menu =>
                            menu.children ? (
                                <NavAccordion
                                    key={menu.href}
                                    item={menu}
                                    onClick={() => setOpen(false)}
                                    pathname={pathname}
                                />
                            ) : (
                                <SheetClose asChild key={menu.href}>
                                    <Link
                                        href={menu.href}
                                        className={cn(
                                            buttonVariants({ variant: 'ghost' }),
                                            clsx({
                                                'bg-muted/50': pathname === menu.href,
                                            }),
                                            'justify-start no-underline'
                                        )}
                                    >
                                        <menu.icon className="mr-2 h-5 w-5" /> {menu.text}
                                    </Link>
                                </SheetClose>
                            )
                        )}
                    </div>
                </Pannel>
            </header>
        </div>
    );
};

export default Header;
