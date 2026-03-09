# Requirements Document

## Introduction

This document defines requirements for a base template for 1st year programming student coding assignments. The template provides a standardized project structure using Express.js, libsql, and Drizzle ORM for the backend, with simple HTML/CSS/JS for the frontend. The template is designed to be simple enough for beginners while following professional development practices.

## Glossary

- **Template**: The base project structure and configuration files
- **Assignment_Project**: A student project created from the Template
- **API_Server**: The Express.js backend server
- **Database**: The libsql database instance
- **ORM**: Drizzle ORM for database operations
- **Frontend**: The HTML/CSS/JS client interface
- **Dev_Environment**: The local development setup using nodemon
- **Test_Suite**: The jest and supertest testing framework
- **API_Documentation**: Auto-generated Swagger documentation
- **Seeded_State**: The initial database state with sample data
- **Validation_Script**: The npm run validate script that checks project integrity
- **Guide_Document**: The GUIDE.md file that walks students through adding new features
- **AI_Guardrails_File**: The agents.md file that provides rules and context for AI assistants
- **Prompt_Templates**: Pre-written prompt files in the prompts/ directory for frontend development
- **Protected_File**: A file marked with a do-not-modify header comment managed by the Template

## Requirements

### Requirement 1: Project Structure

**User Story:** As a module coordinator, I want a standardized file organization structure, so that students can easily navigate and understand the codebase.

#### Acceptance Criteria

1. THE Template SHALL include an index.js file at the root that defines the Express instance and middleware
2. THE Template SHALL include a src/models directory for all Drizzle ORM schema and query functions
3. THE Template SHALL include a src/controllers directory for all business logic and data transformation
4. THE Template SHALL include a src/routes directory for all route definitions
5. THE Template SHALL include a src/utils directory for reusable utility functions
6. THE Template SHALL include a tests directory at the root for all test files
7. THE Template SHALL include a public directory for static frontend assets (HTML, CSS, JS)
8. THE Template SHALL include a pre-written exampleModel.js file in src/models demonstrating a Drizzle ORM schema definition
9. THE Template SHALL include a pre-written exampleRoute.js file in src/routes defining example API endpoints
10. THE Template SHALL include a pre-written exampleController.js file in src/controllers containing example business logic
11. THE Template SHALL include inline guided comments in example files (e.g., `// TODO: Add your own route here`) indicating where students should extend the code

### Requirement 2: Technology Stack Configuration

**User Story:** As a module coordinator, I want the correct technology stack pre-configured, so that students can start coding immediately without setup issues.

#### Acceptance Criteria

1. THE Template SHALL include Express.js as the web framework
2. THE Template SHALL include libsql as the database engine
3. THE Template SHALL include Drizzle ORM for database operations
4. THE Template SHALL include nodemon for development auto-reloading
5. THE Template SHALL include jest and supertest for testing
6. THE Template SHALL include swagger-autogen and swagger-ui-express for API documentation
7. THE Template SHALL include a package.json with all dependencies configured
8. THE Template SHALL use ES Modules (`import`/`export`) with `"type": "module"` in package.json, using JavaScript only (no TypeScript)

### Requirement 3: Automatic API Documentation

**User Story:** As a tutor, I want API documentation automatically available when the server runs, so that I can review student endpoints without additional setup.

#### Acceptance Criteria

1. WHEN the API_Server starts, THE Template SHALL auto-generate Swagger API_Documentation from Express router definitions using swagger-autogen
2. WHEN the API_Server is running, THE Template SHALL serve Swagger UI at the /api-docs route displaying the generated API_Documentation
3. THE Template SHALL infer API routes and methods automatically from Express router definitions without requiring students to add annotations or comments
4. WHEN a student adds or modifies routes and restarts the API_Server, THE API_Documentation SHALL reflect the updated routes without any additional steps
5. THE Template SHALL include swagger-autogen configuration files marked as Protected_Files with the do-not-modify comment header defined in Requirement 21
6. THE Template SHALL register the /api-docs route and swagger generation logic in a Protected_File so that students do not need to configure or interact with the documentation system

### Requirement 4: Development Script

