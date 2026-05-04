import { z } from 'zod';
import { PLACE_TYPES, SENTIMENTS, SOURCE_TYPES } from './types';

export const addLinkSchema = z.object({
  url: z.string().url(),
});

export const manualPlaceSchema = z.object({
  name: z.string().min(1).max(200),
  formattedAddress: z.string().max(500).nullable().optional(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  placeType: z.enum(PLACE_TYPES),
  sourceType: z.enum(SOURCE_TYPES).default('manual'),
  sourceUrl: z.string().url().or(z.literal('')).optional(),
  rating: z.number().min(0).max(5).nullable().optional(),
  userRatingsTotal: z.number().int().min(0).nullable().optional(),
  googlePlaceId: z.string().nullable().optional(),
  googleMapsUrl: z.string().url().nullable().optional(),
  websiteUrl: z.string().url().nullable().optional(),
  photoUrl: z.string().url().nullable().optional(),
  reviewExcerpt: z.string().max(280).nullable().optional(),
  sentiment: z.enum(SENTIMENTS).nullable().optional(),
  notes: z.string().max(2000).nullable().optional(),
});

export const updatePlaceSchema = manualPlaceSchema.partial();

export const listPlacesQuerySchema = z.object({
  type: z.enum(PLACE_TYPES).optional(),
  source: z.enum(SOURCE_TYPES).optional(),
  search: z.string().max(120).optional(),
  sort: z.enum(['createdAt', 'name', 'rating']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
});

export const extractedSchema = z.object({
  placeName: z.string().nullable(),
  city: z.string().nullable(),
  country: z.string().nullable(),
  addressHints: z.string().nullable(),
  placeType: z.enum(PLACE_TYPES),
  sentiment: z.enum(SENTIMENTS),
  reviewExcerpt: z.string().max(120).nullable(),
});
