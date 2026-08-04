import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { title, description, due_date, topic, status } = body;

  if (!title || !due_date || !topic || !status) {
    return NextResponse.json(
      { error: "title, due_date, topic, and status are required" },
      { status: 400 }
    );
  }

  const existing = db.prepare("SELECT id FROM tasks WHERE id = ?").get(id);
  if (!existing) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  db.prepare(
    `UPDATE tasks
     SET title = ?, description = ?, due_date = ?, topic = ?, status = ?
     WHERE id = ?`
  ).run(title, description ?? null, due_date, topic, status, id);

  const updated = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);

  return NextResponse.json(updated, { status: 200 });
}