import { Suspense } from 'react';

import LogoMark, { logoMarkClassName } from '~/components/atoms/logo-mark';
import { Link } from '~/i18n/navigation';

const Logo = ({ hidden = false }: { hidden?: boolean }) => {
    if (hidden) return null;

    return (
        <Suspense
            fallback={
                <span className={logoMarkClassName}>
                    <LogoMark />
                </span>
            }
        >
            <Link href="/" className={logoMarkClassName}>
                <LogoMark />
            </Link>
        </Suspense>
    );
};

export default Logo;
