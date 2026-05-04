import type { PlaceType, SourceType, Sentiment } from '@/lib/types';

export type Place = {
  id: string;
  userId: string;
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
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};
