// src/navigation.ts
import {createNavigation} from 'next-intl/navigation';

export const {Link, redirect, usePathname, useRouter} =
    createNavigation({
        locales: ['nl','en','es'],
        localePrefix: 'never',
        pathnames: {
            '/': '/',
            '/checkout': { nl: '/afrekenen', en: '/checkout', es: '/pago' },
            '/cart':     { nl: '/winkelwagen', en: '/cart', es: '/carrito' }
            // alles wat je hier niet noemt blijft gelijk in alle talen
        }
    });