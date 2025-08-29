import { NextResponse } from "next/server";
import { listByCategory } from "@/app/mock/data/products";

export function GET(req: Request) {
    const url = new URL(req.url);
    const category = url.searchParams.get("category") ?? "all";
    const page = Number(url.searchParams.get("page") ?? "1");
    const pageSize = Number(url.searchParams.get("pageSize") ?? "12");
    const data = listByCategory(category, page, pageSize);
    return NextResponse.json(data);
}