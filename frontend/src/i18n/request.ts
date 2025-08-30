// src/i18n/request.ts
import {getRequestConfig} from 'next-intl/server';
import {headers} from 'next/headers';

const SUPPORTED = ['nl','en','es'] as const;
type Supported = (typeof SUPPORTED)[number];

const map: Record<string, Supported> = {
    'cartucho.es': 'es',
    'tonershop.nl': 'nl',
    'sneltoner.nl': 'nl',
    'tonershop.be': 'nl',
    'sneltoner.be': 'nl',
    'localhost': 'nl',
    '127.0.0.1': 'nl'
};

export default getRequestConfig(async ({locale}) => {
    const h = await headers();
    const host = (h.get('x-forwarded-host') ?? h.get('host') ?? '')
        .split(':')[0].toLowerCase();

    const resolved: Supported =
        SUPPORTED.includes(locale as Supported)
            ? (locale as Supported)
            : (map[host] ?? 'nl');

    return {
        locale: resolved,
        messages: (await import(`@/messages/${resolved}.json`)).default
    };
});