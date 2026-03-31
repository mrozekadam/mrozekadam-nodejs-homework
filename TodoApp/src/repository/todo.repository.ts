import { todos } from "../db/schema";
import { BaseRepository } from "./base.repository";

export class TodoRepository extends BaseRepository<typeof todos> {
    constructor() {
        super(todos);
    }
}