// src/i18n/request.ts
import {getRequestConfig} from 'next-intl/server';
import {getTenant} from '@/lib/tenant';

export default getRequestConfig(async ({locale}) => {
    const t = await getTenant();
    const resolved = (locale === 'nl' || locale === 'es') ? locale : t.locale;
    return {
        locale: resolved,
        messages: (await import(`@/messages/${resolved}.json`)).default
    };
});