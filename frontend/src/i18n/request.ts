import {getRequestConfig} from 'next-intl/server';
import {headers} from 'next/headers';

const SUPPORTED = ['nl', 'en', 'es'] as const;
type Supported = typeof SUPPORTED[number];

const domainToLocale: Record<string, Supported> = {
    'cartucho.es': 'es',
    'tonershop.nl': 'nl',
    'sneltoner.nl': 'nl',
    'tonershop.be': 'nl',
    'sneltoner.be': 'nl',
    'localhost': 'nl',
    '127.0.0.1': 'nl'
};

export default getRequestConfig(async ({locale}) => {
    // Fallback: haal host op en map naar locale
    const host = headers().get('host')?.split(':')[0]?.toLowerCase();
    const byDomain = (host && domainToLocale[host]) || undefined;

    // Kies volgorde: meegegeven locale → domain → nl
    const l: Supported =
        (SUPPORTED as readonly string[]).includes(locale as string)
            ? (locale as Supported)
            : (byDomain ?? 'nl');

    return {
        locale: l, // <-- belangrijk in v4
        messages: (await import(`@/messages/${l}.json`)).default
    };
});