import { Product } from "@/lib/types";

export const PRODUCTS: Product[] = [
    { id: 1, slug: "blue-shirt", title: "Blue Shirt", price: 3499, brand: "Acme" },
    { id: 2, slug: "red-shoes",  title: "Red Shoes",  price: 5999, brand: "Runner" },
    { id: 3, slug: "green-hat",  title: "Green Hat",  price: 1999, brand: "Acme" },
    { id: 4, slug: "black-jeans",title: "Black Jeans",price: 7999, brand: "DenimCo" },
];

export function listByCategory(_category: string, page = 1, pageSize = 12) {
    const items = PRODUCTS.slice((page - 1) * pageSize, page * pageSize);
    return { items, page, pageSize, total: PRODUCTS.length };
}

export function findBySlug(slug: string) {
    return PRODUCTS.find(p => p.slug === slug);
}

export function relatedFor(slug: string) {
    return PRODUCTS.filter(p => p.slug !== slug).slice(0, 4);
}