import { useTranslations } from 'next-intl';

import { ArrowRight01Icon, DashboardSquare02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { Link } from '~/i18n/navigation';
import { projectNav } from '~/lib/constants/project-nav';
import { cn } from '~/lib/utils';
import { buildCrumbs } from '~/lib/utils/breadcrumb';

import Typography from '../atoms/typography';
import { buttonVariants } from '../ui/button';

export interface BreadcrumbProps {
    pathname: string;
    projectId: string;
}

const Breadcrumb = ({ pathname, projectId }: BreadcrumbProps) => {
    const t = useTranslations('nav');
    const crumbs = buildCrumbs(pathname, projectNav(projectId));

    if (!crumbs.length) return null;

    return (
        <div className="flex w-full flex-wrap items-center gap-2">
            {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1;
                const label = t(crumb.labelKey);
                const leadIcon =
                    index === 0 ? <HugeiconsIcon icon={DashboardSquare02Icon} strokeWidth={2} className="h-4 w-4" /> : null;
                const trailIcon = !isLast ? (
                    <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="text-brand h-4 w-4" />
                ) : null;

                if (isLast || !crumb.href) {
                    return (
                        <Typography variant={isLast ? 'muted' : 'small'} key={`${crumb.labelKey}-${index}`}>
                            <span className="flex cursor-not-allowed items-center gap-1">
                                {leadIcon} {label} {trailIcon}
                            </span>
                        </Typography>
                    );
                }

                return (
                    <Link
                        href={crumb.href}
                        key={`${crumb.labelKey}-${index}`}
                        className={cn(buttonVariants({ variant: 'link' }), 'h-fit p-0')}
                    >
                        <Typography variant="small">
                            <span className="flex items-center gap-1">
                                {leadIcon} {label} {trailIcon}
                            </span>
                        </Typography>
                    </Link>
                );
            })}
        </div>
    );
};

export default Breadcrumb;
