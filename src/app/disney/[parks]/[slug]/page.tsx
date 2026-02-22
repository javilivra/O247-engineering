// src/app/disney/[parks]/[slug]/page.tsx
// SERVER COMPONENT — Sin "use client"

import { notFound } from 'next/navigation';
import { MK_ATTRACTIONS } from '@/data/mk-attractions-data';
import type { Attraction } from '@/data/types';
import AttractionPageClient from './AttractionPageClient';

const ALL_ATTRACTIONS: Attraction[] = [
  ...MK_ATTRACTIONS,
];

export async function generateStaticParams() {
  return ALL_ATTRACTIONS.map((attraction) => ({
    parks: attraction.park,
    slug: attraction.slug,
  }));
}

export default async function AttractionPage({
  params,
}: {
  params: Promise<{ parks: string; slug: string }>;
}) {
  const { parks, slug } = await params;

  const attraction = ALL_ATTRACTIONS.find(
    (a) => a.park === parks && a.slug === slug
  );

  if (!attraction) notFound();

  return <AttractionPageClient attraction={attraction} />;
}