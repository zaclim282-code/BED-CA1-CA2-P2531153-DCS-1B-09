// ✏️ EDIT THIS FILE — register your new routes here.
// Look for the comment "Add your routes here" below.

import express from 'express';
import cors from 'cors';
import { exampleRouter } from './src/routes/exampleRoute.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('src/frontend'));

// Routes
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/tasks', exampleRouter);

// Add your routes here, like this:
// app.use('/api/your-resource', yourRoutes);

// Only listen when run directly (not imported for testing)
const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the other process, or change the PORT value in index.js.`);
    process.exit(1);
  }
  throw err;
});

export default app;
