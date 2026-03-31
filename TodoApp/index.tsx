import { Context, Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import IndexView from "./src/views/IndexView";
import DetailView from "./src/views/DetailView";
import NotFoundView from "./src/views/NotFoundView";
import { TodoRepository } from "./src/repository/todo.repository";
import { Todo } from "./src/db/schema";

const app = new Hono();
const port = 6530;
const todoRepository = new TodoRepository();

app.get("/", (c) => {
  const todos = todoRepository.getAll();
  return c.html(<IndexView title="TodoApp" todos={todos} />);
});

app.post("/api/create", async (c) => {
  const { title, description } = await c.req.parseBody();
  todoRepository.createTodo(title as string, description as string);

  return redirectBack(c, "/");
});

app.get("/api/toggle/:id", async (c) => {
  const id = Number(c.req.param("id"));
  await todoRepository.toggleTodo(id);

  return redirectBack(c, "/");
});

app.get("/detail/:id", (c) => {
  const id = Number(c.req.param("id"));
  const todo = todoRepository.getById(id);

  return c.html(<DetailView title="TodoApp" todo={todo as Todo} />);
});

app.use("/*", serveStatic({ root: "./public" }));

app.notFound((c) => c.html(<NotFoundView />, 404));

serve({ fetch: app.fetch, port }, () => {
  console.log(`Server listening on port ${port}`);
});

function redirectBack(c: Context, fallbackUrl: string) {
  const referer = c.req.header("Referer");
  return c.redirect(referer || fallbackUrl);
}
