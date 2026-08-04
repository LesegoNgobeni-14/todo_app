# Database Design

## Overview 

The application uses a single SQLite table, `tasks`. No other tables or relationships exist: `topic` is a free-text field on each task rather than a separate entity with its own attributes, so a normalised `topics` table would have added unnecessary complexity for this application's scope.

## Schema

```sql
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
```

## Column notes and design decisions

- **`due_date` / `created_at`** are `TEXT`, not a native date type. SQLite has no dedicated date type; ISO-8601 strings (`YYYY-MM-DD`) sort correctly as plain text, which is relied on for both due-date sorting and overdue detection.

- **`status`** is constrained by a `CHECK` clause to exactly the three fixed values the brief specifies (`Todo`, `In Progress`, `Complete`). This is enforced at the database level, not just in the UI, so an application bug cannot insert an invalid status.

- **`archived_at`** is a nullable timestamp, not a boolean and not a separate archive table. `NULL` means the task is active; a timestamp means archived and records *when*. Archiving is implemented as an `UPDATE` that sets this column — the row is never deleted, satisfying the brief's requirement that archived tasks remain viewable.

- **There is no `overdue` column.** Overdue is derived at read time from whether the due date has passed, the task is *not marked* `Complete`, and `archived_at` is `NULL`. The application computes this value rather than storing it, preventing stale data.

## Known caveat

`CREATE TABLE IF NOT EXISTS` only creates the table the first time the database file is generated; it does not alter an existing table's columns. During development this meant schema edits (e.g. changing `archived_at`'s type) had no effect until the local `data/app.db` file had to be deleted and recreated. This is not an issue for a fresh clone, since the database file is not committed to the repository (see `.gitignore`) and is generated fresh on first run.

## Relationships

There are no foreign-key relationships because the application stores all task information in a single `tasks` table. Each task is independent and does not reference any other database records.

---

**AI Declaration** | The preceding document was planned, reviewed, edited and generated with the assistance of Claude [Claude Sonnet 5].