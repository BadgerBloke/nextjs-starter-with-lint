import Link from 'next/link';

import Typography from '~/components/atoms/typography';

const Logo = ({ hidden = false }: { hidden?: boolean }) => {
    if (hidden) return null;

    return (
        <Link href="/" className="relative flex items-center gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="size-10"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                />
            </svg>
            <div className="flex flex-col items-center gap-1.5 pt-1 justify-center">
                <Typography variant="h3" className="tracking-widest leading-4">
                    MKSingh
                </Typography>
                <span className="text-[10px] leading-2.5 uppercase text-muted-foreground">FullStack Developer</span>
            </div>
        </Link>
    );
};

export default Logo;
