import { NextResponse } from "next/server";
import { Client } from "pg";
import {
  moviesSchema,
  movieYearQuerySchema,
} from "@/lib/schemas/movie";

export async function GET(request: Request) {
  const yearParam = new URL(request.url).searchParams.get("year");
  const parsedYear =
    yearParam === null ? undefined : movieYearQuerySchema.safeParse(yearParam);

  if (parsedYear && !parsedYear.success) {
    return NextResponse.json({ error: "Invalid year" }, { status: 400 });
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    const query =
      parsedYear === undefined
        ? "SELECT title, genre, rating, year, director_and_stars, runtime FROM movies LIMIT 100"
        : "SELECT title, genre, rating, year, director_and_stars, runtime FROM movies WHERE year = $1 LIMIT 100";
    const values = parsedYear ? [parsedYear.data] : [];
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
