import { apiGet } from "@/lib/api";
import { Product } from "@/lib/types";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

export const dynamic = "force-dynamic"; // SSR

async function getProduct(slug: string) {
    return apiGet<Product>(`/api/products/${slug}`, { cache: "no-store" });
}
async function getRelated(slug: string) {
    return apiGet<Product[]>(`/api/products/${slug}/related`, { next: { revalidate: 600 } });
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
    const [product, related] = await Promise.all([getProduct(params.slug), getRelated(params.slug)]);

    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-7"><div className="aspect-square bg-gray-100 rounded" /></div>
            <div className="col-span-5">
                <h1 className="text-2xl font-semibold">{product.title}</h1>
                <div className="text-lg font-bold my-2">€ {(product.price/100).toFixed(2)}</div>
                <AddToCartButton sku={product.slug} title={product.title} price={product.price} imageUrl={product.imageUrl} />
            </div>

            <div className="col-span-12">
                <h2 className="text-lg font-semibold mb-2">Gerelateerd</h2>
                <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {related.map(p => (
                        <li key={p.id} className="border rounded p-3 bg-white">
                            <Link href={`/product/${p.slug}`}>{p.title}</Link>
                            <div className="text-sm">€ {(p.price/100).toFixed(2)}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}