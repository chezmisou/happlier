import type { PlaceType } from '../types';

const TYPE_MAP: Array<[string[], PlaceType]> = [
  [['restaurant', 'meal_takeaway', 'meal_delivery', 'food'], 'restaurant'],
  [['bar', 'night_club', 'liquor_store'], 'bar'],
  [['cafe', 'bakery'], 'cafe'],
  [['lodging', 'hotel'], 'hotel'],
  [['tourist_attraction', 'amusement_park', 'museum', 'park', 'art_gallery', 'aquarium', 'zoo'], 'activity'],
  [['store', 'shopping_mall', 'clothing_store', 'book_store'], 'shop'],
];

export function mapTypesToPlaceType(types: string[] | undefined): PlaceType {
  if (!types || types.length === 0) return 'other';
  const lower = types.map((t) => t.toLowerCase());
  for (const [keys, value] of TYPE_MAP) {
    if (keys.some((k) => lower.includes(k))) return value;
  }
  return 'other';
}
