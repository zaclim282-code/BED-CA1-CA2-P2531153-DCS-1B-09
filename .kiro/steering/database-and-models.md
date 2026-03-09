---
inclusion: fileMatch
fileMatchPattern: "src/models/**,scripts/db.js,drizzle.config.*"
---

# Database & Models

- libsql client + Drizzle ORM, connection setup in `src/utils/`.
- Schema push via `drizzle-kit push` — no migration files.
- Model files export async CRUD functions. No HTTP concerns in models.
- `scripts/db.js` is a Protected_File — creates/resets DB and seeds data.
- Schema must demonstrate at least one table relationship (one-to-many or many-to-many).
