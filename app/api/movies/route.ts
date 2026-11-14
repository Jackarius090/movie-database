import { NextResponse } from "next/server";
import { Client } from "pg";
import { moviesSchema } from "@/lib/schemas/movie";

export async function GET() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    const result = await client.query(
      "SELECT title, genre, rating, year, director_and_stars, runtime FROM movies LIMIT 10",
    );
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
