import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const existing = db.prepare("SELECT id FROM tasks WHERE id = ?").get(id);
  if (!existing) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  db.prepare(
    "UPDATE tasks SET archived_at = datetime('now') WHERE id = ?"
  ).run(id);

  const updated = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  return NextResponse.json(updated, { status: 200 });
}