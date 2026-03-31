import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import IndexView from "./src/views/IndexView";
import NotFoundView from "./src/views/NotFoundView";
import { TodoRepository } from "./src/repository/todo.repository";

const app = new Hono();
const port = 6530;
const todoRepository = new TodoRepository();

app.get("/", (c) => {
  const todos = todoRepository.getAll();
  return c.html(<IndexView title="TodoApp" todos={todos} />);
});

app.get("/api/toggle/:id", async (c) => {
  const id = Number(c.req.param("id"));
  await todoRepository.toggleTodo(id);

  return c.redirect("/");
});

app.use("/*", serveStatic({ root: "./public" }));

app.notFound((c) => c.html(<NotFoundView />, 404));

serve({ fetch: app.fetch, port }, () => {
  console.log(`Server listening on port ${port}`);
});
