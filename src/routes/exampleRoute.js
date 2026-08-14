// 📋 EXAMPLE FILE — use this as a reference when creating your own route file.
// Copy this file, rename it, and wire up your own controller functions.

/**
 * Route definitions for tasks. Maps HTTP methods to controller functions.
 * No business logic here — validation lives in the controller.
 */

import { Router } from 'express';
import { getAllTasks, getTaskById, createTask, patchTask, deleteTask } from '../controllers/exampleController.js';

export const exampleRouter = Router();

exampleRouter.get('/', getAllTasks);
exampleRouter.get('/:id', getTaskById);
exampleRouter.post('/', createTask);
exampleRouter.put('/:id', patchTask);
exampleRouter.delete('/:id', deleteTask);
