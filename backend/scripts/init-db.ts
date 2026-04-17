import fs from "fs/promises";
import path from "path";
import { closePool, query } from "../src/db.js";

async function loadSql(filePath: string) {
  const fullPath = path.resolve(filePath);
  return fs.readFile(fullPath, "utf8");
}

async function main() {
  const schema = await loadSql("src/schema.sql");
  await query(schema);

  const seed = await loadSql("src/seed.sql");
  await query(seed);

  console.log("Database schema and seed data were applied successfully.");
}

main()
  .catch((error) => {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  })
  .finally(() => closePool());
