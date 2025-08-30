import { NextResponse } from "next/server";

// Dummy product data — vervang dit later door DB/extern systeem
// Tip: price in centen bewaren voorkomt afrondingsfouten
const products = [
    {
        id: 1,
        name: "HP 302XL Black Ink Cartridge",
        price: 2495, // €24,95
        currency: "EUR",
        stock: 12,
        image: "/images/hp302xl-black.jpg",
    },
    {
        id: 2,
        name: "HP 302XL Tri-Color Ink Cartridge",
        price: 2695,
        currency: "EUR",
        stock: 7,
        image: "/images/hp302xl-color.jpg",
    },
    {
        id: 3,
        name: "Canon PG-545XL Black Cartridge",
        price: 2195,
        currency: "EUR",
        stock: 5,
        image: "/images/canon545xl-black.jpg",
    },
];

// GET → lijst van producten
export async function GET() {
    return NextResponse.json({ products });
}

// Je zou ook POST/PUT/DELETE kunnen toevoegen als je
// adminbeheer of voorraadupdates nodig hebt.
// Voor nu alleen GET om producten op te halen.

// Optioneel dynamisch maken (Vercel, SSR caches)
// export const dynamic = "force-dynamic";