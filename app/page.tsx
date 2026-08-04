import { db } from "@/lib/db";
import type { Task } from "@/lib/types";
import TaskFormSection from "@/components/TaskFormSection";
import Link from "next/link";
import { isOverdue } from "@/lib/overdue";

const VALID_SORTS = ["topic", "status", "due_date"] as const;
type SortKey = (typeof VALID_SORTS)[number];

function isValidSort(value: string | undefined): value is SortKey {
  return VALID_SORTS.includes(value as SortKey);
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort } = await searchParams;
  const sortKey: SortKey = isValidSort(sort) ? sort : "topic";

  const tasks = db.prepare(`SELECT * FROM tasks WHERE archived_at IS NULL ORDER BY ${sortKey} ASC`).all() as Task[];

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-6xl font-bold">🌸𝑇𝑜-𝐷𝑜 𝐿𝑖𝑠𝑡🌸</h1>
      </header>

      <TaskFormSection />

      <div className="mb-4 flex gap-3 text-slate-600">
        <span>Sort by:</span>
        <Link
          href="/?sort=topic"
          className={`underline ${sortKey === "topic" ? "font-bold text-pink-500" : ""}`}>Topic</Link>
        <Link
          href="/?sort=status"
          className={`underline ${sortKey === "status" ? "font-bold text-pink-500" : ""}`}>Status</Link>
        <Link
          href="/?sort=due_date"
          className={`underline ${sortKey === "due_date" ? "font-bold text-pink-500" : ""}`}>Due date</Link>
      </div>

      <ul className="space-y-3">
        {tasks.length === 0 && (
          <li className="rounded-lg border border-slate-300 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-400">No tasks created yet</p>
          </li>
        )}
        {tasks.map((task) => (
          <li key={task.id}>
            <Link 
              href={`/tasks/${task.id}`}
              className="block rounded-lg border border-slate-300 bg-white p-4 shadow-sm hover:bg-slate-50 transition">

              <div className="flex items-center justify-between">
                <h2 className="font-medium text-black">{task.title}</h2>
                <div className="flex items-center gap-2">
                  {isOverdue(task) && (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-500">Overdue</span>
                  )}
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-red-500">{task.status}</span>
                </div>
              </div>

              {task.description && (
                <p className="mt-1 text-sm text-slate-600">{task.description}</p>
              )}
              <div className="mt-2 flex gap-3 text-xs text-black">
                <span>Due: {task.due_date}</span>
                <span>Topic: {task.topic}</span>
            </div>
          </Link>
        </li>
      ))}
      </ul>

    </main>
  );
}
