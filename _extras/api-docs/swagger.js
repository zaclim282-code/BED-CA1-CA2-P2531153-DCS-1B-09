// ⚠️ DO NOT MODIFY THIS FILE — it is part of the project infrastructure.
// It auto-generates Swagger API docs from your route files.
// The only change you should make is adding your new route files to the `routes` array below.

/**
 * Swagger API documentation setup.
 *
 * Auto-generates API docs from Express route files and mounts
 * Swagger UI at /api-docs. Called by index.js on server startup.
 *
 * @module _extras/api-docs/swagger
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import swaggerAutogen from 'swagger-autogen';
import swaggerUi from 'swagger-ui-express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..', '..');

/**
 * Generate Swagger documentation from Express route files and mount
 * Swagger UI on the provided Express app at /api-docs.
 *
 * @param {import('express').Express} app - The Express application instance.
 */
export async function setupSwagger(app) {
  const doc = {
    info: {
      title: 'Student Assignment API',
      description: 'Auto-generated API documentation',
    },
    host: `localhost:${process.env.PORT || 3000}`,
    schemes: ['http'],
  };

  const outputFile = join(__dirname, 'swagger-output.json');
  const routes = [join(projectRoot, 'src', 'routes', 'exampleRoute.js')];

  const generate = swaggerAutogen();
  await generate(outputFile, routes, doc);

  const swaggerDocument = JSON.parse(readFileSync(outputFile, 'utf-8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
