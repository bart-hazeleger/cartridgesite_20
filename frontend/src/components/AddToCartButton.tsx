"use client";

import {useTranslations} from 'next-intl';

export default function AddToCartButton() {
    const t = useTranslations("product");

    return (
        <button className="mt-4 w-full rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-800">
            {t("addToCart")}
        </button>
    );
}