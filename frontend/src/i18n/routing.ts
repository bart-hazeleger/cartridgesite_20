// Eén bron van waarheid voor talen, domeinen en padvertalingen
export const locales = ['nl', 'es'] as const;
export type AppLocale = typeof locales[number];

// Domein → locale (UI-taal); BE/NL allebei nl
export const hostToLocale: Record<string, AppLocale> = {
    'sneltoner.nl': 'nl',
    'sneltoner.be': 'nl',
    'tonershop.nl': 'nl',
    'tonershop.be': 'nl',
    'cartucho.es':  'es',
    'localhost':    'nl',
    '127.0.0.1':    'nl'
};

// Canonieke (Engelse) routes van je filesystem
// Let op: dit zijn de *enige* echte page-mappen die je hebt.
export const canonicalRoutes = {
    home:      '/',
    checkout:  '/checkout',
    cart:      '/cart',
    products:  '/products',
    product:   '/products/[slug]',
    category:  '/category/[slug]',
    contact:   '/contact',
} as const;

// Outbound pathnames mapping voor gelokaliseerde slugs (links in UI)
export const pathnames = {
    [canonicalRoutes.home]: '/',
    [canonicalRoutes.checkout]: { nl: '/afrekenen',   es: '/pago' },
    [canonicalRoutes.cart]:     { nl: '/winkelwagen', es: '/carrito' },
    [canonicalRoutes.products]: { nl: '/producten',   es: '/productos' },
    [canonicalRoutes.product]:  { nl: '/producten/[slug]', es: '/productos/[slug]' },
    [canonicalRoutes.category]: { nl: '/categorie/[slug]', es: '/categoria/[slug]' },
    [canonicalRoutes.contact]:  { nl: '/contact',     es: '/contacto' },
} as const;

// Inbound mapping: eerste segment (gelokaliseerd) → canonieke eerste segment
// Hiermee herschrijf je binnenkomende requests naar je echte page-mappen.
export const inboundMap: Record<AppLocale, Record<string, string>> = {
    nl: {
        afrekenen:    'checkout',
        winkelwagen:  'cart',
        producten:    'products',
        categorie:    'category',
        contact:      'contact',
    },
    es: {
        pago:         'checkout',
        carrito:      'cart',
        productos:    'products',
        categoria:    'category',
        contacto:     'contact',
    }
};