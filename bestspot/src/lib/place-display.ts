import type { PlaceType, SourceType } from './types';

export const PLACE_TYPE_LABELS: Record<PlaceType, string> = {
  restaurant: 'Restaurant',
  bar: 'Bar',
  cafe: 'Café',
  activity: 'Activity',
  hotel: 'Hotel',
  shop: 'Shop',
  other: 'Other',
};

export const PLACE_TYPE_COLORS: Record<PlaceType, string> = {
  restaurant: '#ef4444', // red
  bar: '#eab308',        // yellow
  cafe: '#92400e',       // brown
  activity: '#22c55e',   // green
  hotel: '#3b82f6',      // blue
  shop: '#a855f7',       // purple
  other: '#9ca3af',      // gray
};

export const SOURCE_LABELS: Record<SourceType, string> = {
  tiktok: 'TikTok',
  instagram: 'Instagram',
  google_maps: 'Google Maps',
  manual: 'Manual',
};
