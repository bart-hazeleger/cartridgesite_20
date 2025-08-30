import Image from 'next/image'
import { Link } from '@/navigation';
import AddToCartButton from "@/components/AddToCartButton";

export default function StorefrontPage() {
    const featuredProducts = [
        {id: 1, name: 'Classic T-Shirt', price: 29.99, image: '/images/placeholder.jpg'},
        {id: 2, name: 'Denim Jeans', price: 89.99, image: '/images/placeholder.jpg'},
        {id: 3, name: 'Leather Jacket', price: 199.99, image: '/images/placeholder.jpg'},
        {id: 4, name: 'Sneakers', price: 119.99, image: '/images/placeholder.jpg'},
    ]

    const categories = [
        {id: 1, name: 'Men', slug: 'men'},
        {id: 2, name: 'Women', slug: 'women'},
        {id: 3, name: 'Accessories', slug: 'accessories'},
        {id: 4, name: 'Sale', slug: 'sale'},
    ]

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[600px] w-full">
                <div className="absolute inset-0 bg-gray-900/60">
                    <div
                        className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
                        <h1 className="mb-4 text-5xl font-bold">Summer Collection 2025</h1>
                        <p className="mb-8 text-xl">Discover the latest trends in fashion</p>
                        <Link
                            href="/"
                            className="rounded-md bg-white px-8 py-3 text-lg font-semibold text-gray-900 hover:bg-gray-100"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="mb-8 text-center text-3xl font-bold">Featured Products</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="rounded-lg border p-4 shadow-sm">
                                <div className="relative mb-4 aspect-square w-full">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="rounded-md object-cover"
                                    />
                                </div>
                                <h3 className="mb-2 font-semibold">{product.name}</h3>
                                <p className="text-lg font-bold text-gray-900">${product.price}</p>
                                    <AddToCartButton />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="mb-8 text-center text-3xl font-bold">Shop by Category</h2>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href="#"
                                className="flex h-40 items-center justify-center rounded-lg bg-white p-6 text-center text-xl font-semibold shadow-sm transition hover:shadow-md"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                    <div className="mt-8 flex justify-center">
                        <Link href="/products" className="bg-primary text-white py-4 px-6 font-bold rounded-sm">Bekijk alle producten</Link>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-4 text-3xl font-bold">Subscribe to Our Newsletter</h2>
                    <p className="mb-8 text-gray-600">Get the latest updates and exclusive offers</p>
                    <div className="mx-auto max-w-md">
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 rounded-l-md border px-4 py-2 focus:border-gray-900 focus:outline-none"
                            />
                            <button className="rounded-r-md bg-gray-900 px-6 py-2 text-white hover:bg-gray-800">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}