import { NextResponse } from "next/server";
import { findBySlug } from "@/app/mock/data/products";

export function GET(_: Request, { params }: { params: { slug: string } }) {
    const p = findBySlug(params.slug);
    return p ? NextResponse.json(p) : NextResponse.json({ message: "Not found" }, { status: 404 });
}