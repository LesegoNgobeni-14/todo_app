"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Task } from "@/lib/types";

export default function TaskEditForm({
  task,
  onDone,
}: {
  task: Task;
  onDone: () => void;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [dueDate, setDueDate] = useState(task.due_date);
  const [topic, setTopic] = useState(task.topic);
  const [status, setStatus] = useState(task.status);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title || !dueDate || !topic) {
      setError("Title, due date, and topic are required.");
      return;
    }

    setSaving(true);
    const res = await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, due_date: dueDate, topic, status }),
    });
    setSaving(false);

    if (!res.ok) {
      setError("Something went wrong saving the task.");
      return;
    }

    router.refresh();
    onDone();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 space-y-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div>
        <label className="block text-sm text-black font-medium">Title</label>
        <input
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm text-black font-medium">
          Description
        </label>
        <textarea
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm text-black font-medium">
          Due date
        </label>
        <input
          type="date"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm text-black font-medium">Topic</label>
        <input
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm text-black font-medium">Status</label>
        <select
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as Task["status"])
          }
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Complete">Complete</option>
        </select>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-pink-900 px-4 py-2 text-sm font-medium text-white hover:bg-pink-500 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 hover:bg-pink-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}