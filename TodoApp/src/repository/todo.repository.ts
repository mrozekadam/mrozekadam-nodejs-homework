import { todos } from "../db/schema";
import { BaseRepository } from "./base.repository";

export class TodoRepository extends BaseRepository<typeof todos> {
    constructor() {
        super(todos);
    }

    async toggleTodo(id: number) {
        const todo = await this.getById(id);
        if (!todo) {
            throw new Error("Todo not found");
        }
        await this.update(id, { completed: !todo.completed });
        return this.getById(id);
    }

    async createTodo(title: string, description: string) {
        await this.insert({
            title,
            description,
            completed: false,
        });
    }

    async updateTodo(id: number, title: string, description: string, priority: string) {
        await this.update(id, {
            title,
            description,
            priority: priority as "low" | "medium" | "high",
        });
    }
}