---
inclusion: fileMatch
fileMatchPattern: "tests/**,jest.config.*,**/*.test.js"
---

# Testing

- Jest + Supertest. Tests in `tests/` directory.
- Since the project uses ESM, Jest needs `--experimental-vm-modules` or a transform configured.
- Tests import the app from `index.js` (which exports without listening) and use supertest against it.
