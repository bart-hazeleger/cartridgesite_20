"use client";

import { useCart } from "@/store/cart";
import { formatEUR } from "@/lib/format";
import Link from "next/link";

export default function CartPage() {
    const { lines, setQty, remove, clear, total } = useCart();

    if (lines.length === 0) {
        return (
            <div>
                <h1 className="text-xl font-semibold mb-3">Winkelmand</h1>
                <p>Je mandje is leeg. <Link href="/catalog/all" className="underline">Verder shoppen</Link></p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold">Winkelmand</h1>

            <ul className="space-y-3">
                {lines.map((l) => (
                    <li key={l.sku} className="flex items-center justify-between gap-4 border rounded p-3 bg-white">
                        <div className="flex items-center gap-3">
                            <div className="size-14 bg-gray-100 rounded" />
                            <div>
                                <div className="font-medium">{l.title}</div>
                                <div className="text-sm text-gray-600">{l.sku}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="number"
                                min={0}
                                value={l.qty}
                                onChange={(e) => setQty(l.sku, Number(e.target.value))}
                                className="w-16 border rounded px-2 py-1"
                            />
                            <div className="w-24 text-right">{formatEUR(l.price)}</div>
                            <button className="text-sm underline" onClick={() => remove(l.sku)}>Verwijderen</button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex items-center justify-between border-t pt-3">
                <button className="text-sm underline" onClick={clear}>Mandje leegmaken</button>
                <div className="text-lg font-semibold">Totaal: {formatEUR(total())}</div>
            </div>

            <button className="px-4 py-2 border rounded hover:bg-gray-50">Naar checkout (mock)</button>
        </div>
    );
}