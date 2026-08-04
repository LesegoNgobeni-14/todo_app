# Third Party Code

| Package | Purpose | Why Chosen |
|---|---|---|
| `next` | This is an application framework(routing, server/client components, API routes) | From the lab brief this was a requirement; it provides file-based routing and built-in API routes, avoiding a separate backend server for a local-first app. |
| `react`, `react-dom` | The UI library that Next.js is built on | It is installed automatically by Next.js, and it is required to write components. |
| `typescript` | Static typing | This catches field-name mismatches (like between the database schema and component props) at compile time rather than at runtime, hence why it is directly relevant given a schema-driven app like this one. |
| `tailwindcss` | Utility-class styling | Allows styles to live directly in component markup instead of separate CSS files, which is faster to iterate on for a solo, time-boxed project. |
| `eslint` | Linting | This is used to flag common mistakes and style issues while writing code, it ships as a `create-next-app` default. |
| `better-sqlite3` | SQLite driver for Node.js | Allows for synchronous API (no `await` needed for queries), ships prebuilt binaries so it installs without a native compiler toolchain, and is the long-established standard for this use case compared to Node's still-experimental built-in `node:sqlite`. |
| `@types/better-sqlite3` | TypeScript type definitions for `better-sqlite3` | `better-sqlite3` itself is plain Javascript, so this package supplies the types so that TypeScript can check calls against it. |
| `vitest` | Test runner | Runs TypeScript test files directly with no separate build step, and integrates with the lab's `@/` import alias via `vite-tsconfig-paths`. Fast enough to run while debugging. |
| `vite-tsconfig-paths` | Vitest plugin | Lets test files use the same `@/lib/...` import paths as the application code, instead of long relative paths like `../../src/lib/db`. |

---

**AI Declaration** | The preceding document was planned, reviewed, edited and generated with the assistance of Claude [Claude Sonnet 5].
