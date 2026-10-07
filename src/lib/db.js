import { Database } from "bun:sqlite";

const dbPath =
  process.env.SQLITE_DB_PATH ||
  "./data/clients.db";

const db = new Database(dbPath);

export function getClients() {
  return db.query(`
    SELECT
      id,
      name,
      email,
      address,
      latitude,
      longitude
    FROM clients
    ORDER BY name
  `).all();
}

export default db;