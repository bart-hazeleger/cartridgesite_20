// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { hostToLocale, inboundMap } from "@/i18n/routing";

const PUBLIC_FILE = /\.(.*)$/;
const BYPASS_PREFIXES = ["/_next", "/api", "/assets", "/favicon", "/robots", "/sitemap"];

// === Domein -> tenant mapping ===
type Tenant = "cartucho" | "tonershop" | "default";
const DOMAIN_TENANT: Record<string, Tenant> = {
    // cartucho.es
    "cartucho.es": "cartucho",
    "www.cartucho.es": "cartucho",

    // tonershop.nl / tonershop.be
    "tonershop.nl": "tonershop",
    "www.tonershop.nl": "tonershop",
    "tonershop.be": "tonershop",
    "www.tonershop.be": "tonershop",

    // sneltoner.* (standaard)
    "sneltoner.nl": "default",
    "www.sneltoner.nl": "default",
    "sneltoner.be": "default",
    "www.sneltoner.be": "default",

    // lokaal
    "localhost": "default",
    "localhost:3000": "default",
    "127.0.0.1": "default",
    "127.0.0.1:3000": "default",
};

export function middleware(req: NextRequest) {
    const { pathname, search } = req.nextUrl;

    // Skip statics & API
    if (PUBLIC_FILE.test(pathname) || BYPASS_PREFIXES.some((p) => pathname.startsWith(p))) {
        return NextResponse.next();
    }

    // Host bepalen (voorkeur voor proxy header)
    const host =
        (req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "")
            .split(":")[0]
            .toLowerCase() || "localhost";

    // Locale & tenant bepalen
    const locale = hostToLocale[host] ?? "nl";
    const tenant: Tenant = DOMAIN_TENANT[host] ?? "default";

    // Request headers uitbreiden met x-tenant
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-tenant", tenant);

    // Eerste path-segment normaliseren o.b.v. inboundMap (i18n)
    const segments = pathname.split("/").filter(Boolean);

    // root blijft root, maar we willen wel de header meegeven
    if (segments.length === 0) {
        return NextResponse.next({ request: { headers: requestHeaders } });
    }

    const first = segments[0]?.toLowerCase();
    const canonFirst = inboundMap[locale]?.[first];

    // Geen vertaalde slug → niets doen (maar wel tenant header doorgeven)
    if (!canonFirst) {
        return NextResponse.next({ request: { headers: requestHeaders } });
    }

    // Rewrite naar canoniek pad
    segments[0] = canonFirst;
    const url = req.nextUrl.clone();
    url.pathname = "/" + segments.join("/");
    url.search = search;

    // Belangrijk: óók bij rewrite de request headers meegeven
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
}

// Houd alles zonder extensie binnen de middleware
export const config = { matcher: ["/((?!.*\\.).*)"] };