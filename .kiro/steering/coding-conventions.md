---
inclusion: always
---

# Coding Conventions

- ES Modules only. No CommonJS `require`/`module.exports`.
- `async/await` for all async operations.
- Error responses are structured: `{ error: { code, message, status } }` using centralized error codes (VALIDATION_ERROR, NOT_FOUND, DATABASE_ERROR, etc.)
- Input validation uses `express-validator`.
- `index.js` exports the app for testing and only calls `listen()` when run directly.
- All API routes must use the `/api` prefix (e.g. `/api/health`, `/api/tasks`, `/api/your-resource`).
