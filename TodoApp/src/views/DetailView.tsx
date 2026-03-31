import type { FC } from "hono/jsx";
import type { Todo } from "../db/schema";
import Layout from "../layouts/Layout";

type Props = {
  title?: string;
  todo: Todo;
};

const DetailView: FC<Props> = ({ title, todo }) => (
  <Layout title={title}>
    <h1>{todo.title}</h1>
    <div class="detail">
      <p><strong>Status:</strong> {todo.completed ? "Completed" : "Pending"}</p>
      <p><strong>Created at:</strong> {todo.createdAt.toLocaleString()}</p>
      <a href="/">Back to list</a>
    </div>
  </Layout>
);

export default DetailView;
