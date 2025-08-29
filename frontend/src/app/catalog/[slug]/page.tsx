import { apiGet } from "@/lib/api";
import { Paged, Product } from "@/lib/types";
import Link from "next/link";

export const revalidate = 600; // ISR 10 min

type Props = { params: { slug: string }, searchParams: Record<string, string | string[] | undefined> };

export default async function CatalogPage({ params, searchParams }: Props) {
    const page = (searchParams.page as string) ?? "1";
    const qs = new URLSearchParams({ category: params.slug, page }).toString();
    const data = await apiGet<Paged<Product>>(`/api/products?${qs}`, { next: { revalidate: 600 } });

    return (
        <div className="grid grid-cols-12 gap-6">
            <aside className="col-span-3">
                <div className="text-sm text-gray-600">Filters (dummy)</div>
            </aside>
            <section className="col-span-9">
                <h1 className="text-xl font-semibold mb-3">Categorie: {params.slug}</h1>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {data.items.map(p => (
                        <li key={p.id} className="border rounded bg-white p-3">
                            <Link href={`/product/${p.slug}`} className="block">
                                <div className="aspect-square bg-gray-100 mb-2" />
                                <div className="text-sm">{p.title}</div>
                                <div className="font-semibold mt-1">€ {(p.price/100).toFixed(2)}</div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}