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

export type Movie = z.infer<typeof movieSchema>;
