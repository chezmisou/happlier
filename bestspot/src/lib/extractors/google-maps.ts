import { getPlaceById, searchPlaceByText } from '../google-places';
import { mapTypesToPlaceType } from './place-type';
import type { ResolvedPlace } from '../types';
import type { ExtractionResult } from './index';

const SHORT_HOSTS = ['maps.app.goo.gl', 'goo.gl', 'maps.goo.gl'];

export function isGoogleMapsUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return (
      SHORT_HOSTS.includes(u.hostname) ||
      u.hostname.endsWith('google.com') ||
      u.hostname.endsWith('google.fr') ||
      u.hostname === 'maps.google.com'
    );
  } catch {
    return false;
  }
}

async function followRedirects(url: string, maxHops = 5): Promise<string> {
  let current = url;
  for (let i = 0; i < maxHops; i++) {
    const res = await fetch(current, {
      method: 'GET',
      redirect: 'manual',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; bestspot/1.0)' },
    });
    const loc = res.headers.get('location');
    if (res.status >= 300 && res.status < 400 && loc) {
      current = new URL(loc, current).toString();
      continue;
    }
    return current;
  }
  return current;
}

function parsePlaceIdFromUrl(url: string): string | null {
  // Common patterns: ?placeid=PLACE_ID, ?q=place_id:PLACE_ID, /place/.../data=...!1s<id>
  const u = new URL(url);
  const placeId = u.searchParams.get('placeid');
  if (placeId) return placeId;
  const q = u.searchParams.get('q') ?? '';
  const m1 = q.match(/place_id:([^&\s]+)/);
  if (m1) return m1[1];
  const ftid = u.searchParams.get('ftid');
  if (ftid) return ftid;
  return null;
}

function parseCoordsFromUrl(url: string): { lat: number; lng: number } | null {
  // /@lat,lng,zoom or !3d<lat>!4d<lng>
  const at = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (at) return { lat: parseFloat(at[1]), lng: parseFloat(at[2]) };
  const data = url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
  if (data) return { lat: parseFloat(data[1]), lng: parseFloat(data[2]) };
  return null;
}

function parseNameFromUrl(url: string): string | null {
  // /maps/place/<NAME>/...
  const m = url.match(/\/maps\/place\/([^\/]+)/);
  if (!m) return null;
  try {
    return decodeURIComponent(m[1]).replace(/\+/g, ' ');
  } catch {
    return null;
  }
}

export async function extractFromGoogleMaps(url: string): Promise<ExtractionResult> {
  const longUrl = await followRedirects(url);

  // 1. Try direct place_id from URL.
  const placeId = parsePlaceIdFromUrl(longUrl);
  if (placeId) {
    const details = await getPlaceById(placeId);
    if (details) return { ok: true, place: toResolved(details, url) };
  }

  // 2. Try name-based search (with optional coords as a hint).
  const name = parseNameFromUrl(longUrl);
  const coords = parseCoordsFromUrl(longUrl);
  if (name) {
    const query = coords ? `${name} near ${coords.lat},${coords.lng}` : name;
    const details = await searchPlaceByText(query);
    if (details) return { ok: true, place: toResolved(details, url) };
  }

  // 3. Last resort: coords only — no rich data, return partial for manual form.
  if (coords) {
    return {
      ok: false,
      reason: 'Could not resolve a place from the link. Please complete it manually.',
      partial: {
        sourceUrl: url,
        sourceType: 'google_maps',
        latitude: coords.lat,
        longitude: coords.lng,
        name: name ?? '',
      },
    };
  }

  return {
    ok: false,
    reason: 'Could not parse the Google Maps link.',
    partial: { sourceUrl: url, sourceType: 'google_maps' },
  };
}

function toResolved(details: Awaited<ReturnType<typeof getPlaceById>>, sourceUrl: string): ResolvedPlace {
  if (!details) throw new Error('No details');
  return {
    googlePlaceId: details.googlePlaceId,
    name: details.name,
    formattedAddress: details.formattedAddress,
    latitude: details.latitude,
    longitude: details.longitude,
    rating: details.rating,
    userRatingsTotal: details.userRatingsTotal,
    googleMapsUrl: details.googleMapsUrl,
    websiteUrl: details.websiteUrl,
    photoUrl: details.photoUrl,
    placeType: mapTypesToPlaceType(details.types),
    sourceType: 'google_maps',
    sourceUrl,
    reviewExcerpt: null,
    sentiment: null,
  };
}
