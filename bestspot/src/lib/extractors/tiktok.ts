import { extractPlaceFromText } from '../anthropic';
import { searchPlaceByText } from '../google-places';
import type { ExtractionResult } from './index';
import type { ResolvedPlace } from '../types';

export function isTikTokUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.hostname.endsWith('tiktok.com') || u.hostname === 'vm.tiktok.com';
  } catch {
    return false;
  }
}

type Oembed = {
  title?: string;
  author_name?: string;
  author_url?: string;
};

async function fetchOembed(url: string): Promise<Oembed | null> {
  const endpoint = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
  try {
    const res = await fetch(endpoint, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; bestspot/1.0)' },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return (await res.json()) as Oembed;
  } catch {
    return null;
  }
}

async function fetchPageDescription(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; bestspot/1.0)' },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const html = await res.text();
    const ogDesc = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i);
    if (ogDesc) return decodeHtml(ogDesc[1]);
    const ogTitle = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i);
    if (ogTitle) return decodeHtml(ogTitle[1]);
    return null;
  } catch {
    return null;
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

export async function extractFromTikTok(url: string): Promise<ExtractionResult> {
  const oembed = await fetchOembed(url);
  const description = await fetchPageDescription(url);

  const text = [oembed?.title, description].filter(Boolean).join('\n\n').trim();
  if (!text) {
    return {
      ok: false,
      reason: 'Could not read the TikTok post (post may be private or removed).',
      partial: { sourceUrl: url, sourceType: 'tiktok' },
    };
  }

  const extracted = await extractPlaceFromText(text);
  if (!extracted.placeName) {
    return {
      ok: false,
      reason: 'Claude could not identify a place in this post.',
      partial: {
        sourceUrl: url,
        sourceType: 'tiktok',
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
        sourceType: 'tiktok',
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
    sourceType: 'tiktok',
    sourceUrl: url,
    reviewExcerpt: extracted.reviewExcerpt,
    sentiment: extracted.sentiment,
  };
  return { ok: true, place: resolved };
}
