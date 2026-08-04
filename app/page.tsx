import { db } from "@/lib/db";
import type { Task } from "@/lib/types";
import TaskFormSection from "@/components/TaskFormSection";
import Link from "next/link";

export default function Home() {
  const tasks = db.prepare("SELECT * FROM tasks WHERE archived_at IS NULL ORDER BY created_at DESC").all() as Task[];

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-6xl font-bold">🌸𝑇𝑜-𝐷𝑜 𝐿𝑖𝑠𝑡🌸</h1>
      </header>

      <TaskFormSection />

      <div className="mb-4 flex gap-3 text-slate-600">
        <span>Sort by:</span>
        <button className="underline">Topic</button>
        <button className="underline">Status</button>
        <button className="underline">Due date</button>
      </div>

      <ul className="space-y-3">
        {tasks.length === 0 && (
          <li className="rounded-lg border border-slate-300 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-400">
              No tasks created yet
            </p>
          </li>
        )}
        {tasks.map((task) => (
          <li key={task.id}>
            <Link 
              href={`/tasks/${task.id}`}
              className="block rounded-lg border border-slate-300 bg-white p-4 shadow-sm hover:bg-slate-50 transition">

              <div className="flex items-center justify-between">
                <h2 className="font-medium text-black">{task.title}</h2>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-red-500">{task.status}</span>
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
