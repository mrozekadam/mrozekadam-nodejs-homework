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

    async getAll(): Promise<TSelect[]> {
        return this.db.select().from(this.table).all() as TSelect[];
    }

    async getById(id: number): Promise<TSelect | undefined> {
        return this.db.select().from(this.table).where(eq(this.table.id, id)).get() as TSelect | undefined;
    }

    async insert(data: TInsert) {
        return this.db.insert(this.table).values(data).returning().all();
    }

    async update(id: number, data: Partial<TInsert>) {
        return this.db.update(this.table).set(data).where(eq(this.table.id, id)).returning().all();
    }

    async delete(id: number) {
        return this.db.delete(this.table).where(eq(this.table.id, id)).returning().all();
    }
}
