# Student Assignment Template

Express.js + libsql + Drizzle ORM API starter. Comes with a working task list API feature — copy the pattern to build your own.

## Setup

```bash
npm install       # install dependencies
npm run db        # create and seed the database
npm run dev       # start the dev server (auto-reloads on changes)
npm install bcrypt # bcrypt to securely hash passwords before storing them in db

```

The API is then available at [http://localhost:3000/api](http://localhost:3000/api) (e.g. `GET /api/health`).



## Add a New Feature (cheat sheet)

1. **Schema** — add your table in `src/db/schema.js` (copy the `tasks` table pattern)
2. **Seed** — add sample data in `src/db/seed.js`, then run `npm run db`
3. **Controller** — create `src/controllers/yourController.js` (copy `exampleController.js`)
4. **Route** — create `src/routes/yourRoute.js` (copy `exampleRoute.js`)
5. **Register** — add `app.use('/api/your-resource', yourRoutes)` in `index.js` (before the error handler)

## Files You'll Touch

| File | What to do |
|---|---|
| `src/db/schema.js` | Add your table definitions |
| `src/db/seed.js` | Add seed data for your tables |
| `index.js` | Register your new routes |
| `src/controllers/` | Create your controller (copy `exampleController.js`) |
| `src/routes/` | Create your route file (copy `exampleRoute.js`) |

Everything else is infrastructure — you shouldn't need to change it.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server with auto-reload |
| `npm run db` | Reset database and seed sample data |
| `npm test` | Run tests |