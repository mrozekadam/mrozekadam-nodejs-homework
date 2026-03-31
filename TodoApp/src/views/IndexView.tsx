import type { FC } from "hono/jsx";
import type { Todo } from "../db/schema";
import Layout from "../layouts/Layout";

type Props = {
  title?: string;
  todos: Todo[];
};

const IndexView: FC<Props> = ({ title, todos }) => (
  <Layout title={title}>
    <h1>Todos</h1>
    <ul class="todoList">
      {todos.map((todo) => (
        <li key={todo.id}>
          <a href={`/api/toggle/${todo.id}`}>
            <input type="checkbox" checked={todo.completed} />
            <span>{todo.title}</span>
          </a>
          <a href={`/detail/${todo.id}`}>Detail</a>
        </li>
      ))}
    </ul>
  </Layout>
);

export default IndexView;