**User Story:** As a student, I want to run my application in development mode, so that I can see changes automatically without manual restarts.

#### Acceptance Criteria

1. WHEN the command "npm run dev" is executed, THE Template SHALL start the API_Server using nodemon
2. WHILE the Dev_Environment is running, THE Template SHALL automatically restart the server when file changes are detected
3. WHEN the API_Server starts, THE Template SHALL display the server URL and port in the console
4. IF the configured port is already in use, THEN THE API_Server SHALL display a clear error message indicating the port conflict and suggest an alternative port or exit gracefully

### Requirement 5: Testing Script

**User Story:** As a student, I want to run automated tests, so that I can verify my code works correctly.

#### Acceptance Criteria

1. WHEN the command "npm run test" is executed, THE Template SHALL run all tests using jest
2. THE Template SHALL include supertest for HTTP endpoint testing
3. THE Template SHALL include example test files demonstrating API endpoint testing
4. WHEN tests complete, THE Template SHALL display a summary of passed and failed tests

### Requirement 6: Database Management Script

**User Story:** As a student, I want to easily reset my database to a known state, so that I can test my application with fresh data.

#### Acceptance Criteria

1. WHEN the command "npm run db" is executed AND the Database file does not exist, THE Template SHALL create a new Database file
2. WHEN the command "npm run db" is executed AND the Database file exists, THE Template SHALL reset the Database to the Seeded_State
3. WHEN the Database is reset, THE Template SHALL create tables directly from the Drizzle schema definitions (e.g., using drizzle-kit push)
4. WHEN the Database is reset, THE Template SHALL populate the Database with sample seed data
5. THE Template SHALL include a seed data file with example records

### Requirement 7: Frontend Structure

**User Story:** As a student, I want a simple frontend structure, so that I can build user interfaces that can be extended later.

#### Acceptance Criteria

1. THE Template SHALL serve static HTML files from the public directory
2. THE Template SHALL include example HTML, CSS, and JS files demonstrating API integration
3. THE Template SHALL organize frontend code to allow future migration to component-based frameworks
4. THE Template SHALL include example fetch API calls to backend endpoints
5. THE Template SHALL include a public/components/ directory for reusable frontend UI components

### Requirement 8: Error Handling

**User Story:** As a student, I want consistent error handling, so that I can debug issues easily.

#### Acceptance Criteria

1. WHEN an unhandled error occurs, THE API_Server SHALL return a structured error response containing an error code, a human-readable message, and the HTTP status code
2. THE Template SHALL include a global error handling middleware
3. WHEN a database error occurs, THE Template SHALL log the error and return an appropriate HTTP status code
4. THE Template SHALL include example error handling in controller functions
5. THE Template SHALL define a consistent set of structured error codes (e.g., VALIDATION_ERROR, NOT_FOUND, DATABASE_ERROR) used across all error responses
6. THE Template SHALL include a utility function or constants file that maps error codes to default HTTP status codes and messages

### Requirement 9: Environment Configuration

**User Story:** As a student, I want environment-specific configuration, so that I can use different settings for development and testing.

#### Acceptance Criteria

1. THE Template SHALL include a .env.example file with all required environment variables
2. THE Template SHALL include a .gitignore file that excludes .env and node_modules
3. WHEN the Assignment_Project starts, THE Template SHALL load environment variables from a .env file
4. THE Template SHALL include default values for all environment variables

### Requirement 10: Code Quality and Best Practices

**User Story:** As a module coordinator, I want the template to demonstrate best practices, so that students learn professional development standards.

#### Acceptance Criteria

1. THE Template SHALL include ESLint configuration for code linting
2. THE Template SHALL include a README.md that itself serves as an example of a well-structured README, containing a project title, brief description, setup instructions, available scripts, project structure overview, and technology list
3. THE Template SHALL include JSDoc comments on example functions
4. THE Template SHALL separate concerns between models, controllers, and routes
5. THE Template SHALL include example input validation using express-validator
6. THE Template SHALL use async/await for asynchronous operations
7. THE Template SHALL include CORS configuration for frontend-backend communication

### Requirement 11: Database Schema Example

