import { NextResponse } from "next/server";
import { Client } from "pg";
import { movieFiltersQuerySchema, moviesSchema } from "@/lib/schemas/movie";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const parsedFilters = movieFiltersQuerySchema.safeParse(
    Object.fromEntries(searchParams.entries()),
  );

  if (!parsedFilters.success) {
    return NextResponse.json({ error: "Invalid movie filters" }, { status: 400 });
  }

  const filters = parsedFilters.data;
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    const conditions: string[] = [];
    const values: (string | number)[] = [];

    if (filters.title !== undefined) {
      values.push(`%${filters.title}%`);
      conditions.push(`title ILIKE $${values.length}`);
    }

    if (filters.year !== undefined) {
      values.push(filters.year);
      conditions.push(`year = $${values.length}`);
    }

    if (filters.actor !== undefined) {
      values.push(`%${filters.actor}%`);
      conditions.push(`director_and_stars ILIKE $${values.length}`);
    }

    if (filters.genre !== undefined) {
      values.push(`%${filters.genre}%`);
      conditions.push(`genre ILIKE $${values.length}`);
    }

    if (filters.minRating !== undefined) {
      values.push(filters.minRating);
      conditions.push(`rating::numeric >= $${values.length}`);
    }

    const whereClause =
      conditions.length > 0 ? ` WHERE ${conditions.join(" AND ")}` : "";
    const query = `SELECT title, genre, rating, year, director_and_stars, runtime FROM movies${whereClause} LIMIT 100`;
    const result = await client.query(query, values);
    const rows = result.rows;

    if (!rows) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    const parsedMovies = moviesSchema.safeParse(rows);

    if (!parsedMovies.success) {
      console.error(
        "Invalid movie rows returned from database:",
        parsedMovies.error.issues,
      );
      return NextResponse.json(
        { error: "Unable to fetch movies" },
        { status: 500 },
      );
    }

    return NextResponse.json(parsedMovies.data);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return NextResponse.json(
      { error: "Unable to fetch movies" },
      { status: 500 },
    );
  } finally {
    await client.end().catch((error) => {
      console.error("Failed to close database connection:", error);
    });
  }
}
