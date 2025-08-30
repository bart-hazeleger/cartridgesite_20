import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {hostToLocale, inboundMap} from '@/i18n/routing';

const PUBLIC_FILE = /\.(.*)$/;
const BYPASS_PREFIXES = ['/_next', '/api', '/assets', '/favicon', '/robots', '/sitemap'];

export function middleware(req: NextRequest) {
    const {pathname, search} = req.nextUrl;

    // Skip statics & API
    if (PUBLIC_FILE.test(pathname) || BYPASS_PREFIXES.some(p => pathname.startsWith(p))) {
        return NextResponse.next();
    }

    // Locale o.b.v. host
    const host = (req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? '')
        .split(':')[0].toLowerCase() || 'localhost';
    const locale = hostToLocale[host] ?? 'nl';

    // Eerste segment normaliseren
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return NextResponse.next(); // root blijft root

    const first = segments[0].toLowerCase();
    const canonFirst = inboundMap[locale]?.[first];
    if (!canonFirst) return NextResponse.next(); // geen vertaalde slug → niets doen

    // Rewrite naar canoniek pad
    segments[0] = canonFirst;
    const url = req.nextUrl.clone();
    url.pathname = '/' + segments.join('/');
    url.search = search;

    return NextResponse.rewrite(url);
}

export const config = { matcher: ['/((?!.*\\.).*)'] };