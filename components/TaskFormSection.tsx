"use client";

import { useState } from "react";
import TaskForm from "./TaskForm";

export default function TaskFormSection() {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return <TaskForm onDone={() => setIsOpen(false)} />;
  }

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="mb-6 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
    >
      + New Task
    </button>
  );
}