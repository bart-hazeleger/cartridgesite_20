'use client';

import React from 'react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

const dummyCartItems: CartItem[] = [
    {
        id: 1,
        name: "Premium T-Shirt",
        price: 29.99,
        quantity: 2,
        image: "/dummy-tshirt.jpg"
    },
    {
        id: 2,
        name: "Designer Jeans",
        price: 89.99,
        quantity: 1,
        image: "/dummy-jeans.jpg"
    }
];

export default function CheckoutPage() {
    const subtotal = dummyCartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = 5.99;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Cart Summary */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        {dummyCartItems.map((item) => (
                            <div key={item.id} className="flex items-center py-4 border-b">
                                <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
                                <div className="ml-4 flex-grow">
                                    <h3 className="font-medium">{item.name}</h3>
                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                    <p className="text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Customer Information */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        className="w-full p-2 border rounded"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className="w-full p-2 border rounded"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        className="w-full p-2 border rounded"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Postal Code"
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Payment Details */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                            <form className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Card Number"
                                    className="w-full p-2 border rounded"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        className="w-full p-2 border rounded"
                                    />
                                    <input
                                        type="text"
                                        placeholder="CVC"
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Place Order
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}