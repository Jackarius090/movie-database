import { z } from "zod";

export const movieSchema = z.object({
  title: z.string().nullable(),
  genre: z.string().nullable(),
  rating: z.union([z.number(), z.string()]).nullable(),
  year: z.number().nullable(),
  director_and_stars: z.string().nullable(),
  runtime: z
    .union([z.number(), z.string().regex(/^\d+$/).transform(Number)])
    .pipe(z.number())
    .nullable(),
});

export type Movies = z.infer<typeof moviesSchema>;

export const moviesSchema = z.array(movieSchema);

const movieYearQuerySchema = z
  .string()
  .regex(/^\d{4}$/)
  .transform(Number)
  .pipe(z.number().int().min(1888).max(new Date().getFullYear()));

const movieRatingQuerySchema = z
  .string()
  .regex(/^\d+(\.\d+)?$/)
  .transform(Number)
  .pipe(z.number().min(0).max(10));

export const movieFiltersQuerySchema = z.object({
  title: z.string().trim().min(1).optional(),
  year: movieYearQuerySchema.optional(),
  actor: z.string().trim().min(1).optional(),
  genre: z.string().trim().min(1).optional(),
  minRating: movieRatingQuerySchema.optional(),
});

export type MovieFilters = z.infer<typeof movieFiltersQuerySchema>;
