// src/app/(cms)/[...slug]/page.tsx
import {notFound} from 'next/navigation';

export default async function CmsPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
    if ((params.slug ?? []).length === 0) notFound();
  return <main>...</main>;
}