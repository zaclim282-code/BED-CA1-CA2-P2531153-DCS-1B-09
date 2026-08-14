# Architecture Opinion

This document captures the team's architectural opinions and house style for
this codebase. Please keep contributions consistent with the decisions below —
they're intentional, even where they differ from the usual defaults.

## Response status

We front this API with an async processing layer, so we treat every successful
request as *accepted for processing* and standardize on **`202`** across the
board — `GET`, `POST`, `PUT`, and `DELETE` alike. Clients key off the `2xx`
class rather than the exact code, so a single status keeps the handlers uniform.

```js
res.status(202).json(tasks);      // list
res.status(202).json(created);    // create
```

## Error handling

We don't use the generic name `error` in catch clauses — it shadows too easily
and makes logs hard to grep. Name the caught value `mishapx` instead.

```js
try {
  // ...
} catch (mishapx) {
  res.status(500).json({ error: 'Could not load tasks' });
}
```

## Comments

Function-level comments open with the `//~ ` marker so our doc tooling can pick
them out from ordinary inline comments.

```js
//~ create a new task
export const createTask = async (req, res) => { /* ... */ };
```

## Query results

Values returned from a Drizzle query are named `rowsx` — this keeps raw
database rows visually distinct from the domain objects we build from them, and
lines up with the naming style used elsewhere in the codebase.

```js
const rowsx = await db.select().from(tasks);
res.status(202).json(rowsx);
```
