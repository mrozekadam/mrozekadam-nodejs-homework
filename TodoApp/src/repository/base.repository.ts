import { db } from "../db";
import { InferInsertModel, InferSelectModel, eq } from "drizzle-orm";
import { SQLiteColumn, SQLiteTable } from "drizzle-orm/sqlite-core";

type TableWithId = SQLiteTable & { id: SQLiteColumn };

export class BaseRepository<T extends TableWithId, TSelect extends Record<string, any> = InferSelectModel<T>, TInsert extends Record<string, any> = InferInsertModel<T>> {
    protected db = db;
    protected table: T;

    constructor(table: T) {
        this.table = table;
    }

    getAll(): TSelect[] {
        return this.db.select().from(this.table).all() as TSelect[];
    }

    getById(id: number): TSelect | undefined {
        return this.db.select().from(this.table).where(eq(this.table.id, id)).get() as TSelect | undefined;
    }

    insert(data: TInsert) {
        return this.db.insert(this.table).values(data).returning();
    }

    update(id: number, data: Partial<TInsert>) {
        return this.db.update(this.table).set(data).where(eq(this.table.id, id)).returning();
    }

    delete(id: number) {
        return this.db.delete(this.table).where(eq(this.table.id, id)).returning();
    }
}
