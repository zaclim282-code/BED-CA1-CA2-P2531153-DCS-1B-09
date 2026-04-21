---
inclusion: fileMatch
fileMatchPattern: "_extras/tests/**,vitest.config.*,**/*.test.js"
---

# Testing

- Vitest + Supertest. Tests in `_extras/tests/` directory.
- Since the project uses ESM, Vitest runs tests natively without `--experimental-vm-modules`.
- Tests import the app from `index.js` (which exports without listening) and use supertest against it.
