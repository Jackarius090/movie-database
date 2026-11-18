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

export type MovieFilters = {
  year?: number;
};

export const movieYearQuerySchema = z
  .string()
  .regex(/^\d{4}$/)
  .transform(Number)
  .pipe(z.number().int().min(1888).max(new Date().getFullYear()));
