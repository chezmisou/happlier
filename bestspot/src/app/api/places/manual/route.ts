import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { manualPlaceSchema } from '@/lib/validators';

const DEFAULT_USER_ID = 'default-user';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  const parsed = manualPlaceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid body', issues: parsed.error.issues }, { status: 400 });
  }
  const data = parsed.data;

  if (data.googlePlaceId) {
    const existing = await prisma.place.findUnique({ where: { googlePlaceId: data.googlePlaceId } });
    if (existing) {
      return NextResponse.json({ place: existing, duplicate: true });
    }
  }

  const place = await prisma.place.create({
    data: {
      userId: DEFAULT_USER_ID,
      name: data.name,
      formattedAddress: data.formattedAddress ?? null,
      latitude: data.latitude,
      longitude: data.longitude,
      placeType: data.placeType,
      sourceType: data.sourceType ?? 'manual',
      sourceUrl: data.sourceUrl ?? '',
      rating: data.rating ?? null,
      userRatingsTotal: data.userRatingsTotal ?? null,
      googlePlaceId: data.googlePlaceId ?? null,
      googleMapsUrl: data.googleMapsUrl ?? null,
      websiteUrl: data.websiteUrl ?? null,
      photoUrl: data.photoUrl ?? null,
      reviewExcerpt: data.reviewExcerpt ?? null,
      sentiment: data.sentiment ?? null,
      notes: data.notes ?? null,
    },
  });
  return NextResponse.json({ place }, { status: 201 });
}
