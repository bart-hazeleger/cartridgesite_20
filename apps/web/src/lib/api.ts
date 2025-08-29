function baseUrl() {
    // Eerst kijken of een externe API is ingesteld
    if (process.env.NEXT_PUBLIC_API_BASE) return process.env.NEXT_PUBLIC_API_BASE;

    // Anders fallback naar je eigen site-url
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;

    return "http://localhost:3000"; // laatste redmiddel
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
    const origin = baseUrl();
    const url = path.startsWith("http") ? path : `${origin}${path}`;

    const res = await fetch(url, {
        ...init,
        headers: { ...(init?.headers || {}), accept: "application/json" },
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json() as Promise<T>;
}