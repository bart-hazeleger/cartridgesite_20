import { NextRequest, NextResponse } from "next/server";

// ————————————————————————————————————————
// Minimal demo checkout endpoint
// - Valideert items
// - Berekent het totaalbedrag
// - "Maakt" een order en geeft orderId terug
// Vervang dit later door je echte PSP (Mollie/Stripe/etc.)
// ————————————————————————————————————————

type CheckoutItem = {
    id: number;
    qty: number;
    price: number; // price per stuk (in centen of euro's, zie currency)
};

type CheckoutBody = {
    items: CheckoutItem[];
    currency?: "EUR" | "USD";
    meta?: Record<string, unknown>;
};

function badRequest(message: string) {
    return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(req: NextRequest) {
    let body: CheckoutBody | null = null;

    try {
        body = (await req.json()) as CheckoutBody;
    } catch {
        return badRequest("Invalid JSON body");
    }

    if (!body?.items || !Array.isArray(body.items) || body.items.length === 0) {
        return badRequest("`items` must be a non-empty array");
    }

    // Basic validatie
    for (const [i, item] of body.items.entries()) {
        if (
            typeof item.id !== "number" ||
            typeof item.qty !== "number" ||
            typeof item.price !== "number" ||
            item.qty <= 0 ||
            item.price < 0
        ) {
            return badRequest(`Invalid item at index ${i}`);
        }
    }

    const currency = body.currency ?? "EUR";

    // Totaal berekenen (hier in euro’s; zet naar centen als je met PSP koppelt)
    const total = body.items.reduce((sum, it) => sum + it.price * it.qty, 0);

    // Hier zou je:
    // - Voorraad checken
    // - Kortingen/vouchers toepassen
    // - Verzendkosten/btw berekenen
    // - Betaalintentie aanmaken bij PSP
    // Voor nu simuleren we een orderId en eventueel een fake clientSecret.
    const orderId = `ord_${Math.random().toString(36).slice(2, 10)}`;
    const clientSecret = `fake_${Math.random().toString(36).slice(2, 10)}`;

    return NextResponse.json({
        ok: true,
        orderId,
        currency,
        total, // bv. 59.98
        clientSecret, // vervang door echte secret van je PSP
    });
}

// Optioneel: CORS preflight (alleen nodig als je cross-origin callt)
export async function OPTIONS() {
    const res = new NextResponse(null, { status: 204 });
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res;
}

// Optioneel als je route altijd dynamisch moet zijn (bijv. op Vercel)
// export const dynamic = "force-dynamic";