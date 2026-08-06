import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

import Typography from '~/components/atoms/typography';
import { buttonVariants } from '~/components/ui/button';
import { cn } from '~/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.',
};

const GlobalNotFound = () => (
    <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className, 'flex flex-col min-h-svh antialiased')}>
            <div className="m-auto flex flex-col items-center gap-2">
                <Typography variant="h2">Not Found</Typography>
                <Typography variant="muted">Could not find requested resource</Typography>
                <Link href="/" className={cn(buttonVariants(), 'mt-4')}>
                    Return Home
                </Link>
            </div>
        </body>
    </html>
);

export default GlobalNotFound;
