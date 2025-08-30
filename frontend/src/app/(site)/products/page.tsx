'use client';

import {useState} from 'react';
import { Link } from '@/navigation';
import Image from 'next/image';
import AddToCartButton from "@/components/buttons/AddToCartButton";

interface Product {
    id: number;
    slug: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

const dummyProducts: Product[] = [
    {
        id: 1,
        slug: "classic-white-t-shirt",
        name: "Classic White T-Shirt",
        price: 29.99,
        description: "A comfortable cotton t-shirt",
        image: "/images/placeholder.jpg"
    },
    {
        id: 2,
        slug: "blue-denim-jeans",
        name: "Blue Denim Jeans",
        price: 79.99,
        description: "Classic fit denim jeans",
        image: "/images/placeholder.jpg"
    },
    {
        id: 3,
        slug: "leather-sneakers",
        name: "Leather Sneakers",
        price: 129.99,
        description: "Casual leather sneakers",
        image: "/images/placeholder.jpg"
    },
    {
        id: 4,
        slug: "cotton-hoodie",
        name: "Cotton Hoodie",
        price: 59.99,
        description: "Warm and cozy hoodie",
        image: "/images/placeholder.jpg"
    }
];

export default function ProductsPage() {
    const [loading, setLoading] = useState(false);

    const handleAddToCart = async (productId: number) => {
        setLoading(true);
        // Add to cart logic would go here
        setTimeout(() => setLoading(false), 500);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Our Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dummyProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg overflow-hidden shadow-md">
                        <div className="relative h-48">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                            <p className="text-gray-600 mb-2">{product.description}</p>
                            <p className="text-lg font-bold mb-4">${product.price.toFixed(2)}</p>
                           <AddToCartButton/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
