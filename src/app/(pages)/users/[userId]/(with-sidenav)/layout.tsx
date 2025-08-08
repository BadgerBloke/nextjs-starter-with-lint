import { Fragment } from 'react';

import Header from '~/components/organisms/layout/header';
import Navigation from '~/components/organisms/layout/navigation';

const PagesLayout = async ({ children, params }: { children: React.ReactNode; params: Promise<{ userId: string }> }) => {
    const { userId } = await params;
    return (
        <Fragment>
            <Header />
            <div className="flex w-full">
                <Navigation orgId={userId}>{children}</Navigation>
            </div>
        </Fragment>
    );
};

export default PagesLayout;
