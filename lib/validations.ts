import { z } from 'zod';

export const createAppSchema = z.object({
  name: z
    .string()
    .min(3, 'Le nom doit contenir au moins 3 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  slug: z
    .string()
    .min(3, 'Le slug doit contenir au moins 3 caractères')
    .max(60, 'Le slug ne peut pas dépasser 60 caractères')
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Le slug ne peut contenir que des lettres minuscules, chiffres et tirets'),
  description: z
    .string()
    .min(20, 'La description doit contenir au moins 20 caractères')
    .max(1000, 'La description ne peut pas dépasser 1000 caractères'),
  category: z
    .enum(['vitrine', 'portfolio', 'evenement', 'restaurant', 'cv', 'landing', 'autre'])
    .optional(),
  color_primary: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Couleur primaire invalide'),
  color_secondary: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Couleur secondaire invalide'),
});

export const checkSlugSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(60)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
});

export type CreateAppFormData = z.infer<typeof createAppSchema>;
