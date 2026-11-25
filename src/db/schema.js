// ✏️ EDIT THIS FILE — add your own table schemas below the example `tasks` table.
// After adding a new table, run `npm run db` to recreate the database.

/**
 * All table schemas live here. Add new tables below and run `npm run db` to apply.
 */

import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

/** Tasks table. */

// Table	Purpose
// users	Player profile, coins and username- DOne
// crops	Types of mangoes, growth times and prices -DOne

// farm_plots	Tracks crops planted by each player
// inventory	Tracks harvested mangoes owned by players
// shop_items	Seeds and upgrades available for purchase
// user_upgrades	Tracks upgrades purchased by players


export const users = sqliteTable('users', {
  userid: text('id').primaryKey(),
  username: text('username').notNull().unique(), 
  password: text('password').notNull(),
  coins : integer('coins').notNull().default(100)
  
});

export const crops = sqliteTable('crops', {
  cropId: text('crop_id').primaryKey(),
  name: text('name').notNull().unique(),
  seedCost: integer('seed_cost').notNull(),
  sellPrice: integer('sell_price').notNull(),
  growthTime: integer('growth_time').notNull(),
  
});