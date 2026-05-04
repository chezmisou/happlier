import { extractPlaceFromText } from '../anthropic';
import { searchPlaceByText } from '../google-places';
import type { ExtractionResult } from './index';
import type { ResolvedPlace } from '../types';

export function isInstagramUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.hostname === 'www.instagram.com' || u.hostname === 'instagram.com';
  } catch {
    return false;
  }
}

function decodeHtml(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

async function fetchOgMeta(url: string): Promise<string | null> {
  // Instagram aggressively blocks unauthenticated scraping. We only read the
  // public OG meta tags that are intentionally exposed; if blocked, we bail
  // out gracefully and let the user fall back to the manual form.
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; bestspot/1.0; +https://github.com)',
      },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const html = await res.text();
    const desc = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i);
    const title = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i);
    const parts = [title?.[1], desc?.[1]].filter(Boolean).map(decodeHtml);
    return parts.length ? parts.join('\n\n') : null;
  } catch {
    return null;
  }
}

export async function extractFromInstagram(url: string): Promise<ExtractionResult> {
  const text = await fetchOgMeta(url);
  if (!text) {
    return {
      ok: false,
      reason:
        'Instagram blocked the fetch. Paste the post details into the manual form below.',
      partial: { sourceUrl: url, sourceType: 'instagram' },
    };
  }

  const extracted = await extractPlaceFromText(text);
  if (!extracted.placeName) {
    return {
      ok: false,
      reason: 'Claude could not identify a place in this Instagram post.',
      partial: {
        sourceUrl: url,
        sourceType: 'instagram',
        placeType: extracted.placeType,
        reviewExcerpt: extracted.reviewExcerpt,
        sentiment: extracted.sentiment,
      },
    };
  }

  const query = [extracted.placeName, extracted.addressHints, extracted.city, extracted.country]
    .filter(Boolean)
    .join(' ');
  const details = await searchPlaceByText(query);
  if (!details) {
    return {
      ok: false,
      reason: `Found "${extracted.placeName}" but Google Places could not locate it.`,
      partial: {
        name: extracted.placeName,
        sourceUrl: url,
        sourceType: 'instagram',
        placeType: extracted.placeType,
        reviewExcerpt: extracted.reviewExcerpt,
        sentiment: extracted.sentiment,
      },
    };
  }

  const resolved: ResolvedPlace = {
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
    placeType: extracted.placeType,
    sourceType: 'instagram',
    sourceUrl: url,
    reviewExcerpt: extracted.reviewExcerpt,
    sentiment: extracted.sentiment,
  };
  return { ok: true, place: resolved };
}
