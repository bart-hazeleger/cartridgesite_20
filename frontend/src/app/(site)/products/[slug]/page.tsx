import Image from 'next/image'
import {notFound} from 'next/navigation'

interface Product {
    id: string
    name: string
    description: string
    price: number
    image: string
}

const dummyProduct: Product = {
    id: '1',
    name: 'Premium Headphones',
    description: 'High-quality wireless headphones with noise cancellation features.',
    price: 299.99,
    image: '/images/headphones-placeholder.jpg',
}

export default function ProductPage({params}: { params: { slug: string } }) {
    if (!dummyProduct) {
        notFound()
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
                <div className="relative aspect-square">
                    <Image
                        src={dummyProduct.image}
                        alt={dummyProduct.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{dummyProduct.name}</h1>
                        <p className="mt-4 text-xl font-semibold">
                            ${dummyProduct.price.toFixed(2)}
                        </p>
                        <div className="mt-4 text-gray-600">
                            <p>{dummyProduct.description}</p>
                        </div>
                    </div>
                    <button
                        className="mt-8 w-full rounded-md bg-black px-6 py-3 text-white transition-colors hover:bg-gray-800"
                        onClick={() => {
                            // Add to cart functionality will be implemented later
                            console.log('Adding to cart:', dummyProduct.id)
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}