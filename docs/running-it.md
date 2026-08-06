# Running the Application

## Requirements

- Node.js **v22.23.2**
- npm (bundled with Node.js)

## Install

```bash
git clone https://github.com/LesegoNgobeni-14/todo_app.git
cd todo_app
npm install
```
## Run

```bash
npm run dev
```

Then open **http://localhost:3000**. On first run, a SQLite database file is created automatically as `data/app.db`; no manual setup is required.

## Test

```bash
npm test
```

This runs the full test suite(Vitest) against an in-memory SQLite database so it never touches or depend on the real `data/app.db` file or its contents. All tests should pass with no additional setup.

---

**AI Declaration** | The preceding document was planned, reviewed, edited and generated with the assistance of Claude [Claude Sonnet 5].
