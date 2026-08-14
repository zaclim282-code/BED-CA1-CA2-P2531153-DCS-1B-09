// ⚠️ DO NOT MODIFY THIS FILE — it is part of the project infrastructure.
// It sets up the database connection. Just import { db } from this file in your controllers.

import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const client = createClient({
  url: 'file:local.db',
});

export const db = drizzle(client);
