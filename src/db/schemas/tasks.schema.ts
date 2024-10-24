import * as p from 'drizzle-orm/pg-core';
import { timestamps } from './helpers.schema';
import { relations } from 'drizzle-orm';
import users from './users.schema';

const tasks = p.pgTable(
  'tasks',
  {
    ...timestamps,
    id: p.uuid().primaryKey().defaultRandom(),
    title: p.text(),
    body: p.text(),
    completed: p.boolean().default(false).notNull(),
    userId: p
      .uuid()
      .notNull()
      .references(() => users.id),
  },
  (table) => {
    return {
      titleIndex: p.uniqueIndex('title_idx').on(table.title),
    };
  },
);

export const tasksRelations = relations(tasks, ({ one }) => ({
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
  }),
}));

export default tasks;
