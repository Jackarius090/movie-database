import "dotenv/config";
import XLSX from "xlsx";
import pg from "pg";

const { Client } = pg;

async function main() {
  const workbook = XLSX.readFile("./data/movies-data.xlsx");
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const rows = XLSX.utils.sheet_to_json(sheet);

  console.log(`Found ${rows.length} movies`);

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();

  // Number of movies inserted per SQL query
  const BATCH_SIZE = 1000;

  try {
    await client.query("BEGIN");

    for (let i = 0; i < rows.length; i += BATCH_SIZE) {
      const batch = rows.slice(i, i + BATCH_SIZE);

      const values = [];
      const placeholders = [];

      batch.forEach((row, index) => {
        // Extract the first 4-digit number (e.g., "VI 2015" -> 2015)
        const parsedYear = row.Year
          ? parseInt(String(row.Year).match(/\d{4}/)?.[0], 10) || null
          : null;

        // Strip non-digits from runtime
        // e.g. "120 min" -> 120
        const parsedRuntime = row.Lengh
          ? parseInt(String(row.Lengh).replace(/\D/g, ""), 10) || null
          : null;

        const offset = index * 6;

        placeholders.push(
          `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6})`,
        );

        values.push(
          row.Title ?? null,
          row.Genre ?? null,
          row.Rate ?? null,
          parsedYear,
          row.Dir_And_Stars ?? null,
          parsedRuntime,
        );
      });

      await client.query(
        `
          INSERT INTO movies
            (title, genre, rating, year, director_and_stars, runtime)
          VALUES
            ${placeholders.join(", ")}
        `,
        values,
      );

      const imported = Math.min(i + batch.length, rows.length);
      const percentage = ((imported / rows.length) * 100).toFixed(1);

      console.log(
        `Imported ${imported}/${rows.length} movies (${percentage}%)`,
      );
    }

    await client.query("COMMIT");

    console.log("Import complete!");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
