// 📋 EXAMPLE FILE — use this as a reference when creating your own controller.

import { validationResult } from 'express-validator';
import { db } from '../db/connection.js';
import * as model from '../models/exampleModel.js';
import { AppError } from '../utils/_errors.js';

/** Get all tasks. Supports `?completed=true|false` and `?search=term` query params. */
export async function getAllTasks(req, res, next) {
  try {
    const filters = {};

    if (req.query.completed !== undefined) {
      filters.completed = req.query.completed === 'true';
    }

    if (req.query.search) {
      filters.search = req.query.search;
    }

    const tasks = await model.getAll(db, filters);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
}

/** Get a single task by ID. */
export async function getTaskById(req, res, next) {
  try {
    const task = await model.getById(db, Number(req.params.id));

    if (!task) {
      throw new AppError('NOT_FOUND');
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

/** Create a new task. Validation rules are on the route; results checked here. */
export async function createTask(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new AppError('VALIDATION_ERROR', errors.array()[0].msg);
    }

    const task = await model.create(db, { title: req.body.title });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

/** Update a task by ID. Accepts `title` and/or `completed` in the body. */
export async function updateTask(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new AppError('VALIDATION_ERROR', errors.array()[0].msg);
    }

    const data = {};
    if (req.body.title !== undefined) data.title = req.body.title;
    if (req.body.completed !== undefined) data.completed = req.body.completed;

    const task = await model.update(db, Number(req.params.id), data);

    if (!task) {
      throw new AppError('NOT_FOUND');
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

/** Delete a task by ID. Returns 204 on success, 404 if not found. */
export async function deleteTask(req, res, next) {
  try {
    const task = await model.remove(db, Number(req.params.id));

    if (!task) {
      throw new AppError('NOT_FOUND');
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
