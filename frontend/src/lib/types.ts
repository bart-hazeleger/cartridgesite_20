export type Product = {
    id: number;
    slug: string;
    title: string;
    price: number;      // cents
    imageUrl?: string;
    brand?: string;
    updatedAt?: string;
};

export type Paged<T> = {
    items: T[];
    page: number;
    pageSize: number;
    total: number;
};