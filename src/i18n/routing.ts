import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en-US', 'en-GB', 'es-ES', 'es-MX', 'hi-IN'],
    defaultLocale: 'en-US',
});
