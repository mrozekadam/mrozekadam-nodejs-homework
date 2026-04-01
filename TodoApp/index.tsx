import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import NotFoundView from "./src/views/NotFoundView";
import todoController from "./src/controllers/todo.controller";

const app = new Hono();
const port = 6530;

app.route("/todo", todoController);

app.get("/", (c) => c.redirect("/todo"));
app.use("/*", serveStatic({ root: "./public" }));

app.notFound((c) => c.html(<NotFoundView />, 404));

serve({ fetch: app.fetch, port }, () => {
  console.log(`Server listening on port ${port}`);
});
