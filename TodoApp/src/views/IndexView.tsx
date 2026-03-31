import type { FC } from "hono/jsx";
import type { Todo } from "../db/schema";
import Layout from "./Layout";

type Props = {
  title?: string;
  todos: Todo[];
};

const IndexView: FC<Props> = ({ title, todos }) => (
  <Layout title={title}>
    <h1>Todos</h1>
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <a href={`/api/toggle/${todo.id}`}>
            <input type="checkbox" checked={todo.completed} />
            <span>{todo.title}</span>
          </a>
        </li>
      ))}
    </ul>
  </Layout>
);

export default IndexView;
