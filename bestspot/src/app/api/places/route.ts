import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { addLinkSchema, listPlacesQuerySchema } from '@/lib/validators';
import { extractFromUrl } from '@/lib/extractors';

const DEFAULT_USER_ID = 'default-user';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const parsed = listPlacesQuerySchema.safeParse({
    type: searchParams.get('type') ?? undefined,
    source: searchParams.get('source') ?? undefined,
    search: searchParams.get('search') ?? undefined,
    sort: searchParams.get('sort') ?? undefined,
    order: searchParams.get('order') ?? undefined,
  });
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid query', issues: parsed.error.issues }, { status: 400 });
  }
  const { type, source, search, sort, order } = parsed.data;

  const places = await prisma.place.findMany({
    where: {
      userId: DEFAULT_USER_ID,
      placeType: type,
      sourceType: source,
      ...(search
        ? {
            OR: [
              { name: { contains: search } },
              { formattedAddress: { contains: search } },
            ],
          }
        : {}),
    },
    orderBy: { [sort]: order },
  });
  return NextResponse.json({ places });
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = addLinkSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid URL', issues: parsed.error.issues }, { status: 400 });
  }

  const result = await extractFromUrl(parsed.data.url);
  if (!result.ok) {
    return NextResponse.json(
      { error: result.reason, partial: result.partial },
      { status: 422 },
    );
  }

  const p = result.place;

  // Duplicate detection by googlePlaceId.
  if (p.googlePlaceId) {
    const existing = await prisma.place.findUnique({ where: { googlePlaceId: p.googlePlaceId } });
    if (existing) {
      return NextResponse.json({ place: existing, duplicate: true }, { status: 200 });
    }
  }

  const place = await prisma.place.create({
    data: {
      userId: DEFAULT_USER_ID,
      googlePlaceId: p.googlePlaceId,
      name: p.name,
      formattedAddress: p.formattedAddress,
      latitude: p.latitude,
      longitude: p.longitude,
      rating: p.rating,
      userRatingsTotal: p.userRatingsTotal,
      googleMapsUrl: p.googleMapsUrl,
      websiteUrl: p.websiteUrl,
      photoUrl: p.photoUrl,
      placeType: p.placeType,
      sourceType: p.sourceType,
      sourceUrl: p.sourceUrl,
      reviewExcerpt: p.reviewExcerpt,
      sentiment: p.sentiment,
    },
  });
  return NextResponse.json({ place }, { status: 201 });
}
