'use client';

import React from 'react';
import Image from 'next/image';
import { Link } from '@/navigation';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

const dummyCartItems: CartItem[] = [
    {
        id: '1',
        name: 'Product 1',
        price: 29.99,
        quantity: 2,
        image: '/dummy-product-1.jpg',
    },
    {
        id: '2',
        name: 'Product 2',
        price: 39.99,
        quantity: 1,
        image: '/dummy-product-2.jpg',
    },
];

export default function CartPage() {
    const [cartItems, setCartItems] = React.useState<CartItem[]>(dummyCartItems);

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCartItems(items =>
            items.map(item =>
                item.id === id ? {...item, quantity: newQuantity} : item
            )
        );
    };

    const removeItem = (id: string) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
            ) : (
                <>
                    <div className="mb-8">
                        {cartItems.map(item => (
                            <div
                                key={item.id}
                                className="mb-4 flex items-center gap-4 rounded-lg border p-4"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={80}
                                    height={80}
                                    className="rounded-md"
                                />
                                <div className="flex-grow">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="rounded-full bg-gray-200 px-3 py-1"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="rounded-full bg-gray-200 px-3 py-1"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between border-t pt-4">
                        <div>
                            <p className="text-xl font-semibold">Total:</p>
                            <p className="text-2xl font-bold">${total.toFixed(2)}</p>
                        </div>
                        <Link
                            href="/checkout"
                            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}