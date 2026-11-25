// ✏️ EDIT THIS FILE — add seed data for your own tables below the example tasks.

/**
 * Seed data and database reset script. Run with: npm run db
 *
 * To add your own seed data:
 *   1. Import your table schema from './schema.js'
 *   2. Add a sample data array
 *   3. Insert it inside the seed() function with db.insert()
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Import your table schemas here

// import { db } from "./connection.js";
import { users, crops } from "./schema.js";

// --- Seed data ---


/** Sample tasks inserted when the database is reset. */

/** Insert seed data into the database. */
const sampleUsers = [
  {
    userid: "player001",
    username: "Alice",
    password: "demo-only",
    coins: 100
  },
  {
    userid: "player002",
    username: "Bob",
    password: "demo-only",
    coins: 150
  }
];

const sampleCrops = [
  {
    cropId: "crop001",
    name: "Regular Mango",
    seedCost: 10,
    sellPrice: 20,
    growthTime: 60
  },
  {
    cropId: "crop002",
    name: "Golden Mango",
    seedCost: 30,
    sellPrice: 60,
    growthTime: 180
  }
];

// --- Seed function ---

export const seed = async (db) => {
  await db.insert(users).values(sampleUsers);
  console.log(`Inserted ${sampleUsers.length} users`);

  await db.insert(crops).values(sampleCrops);
  console.log(`Inserted ${sampleCrops.length} crops`);
};

// --- Database reset (no need to modify below) ---
// This alr import  connection.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');

const dbUrl = 'file:local.db';
const dbPath = dbUrl.replace('file:', '');
const absoluteDbPath = path.resolve(projectRoot, dbPath);

const resetDatabase = async () => {
  try {
    // Step 1 — Delete the old database file
    if (fs.existsSync(absoluteDbPath)) {
      fs.unlinkSync(absoluteDbPath);
      console.log(`Deleted old database: ${dbPath}`);
    }

    // Step 2 — Recreate tables from schema.js
    console.log('Creating tables from schema...');
    execSync('npx drizzle-kit push', {
      cwd: projectRoot,
      stdio: 'inherit',
    });

    // Step 3 — Insert seed data
    console.log('Seeding database...');
    const { db } = await import('./connection.js');
    await seed(db);

    console.log('Done! Database is ready.');
  } catch (error) {
    console.error('Failed to reset database:', error.message);
    process.exit(1);
  }
};

resetDatabase();
