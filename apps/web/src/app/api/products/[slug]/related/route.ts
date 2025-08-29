import { NextResponse } from "next/server";
import { relatedFor } from "@/app/mock/data/products";

export function GET(_: Request, { params }: { params: { slug: string } }) {
    return NextResponse.json(relatedFor(params.slug));
}