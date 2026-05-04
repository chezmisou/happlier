import type { ResolvedPlace } from '../types';
import { extractFromGoogleMaps, isGoogleMapsUrl } from './google-maps';
import { extractFromTikTok, isTikTokUrl } from './tiktok';
import { extractFromInstagram, isInstagramUrl } from './instagram';

export type ExtractionResult =
  | { ok: true; place: ResolvedPlace }
  | { ok: false; reason: string; partial?: Partial<ResolvedPlace> & { sourceUrl: string; sourceType: string } };

export async function extractFromUrl(url: string): Promise<ExtractionResult> {
  const trimmed = url.trim();
  try {
    if (isGoogleMapsUrl(trimmed)) return await extractFromGoogleMaps(trimmed);
    if (isTikTokUrl(trimmed)) return await extractFromTikTok(trimmed);
    if (isInstagramUrl(trimmed)) return await extractFromInstagram(trimmed);
  } catch (err) {
    return {
      ok: false,
      reason: err instanceof Error ? err.message : 'Extraction failed',
      partial: { sourceUrl: trimmed, sourceType: 'manual' },
    };
  }
  return {
    ok: false,
    reason: 'Unsupported URL. Use a Google Maps, TikTok, or Instagram link.',
    partial: { sourceUrl: trimmed, sourceType: 'manual' },
  };
}
