
export default function Home() {

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-6xl font-bold">🌸𝑇𝑜-𝐷𝑜 𝐿𝑖𝑠𝑡🌸</h1>
        <button className="rounded-md bg-pink-900 px-4 py-2 text-sm font-medium text-white hover:bg-pink-600">+ New Task</button>
      </header>

      <div className="mb-4 flex gap-2 text-4x1 text-white-600">
        <span>Sort by:</span>
        <button className="underline">Topic</button>
        <button className="underline">Status</button>
        <button className="underline">Due date</button>
      </div>

      <ul className="space-y-3">
        <li className="rounded-lg border border-slate-300 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-400">
            No tasks created yet
          </p>
        </li>
      </ul>

    </main>
  );
}
