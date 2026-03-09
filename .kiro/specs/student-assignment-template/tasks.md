# Implementation Plan: Student Assignment Template

## Overview

Build a complete Express.js + libsql + Drizzle ORM project template for 1st-year programming students. Implementation proceeds bottom-up: utilities and data layer first, then MVC example feature, then tooling scripts, then documentation and support files, and finally tests. Each task builds on the previous so there is no orphaned code.

## Tasks

- [ ] 1. Initialize project and configure tooling
  - [ ] 1.1 Create package.json with all dependencies and scripts
    - Initialize with `"type": "module"` for ES Modules
    - Add dependencies: express, cors, @libsql/client, drizzle-orm, drizzle-kit, express-validator, swagger-autogen, swagger-ui-express, dotenv
    - Add devDependencies: nodemon, jest, supertest, fast-check, eslint
    - Add scripts: `dev` (nodemon index.js), `test`, `db`, `start:fresh`, `validate`, `lint` as defined in the design
    - The `dev` script uses nodemon so the server auto-restarts on file changes
    - The `start:fresh` script runs `npm run db && npm run dev` to reset DB then start dev server
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 4.1, 4.2, 14.1, 14.2_

  - [ ] 1.2 Create environment and editor configuration files
    - Create `.env.example` with PORT, DATABASE_URL, NODE_ENV and their defaults
    - Create `.gitignore` excluding .env, node_modules, local.db, swagger-output.json
    - Create `.eslintrc.json` with ES Module and Node.js environment config
    - Create `drizzle.config.js` for Drizzle Kit push configuration
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 10.1_

  - [ ] 1.3 Create .vscode configuration files
    - Create `.vscode/extensions.json` recommending SQLite viewer and REST Client extensions
    - Create `.vscode/settings.json` with format on save, tab size, trailing whitespace trimming
    - _Requirements: 13.3, 13.4, 13.6, 18.4_

  - [ ] 1.4 Set up automatic dependency installation mechanism
    - Add a mechanism (e.g., a VS Code task or postinstall hook) so dependencies install automatically when a student first opens the project
    - Ensure the mechanism displays a clear error message if installation fails
    - _Requirements: 13.1, 13.2, 13.5_

- [ ] 2. Implement utility layer
  - [ ] 2.1 Create src/utils/database.js — database connection setup
    - Set up libsql client with configurable DATABASE_URL (default `file:local.db`)
    - Export Drizzle ORM instance wrapping the libsql client
    - Load environment variables using dotenv
    - _Requirements: 2.2, 2.3, 9.3, 9.4, 1.5_

  - [ ] 2.2 Create src/utils/errors.js — error codes, AppError class, and error handler middleware
    - Define ERROR_CODES map: VALIDATION_ERROR (400), NOT_FOUND (404), DATABASE_ERROR (500), INTERNAL_ERROR (500)
    - Implement AppError class extending Error with code, message, status fields
    - Implement errorHandler middleware returning `{ error: { code, message, status } }`
    - Unhandled errors default to INTERNAL_ERROR (500)
    - Include JSDoc comments on exported functions
    - _Requirements: 8.1, 8.2, 8.3, 8.5, 8.6, 10.3_

  - [ ] 2.3 Write property tests for error handling utilities
    - **Property 1: Structured error responses** — Generate random AppError instances, pass through error handler, verify response shape `{ error: { code, message, status } }` with valid values
    - **Validates: Requirements 8.1**
    - **Property 2: Error code map completeness** — Iterate all ERROR_CODES entries, verify each has valid HTTP status (100–599) and non-empty message string
    - **Validates: Requirements 8.6**

- [ ] 3. Implement data layer (model)
  - [ ] 3.1 Create src/models/exampleModel.js — Drizzle schema and CRUD functions
    - Define `tasks` table schema with id (integer PK autoincrement), title (text not null), completed (integer boolean default false), createdAt (text default ISO string)
    - Implement `getAll(db, filters)` supporting `completed` and `search` query filters
    - Implement `getById(db, id)`, `create(db, data)`, `update(db, id, data)`, `remove(db, id)`
    - All functions are async, receive `db` as first parameter, return plain data
    - No HTTP concerns (no req/res imports)
    - Include JSDoc comments on all exported functions
    - Include `// TODO:` guided comments indicating where students should add their own models
    - _Requirements: 1.2, 1.8, 1.11, 10.3, 10.4, 10.6, 11.1, 11.2_

  - [ ] 3.2 Write property tests for model MVC separation
    - **Property 7: MVC separation — models have no HTTP concerns** — Parse all files in src/models/, verify no imports of express, req, res, or HTTP-related modules
    - **Validates: Requirements 10.4**

