export const PLACE_TYPES = [
  'restaurant',
  'bar',
  'cafe',
  'activity',
  'hotel',
  'shop',
  'other',
] as const;
export type PlaceType = (typeof PLACE_TYPES)[number];

export const SOURCE_TYPES = ['tiktok', 'instagram', 'google_maps', 'manual'] as const;
export type SourceType = (typeof SOURCE_TYPES)[number];

export const SENTIMENTS = ['positive', 'neutral', 'negative'] as const;
export type Sentiment = (typeof SENTIMENTS)[number];

export type ExtractedPlaceInfo = {
  placeName: string | null;
  city: string | null;
  country: string | null;
  addressHints: string | null;
  placeType: PlaceType;
  sentiment: Sentiment;
  reviewExcerpt: string | null;
};

export type ResolvedPlace = {
  googlePlaceId: string | null;
  name: string;
  formattedAddress: string | null;
  latitude: number;
  longitude: number;
  rating: number | null;
  userRatingsTotal: number | null;
  googleMapsUrl: string | null;
  websiteUrl: string | null;
  photoUrl: string | null;
  placeType: PlaceType;
  sourceType: SourceType;
  sourceUrl: string;
  reviewExcerpt: string | null;
  sentiment: Sentiment | null;
};
