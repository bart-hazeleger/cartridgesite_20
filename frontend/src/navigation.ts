// src/navigation.ts
import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';

export const {Link, redirect, usePathname, useRouter} =
    createLocalizedPathnamesNavigation({
        locales: ['nl','en','es'],
        localePrefix: 'never',
        pathnames: {
            '/': '/',
            '/checkout': { nl: '/afrekenen', en: '/checkout', es: '/pago' },
            '/cart':     { nl: '/winkelwagen', en: '/cart', es: '/carrito' }
            // alles wat je niet mapt blijft hetzelfde
        }
    });