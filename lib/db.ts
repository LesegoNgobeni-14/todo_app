import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbPath = process.env.DB_PATH ?? path.join(process.cwd(), "data", "app.db");

if (dbPath !== ":memory:") {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}
export const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    description TEXT,
    due_date    TEXT NOT NULL,
    topic       TEXT NOT NULL,
    status      TEXT NOT NULL CHECK (status IN ('Todo', 'In Progress', 'Complete')) DEFAULT 'Todo',
    archived_at TEXT,
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);