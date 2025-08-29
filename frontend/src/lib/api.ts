import { baseUrl } from "./baseUrl";

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
    const origin = baseUrl();
    const url = path.startsWith("http") ? path : `${origin}${path}`;

    const res = await fetch(url, {
        ...init,
        headers: { ...(init?.headers || {}), accept: "application/json" },
        cache: "no-store", // handig bij server-side fetch
    });

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return res.json() as Promise<T>;
}