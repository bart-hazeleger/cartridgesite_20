import {headers} from 'next/headers';
export type Tenant = 'tonershop'|'sneltoner'|'cartucho';
export async function getTenant() {
    const h = await headers();
    const host = (h.get('x-forwarded-host') ?? h.get('host') ?? '').split(':')[0].toLowerCase();
    if (host.endsWith('cartucho.es')) return {code:'cartucho' as Tenant, locale:'es', country:'ES'};
    if (host.endsWith('sneltoner.nl')) return {code:'sneltoner' as Tenant, locale:'nl', country:'NL'};
    return {code:'tonershop' as Tenant, locale:'nl', country:'NL'};
}