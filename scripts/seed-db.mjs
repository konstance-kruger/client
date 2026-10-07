import { Database } from "bun:sqlite";

const dbPath = "./data/clients.db";

const db = new Database(dbPath);

db.run("DELETE FROM clients");

const insert = db.prepare(`
  INSERT INTO clients (
    name,
    email,
    address,
    latitude,
    longitude
  )
  VALUES (?, ?, ?, ?, ?)
`);

const clients = [
  [
    "Client Besançon",
    "besancon@example.com",
    "Besançon",
    47.2378,
    6.0241
  ],
  [
    "Client Montbéliard",
    "montbeliard@example.com",
    "Montbéliard",
    47.5102,
    6.7985
  ],
  [
    "Client Belfort",
    "belfort@example.com",
    "Belfort",
    47.6397,
    6.8638
  ],
  [
    "Client Dijon",
    "dijon@example.com",
    "Dijon",
    47.3220,
    5.0415
  ]
];

const transaction = db.transaction(() => {
  for (const client of clients) {
    insert.run(...client);
  }
});

transaction();

insert.finalize();
db.close();

console.log(`${clients.length} clients insérés.`);