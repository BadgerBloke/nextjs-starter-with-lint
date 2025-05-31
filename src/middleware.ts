import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
    '/',
    '/about-us',
    '/contact-us(.*)',
    '/blog(.*)',
    '/social(.*)',
    '/privacy-policy',
    '/terms-of-service',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/webhook/clerk',
    '/sitemap.xml',
    '/robots.txt',
    '/favicon.ico',
    '/site.webmanifest',
    '/api/health',
    '/api/transactions(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
    if (!isPublicRoute(request)) {
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
