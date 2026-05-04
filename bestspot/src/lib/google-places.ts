// Thin wrapper over Google Places API (New). Server-side only.

const PLACES_BASE = 'https://places.googleapis.com/v1';

const PLACE_FIELDS = [
  'id',
  'displayName',
  'formattedAddress',
  'location',
  'rating',
  'userRatingCount',
  'googleMapsUri',
  'websiteUri',
  'photos',
  'types',
  'regularOpeningHours',
].join(',');

export type PlaceDetails = {
  googlePlaceId: string;
  name: string;
  formattedAddress: string | null;
  latitude: number;
  longitude: number;
  rating: number | null;
  userRatingsTotal: number | null;
  googleMapsUrl: string | null;
  websiteUrl: string | null;
  photoUrl: string | null;
  types: string[];
};

function getKey(): string {
  const k = process.env.GOOGLE_PLACES_API_KEY;
  if (!k) throw new Error('GOOGLE_PLACES_API_KEY is not set');
  return k;
}

function photoUrlFromName(photoName: string | undefined): string | null {
  if (!photoName) return null;
  // Photo media endpoint requires the same API key. We expose a server-relative
  // proxy URL so the key is not leaked to the client. Prefix with basePath so
  // the URL works whether served standalone or behind a path-preserving rewrite.
  return `/bestspot/api/photo?name=${encodeURIComponent(photoName)}`;
}

function normalizeDetails(p: any): PlaceDetails {
  return {
    googlePlaceId: p.id,
    name: p.displayName?.text ?? 'Unknown',
    formattedAddress: p.formattedAddress ?? null,
    latitude: p.location?.latitude ?? 0,
    longitude: p.location?.longitude ?? 0,
    rating: typeof p.rating === 'number' ? p.rating : null,
    userRatingsTotal: typeof p.userRatingCount === 'number' ? p.userRatingCount : null,
    googleMapsUrl: p.googleMapsUri ?? null,
    websiteUrl: p.websiteUri ?? null,
    photoUrl: photoUrlFromName(p.photos?.[0]?.name),
    types: p.types ?? [],
  };
}

export async function getPlaceById(placeId: string): Promise<PlaceDetails | null> {
  const res = await fetch(`${PLACES_BASE}/places/${encodeURIComponent(placeId)}`, {
    headers: {
      'X-Goog-Api-Key': getKey(),
      'X-Goog-FieldMask': PLACE_FIELDS,
    },
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data?.id) return null;
  return normalizeDetails(data);
}

export async function searchPlaceByText(query: string): Promise<PlaceDetails | null> {
  const res = await fetch(`${PLACES_BASE}/places:searchText`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': getKey(),
      'X-Goog-FieldMask': `places.${PLACE_FIELDS.split(',').join(',places.')}`,
    },
    body: JSON.stringify({ textQuery: query, maxResultCount: 1 }),
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const data = await res.json();
  const first = data?.places?.[0];
  if (!first?.id) return null;
  return normalizeDetails(first);
}

// For server-side photo proxy.
export function placePhotoMediaUrl(photoName: string, maxWidthPx = 800): string {
  const key = getKey();
  return `${PLACES_BASE}/${photoName}/media?maxWidthPx=${maxWidthPx}&key=${key}`;
}
