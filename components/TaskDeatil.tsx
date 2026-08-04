"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Task } from "@/lib/types";
import TaskEditForm from "./TaskEditForm";

export default function TaskDetail({ task }: { task: Task }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [archiving, setArchiving] = useState(false);

  async function handleArchive() {
    setArchiving(true);
    const res = await fetch(`/api/tasks/${task.id}/archive`, {
      method: "POST",
    });
    setArchiving(false);

    if (res.ok) {
      router.refresh();
      router.push("/");
    }
  }

  if (editing) {
    return (
      <TaskEditForm task={task} onDone={() => setEditing(false)} />
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-black">{task.title}</h1>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-red-500">
          {task.status}
        </span>
      </div>

      {task.description && (
        <p className="mt-3 text-sm text-slate-600">{task.description}</p>
      )}

      <dl className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-black">
        <dt className="text-slate-400">Due date</dt>
        <dd>{task.due_date}</dd>
        <dt className="text-slate-400">Topic</dt>
        <dd>{task.topic}</dd>
      </dl>

      {task.archived_at ? (
        <p className="mt-4 text-xs text-slate-400">
          Archived on {task.archived_at}
        </p>
      ) : (
        <div className="mt-4 flex gap-2">
          <button 
          onClick={() => setEditing(true)}
          className="mt-4 rounded-md bg-pink-900 px-4 py-2 text-sm font-medium text-white hover:bg-pink-500">Edit</button>
          <button 
          onClick={handleArchive}
          className="mt-4 rounded-md bg-slate-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-300">Archive</button>
        </div>
      )}
    </div>
  );
}