**User Story:** As a student, I want example database schemas, so that I can understand how to define my own tables.

#### Acceptance Criteria

1. THE Template SHALL include a Drizzle schema definition in the exampleModel.js file
2. THE Template SHALL include example CRUD query functions in the exampleModel.js file using Drizzle ORM

### Requirement 12: API Endpoint Examples

**User Story:** As a student, I want example API endpoints, so that I can understand RESTful API design.

#### Acceptance Criteria

1. THE Template SHALL include example GET, POST, PUT, and DELETE endpoints in the exampleRoute.js file
2. THE Template SHALL demonstrate proper HTTP status code usage in the exampleController.js file
3. THE Template SHALL include request body validation examples in the exampleController.js file
4. THE Template SHALL separate route definitions in exampleRoute.js from controller logic in exampleController.js
5. THE Template SHALL include example GET endpoints in the exampleRoute.js file that demonstrate query parameter handling for filtering (e.g., `?completed=true` or `?search=term`)


### Requirement 13: Seamless First-Time Setup

**User Story:** As a student, I want the project to set itself up automatically when I first open it, so that I can start working on my assignment without manual configuration steps.

#### Acceptance Criteria

1. WHEN a student opens the Assignment_Project for the first time, THE Template SHALL automatically install all npm dependencies without requiring manual intervention
2. THE Template SHALL include a mechanism for automatic dependency installation (e.g., a postinstall script or VS Code task)
3. THE Template SHALL include a .vscode/extensions.json file that recommends the VS Code SQLite viewer extension and the REST Client extension
4. WHEN a student opens the Assignment_Project in VS Code, THE Dev_Environment SHALL prompt the student to install the recommended extensions
5. IF dependency installation fails, THEN THE Template SHALL display a clear error message indicating the failure reason
6. THE Template SHALL include a .vscode/settings.json file with sensible defaults including format on save, consistent tab size, and trailing whitespace trimming

### Requirement 14: Fresh Start Script and Health Check

**User Story:** As a student, I want a single command that resets everything and starts fresh, so that I can quickly recover from a broken state.

#### Acceptance Criteria

1. WHEN the command "npm run start:fresh" is executed, THE Template SHALL reset the Database to the Seeded_State, and start the Dev_Environment in sequence
2. WHEN the "npm run start:fresh" command completes the database reset, THE Template SHALL start the API_Server using the same mechanism as "npm run dev"
3. THE API_Server SHALL expose a GET /health endpoint that returns a 200 status code and a JSON body indicating the server is running
4. WHEN the GET /health endpoint is called, THE API_Server SHALL verify basic server availability and return a structured JSON response

### Requirement 15: Project Validation Script

**User Story:** As a tutor, I want to validate that a student's project structure is intact, so that I can quickly identify structural issues before reviewing code.

#### Acceptance Criteria

1. WHEN the command "npm run validate" is executed, THE Validation_Script SHALL check that all required files and directories exist in the Assignment_Project
2. WHEN the command "npm run validate" is executed, THE Validation_Script SHALL verify that all npm dependencies are installed
3. WHEN the command "npm run validate" is executed, THE Validation_Script SHALL attempt to start the API_Server and confirm it responds on the configured port
4. WHEN validation completes, THE Validation_Script SHALL display a summary listing each check as passed or failed
5. IF any validation check fails, THEN THE Validation_Script SHALL exit with a non-zero exit code

### Requirement 16: Submission Checklist

**User Story:** As a tutor, I want a standardized submission checklist, so that students submit complete and well-structured work.

#### Acceptance Criteria

1. THE Template SHALL include a .github/PULL_REQUEST_TEMPLATE.md file containing a submission checklist
2. THE Template SHALL include checklist items covering: all tests passing, API documentation generated, README updated, code linted, and database seed data included
3. WHEN a student creates a pull request on GitHub, THE Template SHALL auto-populate the pull request description with the submission checklist

### Requirement 17: Feature Development Guide

**User Story:** As a student, I want a step-by-step guide for adding new features, so that I can follow a consistent workflow when extending the project.

#### Acceptance Criteria

