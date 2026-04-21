import { Menu01Icon, Search01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import LocaleSwitcher from '~/components/molecules/locale-switcher';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { SidebarTrigger } from '~/components/ui/sidebar';

const Header = () => (
    <div className="fixed top-0 z-50 p-2 md:pl-0 inset-x-0 md:left-(--sidebar-width)">
        <header className="px-4 md:px-6 bg-sidebar/50 backdrop-blur-md border border-sidebar-border rounded-lg shadow-sm">
            <div className="flex h-16 items-center justify-between gap-4">
                {/* Left side */}
                <SidebarTrigger render={<Button variant="ghost" className="md:hidden" />}>
                    <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} className="size-8" />
                </SidebarTrigger>

                {/* Center */}
                <div className="relative flex-1">
                    <Input
                        id="global-search-input"
                        className="peer h-8 w-full max-w-xs ps-8 pe-2"
                        placeholder="Search..."
                        type="search"
                    />
                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 inset-s-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
                        <HugeiconsIcon icon={Search01Icon} strokeWidth={2} size={16} />
                    </div>
                </div>
                {/* Right side */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <LocaleSwitcher />
                    </div>
                </div>
            </div>
        </header>
    </div>
);

export default Header;
