// 📋 EXAMPLE FILE — use this as a reference when creating your own controller.
// Controllers validate input, run the database queries, and format HTTP responses.
// Errors are handled with a try/catch in each function.

import { eq, like, and } from 'drizzle-orm';
import { db } from '../db/connection.js';
import { tasks } from '../db/schema.js';

/** Get all tasks. Supports `?completed=true|false` and `?search=term` query params. */
export const getAllTasks = async (req, res) => {
  try {
    const conditions = [];

    if (req.query.completed !== undefined) {
      conditions.push(eq(tasks.completed, req.query.completed === 'true'));
    }

    if (req.query.search) {
      conditions.push(like(tasks.title, `%${req.query.search}%`));
    }

    const rowsx = conditions.length > 0
      ? await db.select().from(tasks).where(and(...conditions))
      : await db.select().from(tasks);

    res.status(200).json(rowsx);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

/** Get a single task by ID. */
export const getTaskById = async (req, res) => {
  try {
    const rowsx = await db.select().from(tasks).where(eq(tasks.id, Number(req.params.id)));
    const task = rowsx[0];

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

/** Create a new task. `title` is required in the body. */
export const createTask = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const rowsx = await db.insert(tasks).values({ title: req.body.title }).returning();
    res.status(201).json(rowsx[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

/** Update a task by ID. Accepts `title` and/or `completed` in the body. */
export const patchTask = async (req, res) => {
  try {
    if (req.body.title !== undefined && !req.body.title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const data = {};
    if (req.body.title !== undefined) data.title = req.body.title;
    if (req.body.completed !== undefined) data.completed = req.body.completed;

    const rowsx = await db.update(tasks).set(data).where(eq(tasks.id, Number(req.params.id))).returning();
    const task = rowsx[0];

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

/** Delete a task by ID. Returns 204 on success, 404 if not found. */
export const deleteTask = async (req, res) => {
  try {
    const rowsx = await db.delete(tasks).where(eq(tasks.id, Number(req.params.id))).returning();

    if (!rowsx[0]) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
