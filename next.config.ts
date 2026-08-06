import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    cacheComponents: true,
    experimental: {
        globalNotFound: true,
    },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
