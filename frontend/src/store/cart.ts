"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
    sku: string;          // gebruik voorlopig de product slug als sku
    title: string;
    price: number;        // in cents
    qty: number;
    imageUrl?: string;
};

type CartState = {
    lines: CartLine[];
    add: (line: Omit<CartLine, "qty"> & { qty?: number }) => void;
    remove: (sku: string) => void;
    setQty: (sku: string, qty: number) => void;
    clear: () => void;
    total: () => number;  // som in cents
};

export const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            lines: [],
            add: (line) =>
                set((s) => {
                    const qty = Math.max(1, line.qty ?? 1);
                    const i = s.lines.findIndex((l) => l.sku === line.sku);
                    if (i >= 0) {
                        const copy = [...s.lines];
                        copy[i] = { ...copy[i], qty: copy[i].qty + qty };
                        return { lines: copy };
                    }
                    return { lines: [...s.lines, { ...line, qty }] };
                }),
            remove: (sku) => set((s) => ({ lines: s.lines.filter((l) => l.sku !== sku) })),
            setQty: (sku, qty) =>
                set((s) => ({
                    lines: s.lines.map((l) => (l.sku === sku ? { ...l, qty: Math.max(0, qty) } : l)),
                })),
            clear: () => set({ lines: [] }),
            total: () => get().lines.reduce((sum, l) => sum + l.price * l.qty, 0),
        }),
        { name: "cart-v1" } // key in localStorage
    )
);