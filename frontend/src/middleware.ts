import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['nl', 'en', 'es'],
    defaultLocale: 'nl',
    localePrefix: 'never',
    domains: [
        {domain: 'localhost',   locales: ['nl']},  // ← important for dev
        {domain: '127.0.0.1',   locales: ['nl']},  // optional if you use this host
        {domain: 'tonershop.nl',  locales: ['nl']},
        {domain: 'sneltoner.nl',  locales: ['nl']},
        {domain: 'tonershop.be',  locales: ['nl']},
        {domain: 'sneltoner.be',  locales: ['nl']},
        {domain: 'cartucho.es',   locales: ['es']},
    ]
});

export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] };