- [ ] 4. Implement controller layer
  - [ ] 4.1 Create src/controllers/exampleController.js — business logic and validation
    - Implement `getAllTasks(req, res, next)` with query parameter filtering (?completed, ?search)
    - Implement `getTaskById(req, res, next)` returning 404 for missing tasks
    - Implement `createTask(req, res, next)` with express-validator validation check, returning 201
    - Implement `updateTask(req, res, next)` with validation check, returning 200 or 404
    - Implement `deleteTask(req, res, next)` returning 204 or 404
    - All functions use try/catch with next(error) for error delegation
    - Use async/await for all async operations
    - Include JSDoc comments on all exported functions
    - Include `// TODO:` guided comments for student extension
    - _Requirements: 1.3, 1.10, 1.11, 8.4, 10.3, 10.5, 10.6, 12.2, 12.3, 12.5_

- [ ] 5. Implement route layer
  - [ ] 5.1 Create src/routes/exampleRoute.js — route definitions
    - Define GET /, GET /:id, POST /, PUT /:id, DELETE /:id routes
    - Wire routes to controller functions
    - Declare express-validator validation rules inline on POST and PUT routes
    - No business logic in route file
    - Include `// TODO:` guided comment for adding new routes
    - _Requirements: 1.4, 1.9, 1.11, 12.1, 12.4_

  - [ ] 5.2 Write property tests for example file conventions
    - **Property 8: Example files contain guided TODO comments** — Scan exampleModel.js, exampleController.js, exampleRoute.js for at least one `// TODO:` comment each
    - **Validates: Requirements 1.11**
    - **Property 9: Example functions have JSDoc comments** — Parse example files, find exported functions, verify each is preceded by a JSDoc comment block
    - **Validates: Requirements 10.3**
    - **Property 10: Async functions use async/await** — Parse model/controller files, find async functions, verify await usage
    - **Validates: Requirements 10.6**

- [ ] 6. Checkpoint — Core MVC wiring
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Create entry point and wire everything together
  - [ ] 7.1 Create index.js — Express app setup, middleware, route registration
    - Set up Express with CORS, JSON parsing, static file serving from public/
    - Register GET /health endpoint returning `{ status: 'ok' }`
    - Mount task routes at /api/tasks
    - Register global error handler middleware (must be last)
    - Export app as default for testing
    - Only call app.listen() when run directly (process.argv[1] check)
    - Display server URL, port, and API docs URL on startup
    - _Requirements: 1.1, 4.3, 7.1, 8.2, 10.7, 14.3, 14.4_

- [ ] 8. Create protected infrastructure scripts
  - [ ] 8.1 Create scripts/db.js — database reset and seed script (Protected_File)
    - Add `// DO NOT MODIFY THIS FILE - This file is managed by the template` header
    - Delete existing database file if present
    - Run drizzle-kit push to create tables from schema
    - Insert seed data (3 sample tasks)
    - Log success/failure messages
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 21.1, 21.2_

  - [ ] 8.2 Create scripts/swagger.js — Swagger auto-generation (Protected_File)
    - Add protected file header
    - Use swagger-autogen to scan Express router files and generate swagger-output.json
    - Mount Swagger UI at /api-docs
    - Export a setup function that index.js calls on startup
    - Routes and methods inferred automatically — no student annotations needed
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 21.1, 21.2_

  - [ ] 8.3 Create scripts/validate.js — project validation script (Protected_File)
    - Add protected file header
    - Check all required files and directories exist
    - Verify npm dependencies are installed (node_modules exists, key packages present)
    - Attempt to start the server and confirm /health responds with 200
    - Verify Protected_File headers are intact on scripts/db.js, scripts/swagger.js, scripts/validate.js
    - Display pass/fail summary for each check
    - Exit with non-zero code if any check fails
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 21.3_

  - [ ] 8.4 Write property tests for protected files and validation
    - **Property 3: Protected file headers match exact format** — Read first line of each Protected_File, verify exact match `// DO NOT MODIFY THIS FILE - This file is managed by the template`
    - **Validates: Requirements 21.1, 21.2**
    - **Property 5: Validation script reports pass/fail and exits correctly** — Run validation with various states, verify output lists each check with pass/fail and exits non-zero on failure
    - **Validates: Requirements 15.4, 15.5**
    - **Property 6: Validation script checks all required files** — Remove random required files, run validation, verify each missing file is reported
    - **Validates: Requirements 15.1**

- [ ] 9. Integrate Swagger into index.js
  - [ ] 9.1 Wire scripts/swagger.js into index.js startup
    - Import and call the swagger setup function in index.js so docs auto-generate on server start
    - Ensure /api-docs route is registered before the error handler
    - Update index.js to handle port-in-use errors with a clear message
    - _Requirements: 3.1, 3.2, 3.6, 4.4_

