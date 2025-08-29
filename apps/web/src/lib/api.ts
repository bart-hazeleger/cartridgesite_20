// Tijdens de spike gebruiken we interne Next.js API routes (mock).
// Later kun je API_BASE naar process.env.NEXT_PUBLIC_API_BASE laten wijzen.
const API_BASE = "";

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
        ...init,
        headers: { ...(init?.headers || {}), "accept": "application/json" },
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json() as Promise<T>;
}