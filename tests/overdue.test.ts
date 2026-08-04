import { describe, it, expect } from "vitest";
import { isOverdue } from "@/lib/overdue";
import type { Task } from "@/lib/types";

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: 1,
    title: "Test task",
    description: null,
    due_date: "2020-01-01",
    topic: "Testing",
    status: "Todo",
    archived_at: null,
    created_at: "2020-01-01T00:00:00Z",
    ...overrides,
  };
}

describe("isOverdue", () => {
  it("is true for a past due date with an incomplete status", () => {
    expect(isOverdue(makeTask({ due_date: "2000-01-01", status: "Todo" }))).toBe(true);
  });

  it("is false once status is complete, even if the due date has passed", () => {
    expect(
      isOverdue(makeTask({ due_date: "2000-01-01", status: "Complete" }))
    ).toBe(false);
  });

  it("is false for a task archived after becoming overdue", () => {
    expect(
      isOverdue(
        makeTask({
          due_date: "2000-01-01",
          status: "Todo",
          archived_at: "2020-01-02T00:00:00Z",
        })
      )
    ).toBe(false);
  });

  it("is false for a task due today", () => {
    const today = new Date().toISOString().slice(0, 10);
    expect(isOverdue(makeTask({ due_date: today, status: "Todo" }))).toBe(false);
  });
});