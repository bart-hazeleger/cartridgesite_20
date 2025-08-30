import { NextRequest, NextResponse } from 'next/server';

// Very simple cookie-based cart for demo purposes
type CartItem = { id: number; qty: number };
const CART_COOKIE = 'cart';

function readCart(req: NextRequest): CartItem[] {
    const raw = req.cookies.get(CART_COOKIE)?.value;
    if (!raw) return [];
    try {
        return JSON.parse(raw) as CartItem[];
    } catch {
        return [];
    }
}

function writeCart(items: CartItem[]) {
    const res = NextResponse.json({ items });
    res.cookies.set(CART_COOKIE, JSON.stringify(items), {
        path: '/',
        sameSite: 'lax',
    });
    return res;
}

export async function GET(req: NextRequest) {
    const items = readCart(req);
    return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
    const { id, qty = 1 } = (await req.json()) as { id: number; qty?: number };
    const items = readCart(req);
    const idx = items.findIndex((i) => i.id === id);
    if (idx > -1) items[idx].qty += qty;
    else items.push({ id, qty });
    return writeCart(items);
}

export async function DELETE(req: NextRequest) {
    const { id } = (await req.json()) as { id: number };
    let items = readCart(req);
    items = items.filter((i) => i.id !== id);
    return writeCart(items);
}

// Optional if you need dynamic rendering:
// export const dynamic = 'force-dynamic';