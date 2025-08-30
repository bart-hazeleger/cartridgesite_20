export function apiUrl() {
    if (process.env.API_URL) return process.env.API_URL;
    throw new Error("API_URL is not set");
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
    const base = apiUrl();
    const url = path.startsWith("http") ? path : `${base}${path}`;

    const res = await fetch(url, {
        ...init,
        headers: { ...(init?.headers || {}), accept: "application/json" },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return res.json() as Promise<T>;
}