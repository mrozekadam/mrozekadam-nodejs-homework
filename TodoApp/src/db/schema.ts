import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todos', {
    id: int('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    completed: int('completed', { mode: 'boolean' }).notNull().default(false),
    createdAt: int('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
