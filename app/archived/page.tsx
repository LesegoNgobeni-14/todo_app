import { db } from "@/lib/db";
import type { Task } from "@/lib/types";
import Link from "next/link";

export default function ArchivedPage() {
  const tasks = db
    .prepare(
      "SELECT * FROM tasks WHERE archived_at IS NOT NULL ORDER BY archived_at DESC"
    )
    .all() as Task[];

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/" className="text-sm text-slate-500 underline">
        ← Back to tasks
      </Link>

      <h1 className="mt-4 mb-6 text-2xl font-bold text-black">
        Archived Tasks
      </h1>

      <ul className="space-y-3">
        {tasks.length === 0 && (
          <li className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-400">No archived tasks.</p>
          </li>
        )}
        {tasks.map((task) => (
          <li key={task.id}>
            <Link
              href={`/tasks/${task.id}`}
              className="block rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-medium text-black">{task.title}</h2>
                <span className="text-xs text-slate-500">{task.status}</span>
              </div>
              <div className="mt-2 flex gap-3 text-xs text-slate-400">
                <span>Due: {task.due_date}</span>
                <span>Topic: {task.topic}</span>
                <span>Archived: {task.archived_at}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}