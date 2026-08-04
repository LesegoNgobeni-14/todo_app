"use client";

import { useState } from "react";
import TaskForm from "./TaskForm";
import Link from "next/link";

export default function TaskFormSection() {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return <TaskForm onDone={() => setIsOpen(false)} />;
  }

  return (
  <div className="mb-6 flex gap-3">
    <button
      onClick={() => setIsOpen(true)}
      className="rounded-md bg-pink-900 px-4 py-2 text-sm font-medium text-white hover:bg-pink-500"
    >
      + New Task
    </button>

    <Link
      href="/archived"
      className="rounded-md bg-pink-900 px-4 py-2 text-sm font-medium text-white hover:bg-pink-500"
    >
      View Archived
    </Link>
  </div>
);
}