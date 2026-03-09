---
inclusion: always
---

# Coding Conventions

- ES Modules only. No CommonJS `require`/`module.exports`.
- `async/await` for all async operations.
- Protected files start with: `// DO NOT MODIFY THIS FILE - This file is managed by the template`
- Error responses are structured: `{ error: { code, message, status } }` using centralized error codes (VALIDATION_ERROR, NOT_FOUND, DATABASE_ERROR, etc.)
- Input validation uses `express-validator`.
- `index.js` exports the app for testing and only calls `listen()` when run directly.
