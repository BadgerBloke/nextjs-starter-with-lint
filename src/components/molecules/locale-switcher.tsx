'use client';

import { ArrowDown01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useLocale } from 'next-intl';

import { Button } from '~/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { usePathname, useRouter } from '~/i18n/navigation';
import { routing } from '~/i18n/routing';

type Locale = (typeof routing.locales)[number];

const labels: Record<Locale, string> = {
    'en-US': 'English (US)',
    'en-GB': 'English (UK)',
    'es-ES': 'Español (ES)',
    'es-MX': 'Español (MX)',
    'hi-IN': 'हिन्दी (IN)',
};

const LocaleSwitcher = () => {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" className="gap-1.5" />}>
                <span>{labels[locale]}</span>
                <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} className="size-3.5 opacity-60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {routing.locales.map(l => (
                    <DropdownMenuItem
                        key={l}
                        disabled={l === locale}
                        onClick={() => router.replace(pathname, { locale: l })}
                    >
                        {labels[l]}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LocaleSwitcher;
