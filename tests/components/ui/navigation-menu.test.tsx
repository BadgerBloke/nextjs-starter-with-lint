import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '~/components/ui/navigation-menu';

describe('NavigationMenu', () => {
    it('renders the root and list with correct data-slot attributes', () => {
        const { container } = render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/home">Home</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        );

        expect(container.querySelector('[data-slot="navigation-menu"]')).toBeInTheDocument();
        expect(container.querySelector('[data-slot="navigation-menu-list"]')).toBeInTheDocument();
    });

    it('renders a trigger as a button with the trigger text', () => {
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <p>Products listing</p>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        );

        expect(screen.getByRole('button', { name: /products/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /products/i })).toHaveAttribute('data-slot', 'navigation-menu-trigger');
    });

    it('renders a link with data-slot="navigation-menu-link"', () => {
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/about">About</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        );

        const link = screen.getByRole('link', { name: 'About' });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('data-slot', 'navigation-menu-link');
        expect(link).toHaveAttribute('href', '/about');
    });

    it('merges a custom className onto the root', () => {
        const { container } = render(
            <NavigationMenu className="custom-nav">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="#">Item</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        );

        expect(container.querySelector('[data-slot="navigation-menu"]')).toHaveClass('custom-nav');
    });
});
