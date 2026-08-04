import { describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { POST as archiveTask } from "@/app/api/tasks/[id]/archive/route";
import { Task } from "@/lib/types";

beforeEach(() => {
  db.exec("DELETE FROM tasks");
});

function insertTask(): number {
  const result = db
    .prepare(
      `INSERT INTO tasks (title, description, due_date, topic) VALUES (?, ?, ?, ?)`
    )
    .run("Archive me", null, "2026-08-01", "Testing");
  return result.lastInsertRowid as number;
}

describe("archiving", () => {
  it("sets archived_at instead of deleting the row", async () => {
    const id = insertTask();

    const res = await archiveTask(
      new NextRequest(`http://localhost/api/tasks/${id}/archive`, {
        method: "POST",
      }),
      { params: Promise.resolve({ id: String(id) }) }
    );

    expect(res.status).toBe(200);

    const row = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id) as Task;
    expect(row).toBeDefined(); // the row still exists — this is the point
    expect(row.archived_at).not.toBeNull();
  });

  it("excludes archived tasks from the active-task query used on the homepage", async () => {
    const id = insertTask();

    await archiveTask(
      new NextRequest(`http://localhost/api/tasks/${id}/archive`, {
        method: "POST",
      }),
      { params: Promise.resolve({ id: String(id) }) }
    );

    const active = db
      .prepare("SELECT * FROM tasks WHERE archived_at IS NULL")
      .all() as Task[];

    expect(active.find((t) => t.id === id)).toBeUndefined();
  });
});