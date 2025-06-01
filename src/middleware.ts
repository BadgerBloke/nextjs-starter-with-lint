import { NextResponse } from 'next/server';

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

import { CLIENT } from './lib/config';

const isPublicRoute = createRouteMatcher([
    '/',
    '/about-us',
    '/contact-us(.*)',
    '/blog(.*)',
    '/social(.*)',
    '/privacy-policy',
    '/terms-of-service',
    '/webhook/clerk',
    '/sitemap.xml',
    '/robots.txt',
    '/favicon.ico',
    '/site.webmanifest',
    '/api/health',
    '/api/transactions(.*)',
]);

const isAuthRoute = createRouteMatcher(['/auth(.*)']);

export default clerkMiddleware(async (auth, request) => {
    if (isAuthRoute(request)) {
        try {
            const authObj = await auth.protect();
            if (isAuthRoute(request) && authObj.sessionStatus !== 'pending') {
                const redirectUrl = request.nextUrl.searchParams.get('redirect_url');
                const url = new URL(redirectUrl || CLIENT.host);
                return NextResponse.redirect(url);
            }
        } catch {
            // NOTE: No action required
        }
    } else if (!isPublicRoute(request)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
