import { Context, Hono } from "hono";
import IndexView from "../views/IndexView";
import DetailView from "../views/DetailView";
import { TodoRepository } from "../repository/todo.repository";
import { Todo } from "../db/schema";

const todoController = new Hono();
const todoRepository = new TodoRepository();

todoController.get("/", (c) => {
  const todos = todoRepository.getAll();
  return c.html(<IndexView title="TodoApp" todos={todos} />);
});

todoController.post("/create", async (c) => {
  const { title, description } = await c.req.parseBody();
  todoRepository.createTodo(title as string, description as string);

  return redirectBack(c, "/todo/");
});

todoController.get("/toggle/:id", async (c) => {
  const id = Number(c.req.param("id"));
  await todoRepository.toggleTodo(id);

  return redirectBack(c, "/todo/");
});

todoController.post("/update", async (c) => {
  const { id, title, description, priority } = await c.req.parseBody();
  todoRepository.updateTodo(Number(id), title as string, description as string, priority as string);

  return redirectBack(c, "/todo/");
});

todoController.get("/detail/:id", (c) => {
  const id = Number(c.req.param("id"));
  const todo = todoRepository.getById(id);

  return c.html(<DetailView title="TodoApp" todo={todo as Todo} />);
});

function redirectBack(c: Context, fallbackUrl: string) {
  const referer = c.req.header("Referer");
  return c.redirect(referer || fallbackUrl);
}

export default todoController;
