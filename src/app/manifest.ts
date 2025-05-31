import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'imageAi.io',
        short_name: 'imageAi',
        description:
            'Transform your images with AI! Remove scratches, colorize, upscale, and clean up backgrounds in seconds. Sign up today for free AI image editing credits!',
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#fff',
        icons: [
            {
                src: '/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
