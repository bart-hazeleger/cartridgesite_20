"use client";

import { useCart } from "@/store/cart";

type Props = {
    sku: string;
    title: string;
    price: number;     // cents
    imageUrl?: string;
};

export default function AddToCartButton({ sku, title, price, imageUrl }: Props) {
    const add = useCart((s) => s.add);
    return (
        <button
            className="px-4 py-2 border rounded hover:bg-gray-50"
            onClick={() => add({ sku, title, price, imageUrl, qty: 1 })}
        >
            In winkelmand
        </button>
    );
}