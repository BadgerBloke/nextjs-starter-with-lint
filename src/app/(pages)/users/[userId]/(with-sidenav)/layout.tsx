import { Fragment, ReactNode } from 'react';

import Header from '~/components/organisms/layout/header';
import Navigation from '~/components/organisms/layout/navigation';

const PagesLayout = async ({ children, params }: { children: ReactNode; params: Promise<{ userId: string }> }) => (
    <Fragment>
        <Header className="sticky top-0 max-w-full bg-background/50 backdrop-blur-md sm:px-4" />
        <div className="flex w-full">
            <Navigation orgId={(await params).userId}>{children}</Navigation>
        </div>
    </Fragment>
);

export default PagesLayout;
