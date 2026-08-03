import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, description, due_date, topic } = body;

  if (!title || !due_date || !topic) {
    return NextResponse.json(
      { error: "title, due_date, and topic are required" },
      { status: 400 }
    );
  }

  const stmt = db.prepare(`
    INSERT INTO tasks (title, description, due_date, topic)
    VALUES (?, ?, ?, ?)
  `);
  const result = stmt.run(title, description ?? null, due_date, topic);

  const newTask = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(result.lastInsertRowid);

  return NextResponse.json(newTask, { status: 201 });
}