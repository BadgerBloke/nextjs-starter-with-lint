import Link from 'next/link';

import Typography from '~/components/atoms/typography';

const Logo = ({ hidden = false }: { hidden?: boolean }) => {
    if (hidden) return null;

    return (
        <Link href="/" className="lg:px-3 flex gap-1 items-end justify-center">
            <Typography variant="h2" className="leading-6">
                MKSingh
            </Typography>
        </Link>
    );
};

export default Logo;
