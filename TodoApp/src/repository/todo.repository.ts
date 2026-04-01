import { Todo, todos } from "../db/schema";
import { BaseRepository } from "./base.repository";

export class TodoRepository extends BaseRepository<typeof todos> {
    constructor() {
        super(todos);
    }

    toggleTodo(id: number) {
        const todo = this.getById(id);
        if (!todo) {
            throw new Error("Todo not found");
        }
        this.update(id, { completed: !todo.completed });
        return this.getById(id);
    }

    createTodo(title: string, description: string) {
        this.insert({
            title,
            description,
            completed: false,
        });
    }

    updateTodo(id: number, title: string, description: string, priority: string) {
        this.update(id, {
            title,
            description,
            priority: priority as "low" | "medium" | "high",
        });
    }
}