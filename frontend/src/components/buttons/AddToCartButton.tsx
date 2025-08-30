"use client";

import {useTranslations} from 'next-intl';
import Link from "next/link";

export default function AddToCartButton() {
    const t = useTranslations("product");

    return (
        <Link className="mt-4 w-full rounded-md block text-center bg-gray-900 px-4 py-2 text-white hover:bg-gray-800" href="/cart">
            {t("addToCart")}
        </Link>
    );
}