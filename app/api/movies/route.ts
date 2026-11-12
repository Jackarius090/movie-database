import { NextResponse } from "next/server";
import { Client } from "pg";
import { movieSchema } from "@/lib/schemas/movie";

export async function GET() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    const result = await client.query(
      "SELECT title, genre, rating, year, director_and_stars, runtime FROM movies LIMIT 1",
    );
    const row = result.rows[0];

    if (!row) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    const parsedMovie = movieSchema.safeParse(row);

    if (!parsedMovie.success) {
      console.error(
        "Invalid movie row returned from database:",
        parsedMovie.error.issues,
      );
      return NextResponse.json(
        { error: "Unable to fetch movie" },
        { status: 500 },
      );
    }

    return NextResponse.json(parsedMovie.data);
  } catch (error) {
    console.error("Failed to fetch movie:", error);
    return NextResponse.json(
      { error: "Unable to fetch movie" },
      { status: 500 },
    );
  } finally {
    await client.end().catch((error) => {
      console.error("Failed to close database connection:", error);
    });
  }
}
