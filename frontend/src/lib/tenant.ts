// src/lib/tenant.ts
import {headers} from 'next/headers';

export type TenantCode = 'sneltoner' | 'tonershop' | 'cartucho';
export type Country = 'NL' | 'BE' | 'ES';
export type Locale = 'nl' | 'es'; // voeg 'en' toe als je die ook gaat voeren

export type Tenant = {
    code: TenantCode;
    locale: Locale;   // UI-taal
    country: Country; // bedrijfsregels (BTW/bezorging)
    domain: string;   // huidige host
};

const MAP: Record<string, Tenant> = {
    // SNELTONER
    'sneltoner.nl': {code:'sneltoner', locale:'nl', country:'NL', domain:'sneltoner.nl'},
    'sneltoner.be': {code:'sneltoner', locale:'nl', country:'BE', domain:'sneltoner.be'},

    // TONERSHOP
    'tonershop.nl': {code:'tonershop', locale:'nl', country:'NL', domain:'tonershop.nl'},
    'tonershop.be': {code:'tonershop', locale:'nl', country:'BE', domain:'tonershop.be'},

    // CARTUCHO (Spaans)
    'cartucho.es':  {code:'cartucho',  locale:'es', country:'ES', domain:'cartucho.es'},

    // DEV
    'localhost':    {code:'tonershop', locale:'nl', country:'NL', domain:'localhost'},
    '127.0.0.1':    {code:'tonershop', locale:'nl', country:'NL', domain:'127.0.0.1'}
};

export async function getTenant(): Promise<Tenant> {
    const h = await headers();
    const host = (h.get('x-forwarded-host') ?? h.get('host') ?? '').split(':')[0].toLowerCase();
    return MAP[host] ?? MAP['localhost'];
}