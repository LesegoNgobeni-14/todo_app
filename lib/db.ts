import Database from "better-sqlite3";
import path from "path";
import fs from "fs";


const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "app.db");
export const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    description TEXT,
    dueDate     TEXT NOT NULL,
    topic       TEXT NOT NULL,
    status      TEXT NOT NULL CHECK (status IN ('Todo', 'In Progress', 'Complete')) DEFAULT 'Todo',
    archived    INTEGER NOT NULL DEFAULT 0,
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);