1. THE Template SHALL include a GUIDE.md file at the project root
2. THE Guide_Document SHALL walk through the complete process of adding a new feature: creating a model, creating a controller, creating a route, and creating a test
3. THE Guide_Document SHALL reference the example files (exampleModel.js, exampleController.js, exampleRoute.js) as starting points for each step
4. THE Guide_Document SHALL include instructions on how to register a new route in the main index.js file

### Requirement 18: API Request Collection

**User Story:** As a student, I want pre-built API request examples, so that I can test my endpoints without writing curl commands or using external tools.

#### Acceptance Criteria

1. THE Template SHALL include a .http or .rest file at the project root containing pre-built API requests for all example endpoints
2. THE Template SHALL include GET, POST, PUT, and DELETE request examples in the request collection file
3. THE Template SHALL include example request bodies and headers in the request collection file
4. THE Template SHALL recommend the VS Code REST Client extension in the .vscode/extensions.json file for executing the request collection
5. THE Template SHALL include GET request examples in the request collection file that demonstrate query parameter usage (e.g., `GET http://localhost:3000/api/tasks?completed=true` or `GET http://localhost:3000/api/tasks?search=term`)

### Requirement 19: AI Guardrails File

**User Story:** As a module coordinator, I want AI assistants to understand the project structure and constraints, so that students using AI tools receive guidance that fits the template patterns.

#### Acceptance Criteria

1. THE Template SHALL include an agents.md file at the project root
2. THE AI_Guardrails_File SHALL describe the project directory structure and the purpose of each directory (models, controllers, routes, utils, tests, public)
3. THE AI_Guardrails_File SHALL list the technology stack and version constraints (Express.js, libsql, Drizzle ORM, jest, supertest)
4. THE AI_Guardrails_File SHALL specify coding conventions including async/await usage, MVC separation, and JSDoc comment requirements
5. THE AI_Guardrails_File SHALL instruct AI assistants to avoid modifying Protected_Files (e.g., swagger configuration, database script, infrastructure files)
6. THE AI_Guardrails_File SHALL instruct AI assistants to follow the existing example file patterns when generating new models, controllers, or routes

### Requirement 20: Frontend Prompt Templates

**User Story:** As a student, I want pre-written prompt templates for frontend development, so that I can use AI tools effectively when building my user interface.

#### Acceptance Criteria

1. THE Template SHALL include a prompts/ directory at the project root
2. THE Template SHALL include prompt template files in the prompts/ directory focused on frontend web development tasks
3. THE Prompt_Templates SHALL cover common frontend tasks such as creating HTML pages, styling with CSS, making fetch API calls, and handling DOM events
4. THE Prompt_Templates SHALL reference the project structure and existing example files so AI-generated code fits the template patterns

### Requirement 21: Protected File Markers

**User Story:** As a module coordinator, I want infrastructure files clearly marked as do-not-modify, so that students do not accidentally break template-managed configuration.

#### Acceptance Criteria

1. THE Template SHALL include a do-not-modify comment header at the top of all Protected_Files (e.g., swagger configuration files, the database setup script, and other infrastructure files)
2. THE do-not-modify comment header SHALL follow the format: `// DO NOT MODIFY THIS FILE - This file is managed by the template`
3. THE Validation_Script SHALL check that Protected_Files still contain the do-not-modify comment header and report a warning if the header has been removed or altered

## Additional Recommendations

The following best practices are suggested for inclusion in the template:

1. **Logging**: Include a logging utility (e.g., winston or pino) for structured logging
2. **API Versioning**: Demonstrate API versioning pattern (e.g., /api/v1/)
3. **Request ID Tracking**: Include middleware for request ID generation for debugging
4. **Rate Limiting**: Include basic rate limiting example for API protection
5. **Database Connection Pooling**: Configure proper connection pooling for libsql
6. **Prettier Configuration**: Include Prettier for consistent code formatting
7. **Git Hooks**: Include husky for pre-commit hooks (linting, formatting)
8. **Docker Support**: Optional Dockerfile for containerization learning
9. **CI/CD Example**: Basic GitHub Actions workflow for running tests