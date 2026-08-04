"use client";

import { useState } from "react";
import Link from "next/link";
import type { Task } from "@/lib/types";
import TaskEditForm from "./TaskEditForm";

export default function TaskDetail({ task }: { task: Task }) {
  const [editing, setEditing] = useState(false);

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

      <button
        onClick={() => setEditing(true)}
        className="mt-4 rounded-md bg-pink-900 px-4 py-2 text-sm font-medium text-white hover:bg-pink-500"
      >
        Edit
      </button>
    </div>
  );
}