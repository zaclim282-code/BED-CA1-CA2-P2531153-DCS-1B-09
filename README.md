# Student Assignment Template

Express.js + libsql + Drizzle ORM starter. Comes with a working task list feature — copy the pattern to build your own.

## Setup

```bash
npm install       # install dependencies
npm run db        # create and seed the database
npm run dev       # start the dev server (auto-reloads on changes)
```

Then open [http://localhost:3000](http://localhost:3000). API docs are at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## Add a New Feature (cheat sheet)

1. **Schema** — add your table in `src/db/schema.js` (copy the `tasks` table pattern)
2. **Seed** — add sample data in `src/db/seed.js`, then run `npm run db`
3. **Model** — create `src/models/yourModel.js` following the existing task model pattern
4. **Controller** — create `src/controllers/yourController.js` following the existing task controller pattern
5. **Route** — create `src/routes/yourRoute.js` following the existing task route pattern
6. **Register** — add `app.use('/api/your-resource', yourRoutes)` in `index.js` (before the error handler)
7. **Frontend** — add a new `.html` page in `src/frontend/` (copy `index.html`)

## Files You'll Touch

| File | What to do |
|---|---|
| `src/db/schema.js` | Add your table definitions |
| `src/db/seed.js` | Add seed data for your tables |
| `index.js` | Register your new routes |
| `src/models/` | Create your model following the task pattern |
| `src/controllers/` | Create your controller following the task pattern |
| `src/routes/` | Create your route file following the task pattern |
| `src/frontend/` | Create your HTML pages, JS, and CSS |

Everything else is infrastructure — you shouldn't need to change it.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server with auto-reload |
| `npm run db` | Reset database and seed sample data |
| `npm test` | Run tests |
