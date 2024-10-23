import { pgTable, uniqueIndex, unique, timestamp, uuid, text } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const users = pgTable("users", {
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	id: uuid().primaryKey().notNull(),
	username: text().notNull(),
},
(table) => {
	return {
		usernameIdx: uniqueIndex("username_idx").using("btree", table.username.asc().nullsLast()),
		usersUsernameUnique: unique("users_username_unique").on(table.username),
	}
});