- [ ] 10. Checkpoint — Server runs end-to-end
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Create frontend files
  - [ ] 11.1 Create public/index.html — example frontend page
    - Include basic HTML structure with a task list UI
    - Link to CSS and JS files
    - _Requirements: 7.1, 7.2, 1.7_

  - [ ] 11.2 Create public/css/style.css — example styles
    - Basic styling for the task list page
    - _Requirements: 7.2_

  - [ ] 11.3 Create public/js/main.js — example fetch API calls
    - Demonstrate async/await fetch calls to GET /api/tasks, POST /api/tasks, PUT /api/tasks/:id, DELETE /api/tasks/:id
    - Render data to the DOM
    - Handle form submission
    - Basic error display
    - _Requirements: 7.2, 7.4_

  - [ ] 11.4 Create public/components/ directory with a placeholder component
    - Create the components directory for reusable UI components
    - Include a simple example component (e.g., task-item renderer)
    - _Requirements: 7.3, 7.5_

- [ ] 12. Create documentation and support files
  - [ ] 12.1 Create README.md — project documentation
    - Include project title, brief description, setup instructions, available scripts, project structure overview, and technology list
    - Serve as an example of a well-structured README
    - _Requirements: 10.2_

  - [ ] 12.2 Create GUIDE.md — feature development guide
    - Walk through adding a new feature: model → controller → route → test
    - Reference example files as starting points
    - Include instructions for registering new routes in index.js
    - _Requirements: 17.1, 17.2, 17.3, 17.4_

  - [ ] 12.3 Create agents.md — AI guardrails file
    - Describe project directory structure and purpose of each directory
    - List technology stack and version constraints
    - Specify coding conventions (async/await, MVC, JSDoc)
    - Instruct AI to avoid modifying Protected_Files
    - Instruct AI to follow existing example file patterns
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6_

  - [ ] 12.4 Create requests.http — API request collection
    - Include GET, POST, PUT, DELETE request examples for /api/tasks
    - Include example request bodies and headers
    - Include query parameter examples (?completed=true, ?search=term)
    - _Requirements: 18.1, 18.2, 18.3, 18.5_

  - [ ] 12.5 Create prompts/ directory with frontend prompt templates
    - Create prompts/create-html-page.md
    - Create prompts/style-with-css.md
    - Create prompts/fetch-api-calls.md
    - Create prompts/dom-events.md
    - Each template references project structure and example files
    - _Requirements: 20.1, 20.2, 20.3, 20.4_

  - [ ] 12.6 Create .github/PULL_REQUEST_TEMPLATE.md — submission checklist
    - Include checklist items: tests passing, API docs generated, README updated, code linted, seed data included
    - _Requirements: 16.1, 16.2, 16.3_

- [ ] 13. Checkpoint — All files created
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 14. Write unit and integration tests
  - [ ] 14.1 Create tests/health.test.js — health endpoint tests
    - Test GET /health returns 200 with `{ status: 'ok' }`
    - _Requirements: 1.6, 14.3, 14.4_

  - [ ] 14.2 Create tests/example.test.js — CRUD endpoint integration tests
    - Test GET /api/tasks returns 200 with array
    - Test GET /api/tasks/:id returns 200 with task object or 404
    - Test POST /api/tasks with valid body returns 201
    - Test POST /api/tasks with invalid body returns 400
    - Test PUT /api/tasks/:id with valid body returns 200 or 404
    - Test DELETE /api/tasks/:id returns 204 or 404
    - Test GET /api/tasks?completed=true filters correctly
    - Test GET /api/tasks?search=term filters correctly
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 12.1, 12.2, 12.3, 12.5_

  - [ ] 14.3 Create tests/errors.test.js — error handling unit tests
    - Test AppError class creates errors with correct code, message, status
    - Test errorHandler middleware returns structured error response
    - Test unknown errors default to INTERNAL_ERROR
    - _Requirements: 8.1, 8.2, 8.5, 8.6_

  - [ ] 14.4 Create tests/properties.test.js — property-based tests with fast-check
    - **Property 1: Structured error responses** — `Feature: student-assignment-template, Property 1: Structured error responses`
    - **Validates: Requirements 8.1**
    - **Property 2: Error code map completeness** — `Feature: student-assignment-template, Property 2: Error code map completeness`
    - **Validates: Requirements 8.6**
    - **Property 3: Protected file headers match exact format** — `Feature: student-assignment-template, Property 3: Protected file headers match exact format`
    - **Validates: Requirements 21.1, 21.2**
    - **Property 7: MVC separation** — `Feature: student-assignment-template, Property 7: MVC separation`
    - **Validates: Requirements 10.4**
    - **Property 8: Example files contain guided TODO comments** — `Feature: student-assignment-template, Property 8: Example files contain guided TODO comments`
    - **Validates: Requirements 1.11**
    - **Property 9: Example functions have JSDoc comments** — `Feature: student-assignment-template, Property 9: Example functions have JSDoc comments`
    - **Validates: Requirements 10.3**
    - **Property 10: Async functions use async/await** — `Feature: student-assignment-template, Property 10: Async functions use async/await`
    - **Validates: Requirements 10.6**

- [ ] 15. Final checkpoint — All tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- All code uses ES Modules (import/export) and async/await — no CommonJS
- Protected files must start with the exact header: `// DO NOT MODIFY THIS FILE - This file is managed by the template`
