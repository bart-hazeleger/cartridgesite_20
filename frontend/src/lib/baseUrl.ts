export function siteUrl() {
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
    return "http://localhost:3000"; // fallback
}