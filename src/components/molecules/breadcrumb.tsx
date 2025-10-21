import Link from 'next/link';

import { IconChevronRight, IconLayoutDashboard } from '@tabler/icons-react';

import { BreadcrumbItemType, generateItems } from '~/lib/constants/navigation-menus';
import { cn } from '~/lib/utils';

import Typography from '../atoms/typography';
import { buttonVariants } from '../ui/button';

export interface BreadcrumbProps {
    items?: BreadcrumbItemType;
    pathname?: string;
}

const Breadcrumb = ({ items, pathname }: BreadcrumbProps) => {
    const itemsArray = pathname ? generateItems(pathname) : items;
    return (
        <div className="flex w-full flex-wrap items-center gap-2">
            {itemsArray?.map((item, index) =>
                index === itemsArray.length - 1 ? (
                    <Typography variant="muted" key={item.id}>
                        <span className="flex cursor-not-allowed items-center gap-1">
                            {index === 0 && <IconLayoutDashboard className="h-4 w-4" />} {item.label}
                        </span>
                    </Typography>
                ) : item.href && item.havePage ? (
                    <Link href={item.href} key={item.id} className={cn(buttonVariants({ variant: 'link' }), 'h-fit p-0')}>
                        <Typography variant="small">
                            <span className="flex items-center gap-1">
                                {index === 0 && <IconLayoutDashboard className="h-4 w-4" />} {item.label}{' '}
                                <IconChevronRight className="text-brand h-4 w-4" />
                            </span>
                        </Typography>
                    </Link>
                ) : (
                    <Typography variant="small" key={item.id}>
                        <span className="flex cursor-not-allowed items-center gap-1 capitalize text-muted-foreground">
                            {index === 0 && <IconLayoutDashboard className="h-4 w-4" />} {item.label}{' '}
                            <IconChevronRight className="text-brand h-4 w-4" />
                        </span>
                    </Typography>
                )
            )}
        </div>
    );
};

export default Breadcrumb;
