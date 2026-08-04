export type TaskStatus = "Todo" | "In Progress" | "Complete";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  due_date: string;
  topic: string;
  status: TaskStatus;
  archived_at: string | null;
  created_at: string;
}