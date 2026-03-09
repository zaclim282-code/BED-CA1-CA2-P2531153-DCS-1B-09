// 📋 EXAMPLE FILE — use this as a reference when creating your own route file.
// Copy this file, rename it, and wire up your own controller functions.

/**
 * Route definitions for tasks. Maps HTTP methods to controller functions.
 * Validation rules are declared inline; no business logic here.
 */

import { Router } from 'express';
import { body } from 'express-validator';
import * as controller from '../controllers/exampleController.js';

export const router = Router();

router.get('/', controller.getAllTasks);
router.get('/:id', controller.getTaskById);

router.post(
  '/',
  [body('title').notEmpty().withMessage('Title is required')],
  controller.createTask
);

router.put(
  '/:id',
  [body('title').optional().notEmpty().withMessage('Title is required')],
  controller.updateTask
);

router.delete('/:id', controller.deleteTask);

