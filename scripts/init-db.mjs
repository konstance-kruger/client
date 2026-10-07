import { mkdir } from "node:fs/promises";
import { Database } from "bun:sqlite";

const dbPath = "./data/clients.db";

await mkdir("./data", { recursive: true });

const db = new Database(dbPath, {
  create: true
});

db.run(`
  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    address TEXT,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL
  )
`);

db.close();

console.log(`Base SQLite initialisée : ${dbPath}`);