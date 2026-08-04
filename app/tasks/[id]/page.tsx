import { db } from "@/lib/db";
import type { Task } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import TaskDetail from "@/components/TaskDeatil";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const task = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(id) as Task | undefined;

  if (!task) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/" className="text-sm text-slate-500 underline">
        ← Back to tasks
      </Link>

      <div className="mt-4">
        <TaskDetail task={task} />
      </div>
    </main>
  );
}