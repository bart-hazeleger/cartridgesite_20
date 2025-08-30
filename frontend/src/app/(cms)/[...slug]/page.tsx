// src/app/(cms)/[...slug]/page.tsx
import {notFound} from 'next/navigation';

export default async function CmsPage({
                                          params,
                                      }: { params: Promise<{slug?: string[]}> }) {
    const { slug = [] } = await params;
    if (slug.length === 0) return notFound();  // ← blokkeer root
    return <main>CMS: {slug.join('/')}</main>;
}