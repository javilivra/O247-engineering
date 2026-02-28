import { notFound } from 'next/navigation';
import { US_ATTRACTIONS } from '@/data/us-data';
import { IOA_ATTRACTIONS } from '@/data/ioa-data';
import { EPIC_ATTRACTIONS } from '@/data/epic-data';
import { VOLCANO_ATTRACTIONS } from '@/data/volcano-data';
import { adaptParkItems } from '@/lib/parkItemAdapter';
import type { Attraction } from '@/data/types';
import AttractionPageClient from '@/app/disney/[parks]/[slug]/AttractionPageClient';

const ALL_ATTRACTIONS: Attraction[] = [
  ...adaptParkItems(US_ATTRACTIONS, 'us', 'universal-orlando'),
  ...adaptParkItems(IOA_ATTRACTIONS, 'ioa', 'universal-orlando'),
  ...adaptParkItems(EPIC_ATTRACTIONS, 'epic', 'universal-orlando'),
  ...adaptParkItems(VOLCANO_ATTRACTIONS, 'volcano', 'universal-orlando'),
];

export async function generateStaticParams() {
  return ALL_ATTRACTIONS.map((a) => ({
    parks: a.park,
    slug: a.slug,
  }));
}

export default async function UniversalAttractionPage({
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
