// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    i18n: {
        locales: ['nl', 'es', 'en'],
        defaultLocale: 'nl',   // NL zonder prefix
        localeDetection: true,
    },
};

export default nextConfig;