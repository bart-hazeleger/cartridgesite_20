// app/(site)/products/[slug]/page.tsx
import {notFound} from 'next/navigation';

type Props = {
    params: Promise<{slug: string}>;
};

export default async function ProductDetailPage({params}: Props) {
    const {slug} = await params;

    const res = await fetch(`${process.env.API_URL}/products/${slug}`, {cache: 'no-store'});
    if (!res.ok) return notFound();
    const product = await res.json();

    return (
        <main className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="mb-4">{product.description}</p>
            <p className="text-lg font-semibold">€ {product.price}</p>
        </main>
    );
}