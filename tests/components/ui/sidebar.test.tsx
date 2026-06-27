import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarTrigger,
} from '~/components/ui/sidebar';

describe('SidebarProvider', () => {
    it('renders children inside the sidebar wrapper', () => {
        render(
            <SidebarProvider>
                <span>child content</span>
            </SidebarProvider>
        );

        expect(screen.getByText('child content')).toBeInTheDocument();
    });

    it('renders a div with data-slot="sidebar-wrapper"', () => {
        const { container } = render(
            <SidebarProvider>
                <div />
            </SidebarProvider>
        );

        expect(container.querySelector('[data-slot="sidebar-wrapper"]')).toBeInTheDocument();
    });
});

describe('Sidebar sub-components', () => {
    it('renders SidebarHeader and SidebarContent with correct data-slot attributes', () => {
        const { container } = render(
            <SidebarProvider>
                <Sidebar collapsible="none">
                    <SidebarHeader>header text</SidebarHeader>
                    <SidebarContent>body text</SidebarContent>
                </Sidebar>
            </SidebarProvider>
        );

        expect(container.querySelector('[data-slot="sidebar-header"]')).toBeInTheDocument();
        expect(container.querySelector('[data-slot="sidebar-content"]')).toBeInTheDocument();
        expect(screen.getByText('header text')).toBeInTheDocument();
        expect(screen.getByText('body text')).toBeInTheDocument();
    });

    it('renders SidebarMenu as a list with items', () => {
        const { container } = render(
            <SidebarProvider>
                <Sidebar collapsible="none">
                    <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuItem>menu item</SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        );

        expect(container.querySelector('[data-slot="sidebar-menu"]')).toBeInTheDocument();
        expect(screen.getByText('menu item')).toBeInTheDocument();
    });
});

describe('SidebarTrigger', () => {
    it('renders an accessible toggle button', () => {
        render(
            <SidebarProvider>
                <SidebarTrigger />
            </SidebarProvider>
        );

        expect(screen.getByRole('button', { name: 'Toggle Sidebar' })).toBeInTheDocument();
    });

    it('clicking the trigger toggles the sidebar data-state', async () => {
        const user = userEvent.setup();
        const { container } = render(
            <SidebarProvider>
                <SidebarTrigger />
                <Sidebar>
                    <SidebarContent>content</SidebarContent>
                </Sidebar>
            </SidebarProvider>
        );

        const sidebarEl = container.querySelector('[data-slot="sidebar"][data-state]');
        expect(sidebarEl).toHaveAttribute('data-state', 'expanded');

        await user.click(screen.getByRole('button', { name: 'Toggle Sidebar' }));

        expect(sidebarEl).toHaveAttribute('data-state', 'collapsed');
    });
});

describe('Sidebar menu parts', () => {
    it('renders an active menu button with a tooltip and grouped sub-items', () => {
        const { container } = render(
            <SidebarProvider>
                <Sidebar collapsible="none">
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Group</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton isActive tooltip="Home" size="lg">
                                            Home
                                        </SidebarMenuButton>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton isActive>Child</SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        );

        const button = container.querySelector('[data-slot="sidebar-menu-button"]');
        // base-ui renders the active data-attribute as an empty string when truthy.
        expect(button).toHaveAttribute('data-active');
        expect(button).toHaveAttribute('data-size', 'lg');
        expect(screen.getByText('Group')).toBeInTheDocument();
        expect(container.querySelector('[data-slot="sidebar-menu-sub-button"]')).toHaveAttribute('data-active');
    });
});
