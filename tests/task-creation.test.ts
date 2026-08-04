import { describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { POST } from "@/app/api/tasks/route";
import { Task } from "@/lib/types";

// Runs before every test in this file — keeps tests from affecting each other,
// even though they share one in-memory database for the whole file.
beforeEach(() => {
  db.exec("DELETE FROM tasks");
});

function makeRequest(body: unknown) {
  return new NextRequest("http://localhost/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/tasks", () => {
  it("creates a task carrying all four required fields and persists it", async () => {
    const res = await POST(
      makeRequest({
        title: "Finish lab 1",
        description: "Build the todo app",
        due_date: "2026-08-04",
        topic: "COMS3011A(SDP)",
      })
    );

    expect(res.status).toBe(201);

    const row = db
      .prepare("SELECT * FROM tasks WHERE title = ?")
      .get("Finish lab 1") as Task;

    expect(row).toBeDefined();
    expect(row.due_date).toBe("2026-08-04");
    expect(row.topic).toBe("COMS3011A(SDP)");
    expect(row.status).toBe("Todo");
  });

  it("rejects a task missing a required field and does not save it", async () => {
    const res = await POST(
      makeRequest({ title: "No due date", topic: "COMS3011A" })
    );

    expect(res.status).toBe(400);

    const row = db
      .prepare("SELECT * FROM tasks WHERE title = ?")
      .get("No due date");

    expect(row).toBeUndefined();
  });
});