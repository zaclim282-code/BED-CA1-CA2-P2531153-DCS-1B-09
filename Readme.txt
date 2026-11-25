| # Install dependencies
npm install

# Apply the Drizzle schema to the database
npm run db

# Populate the database with sample data
npm run seed

# Start the development server with automatic restarts
npm run dev|


Operation	Syntax drizzle/ SQL
SELECT	db.select().from(users)
INSERT	db.insert(users).values({...})
UPDATE	db.update(users).set({...})
DELETE	db.delete(users)

| Requirement | How your game could meet it |
|---|---|
| Express, libSQL, Drizzle, nodemon | Required project tools |
| User profile; change username | Player profile endpoints |
| Users table with string `user_id` primary key | `users` |
| Related table with a foreign key to users | `player_upgrades` |
| One notable game feature | Upgrade shop |
| Create, Read, Update, Delete routes | Create, view, rename, delete players |
| Dynamic route | `/users/:id` |
| Query parameter route | `/shop?maxCost=100` |
| Seed every table | Example players, upgrades, purchases |
| README and up to six presentation slides | Explain setup, rules, APIs and design |


| CA1: Backend | CA2: Frontend |
|---|---|
| Sell mangoes through a POST request | Click a “Sell” button |
| Buy upgrades through an API | Use a visual shop |
| Load coins and upgrades from the DB | Display saved progress |
| Update a username | Edit a profile onscreen |




BED-CA1-P2531153-DCS-1B-09/
│
├── index.js
├── package.json
├── drizzle.config.js
├── README.md
│
├── src/
│   ├── db/
│   │   ├── connection.js
│   │   ├── schema.js
│   │   └── seed.js
│   │
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── farmController.js
│   │   ├── inventoryController.js
│   │   └── marketController.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── farmRoutes.js
│   │   ├── inventoryRoutes.js
│   │   └── marketRoutes.js
│   │
│   └── middlewares/
│       ├── validateUser.js
│       ├── validatePurchase.js
│       └── errorHandler.js
│
└── node_modules/