import { NextResponse } from "next/server";
import { Client } from "pg";

export async function GET() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();

  const result = await client.query("SELECT * FROM movies LIMIT 1");

  await client.end();

  return NextResponse.json(result.rows[0]);
}
