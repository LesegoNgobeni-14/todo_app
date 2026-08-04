import type { Task } from "./types";

export function isOverdue(task: Task): boolean {
  const today = new Date().toISOString().slice(0, 10);
  return (
    task.due_date < today &&
    task.status !== "complete" &&
    task.archived_at === null
  );
}