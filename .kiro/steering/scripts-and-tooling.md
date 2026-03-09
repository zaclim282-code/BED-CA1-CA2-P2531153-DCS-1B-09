---
inclusion: fileMatch
fileMatchPattern: "scripts/**,package.json,.eslintrc*,.prettierrc*,.vscode/**"
---

# Scripts & Tooling

- `scripts/db.js`, `scripts/swagger.js`, `scripts/validate.js` are all Protected_Files.
- `npm run start:fresh` runs db reset then dev server in sequence.
- `GET /health` returns 200 with JSON body — used by both `start:fresh` and `validate`.
- Validation script checks: required files exist, deps installed, server responds, protected file headers intact.
- Dev server must show clear error on port conflict.
- `.vscode/extensions.json`: recommend SQLite viewer + REST Client extensions.
