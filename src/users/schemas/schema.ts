import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email').unique(),
  username: varchar('username').unique().notNull(),
  password: varchar('password').notNull(),
});
