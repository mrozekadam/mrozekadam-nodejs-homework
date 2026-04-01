import type { FC } from "hono/jsx";
import type { Todo } from "../db/schema";
import Layout from "../layouts/Layout";

type Props = {
  title?: string;
  todo: Todo;
};

const PriorityEnum = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

const DetailView: FC<Props> = ({ title, todo }) => (
  <Layout title={title}>
    <div class="todo-detail">
      <h1>{todo.title}</h1>
      <div class="todo-detail__content">
        <p>
          <strong>Status:</strong> {todo.completed ? "Completed" : "Pending"}
        </p>
        <p>
          <strong>Created at:</strong> {todo.createdAt.toLocaleString()}
        </p>
        <form action="/api/update" method="post" class="todo-detail__form">
          <input type="hidden" name="id" value={todo.id} />
          <label htmlFor="title">
            Title
            <input type="text" id="title" name="title" value={todo.title} />
          </label>
          <label htmlFor="description">
            Description
            <input
              type="text"
              id="description"
              name="description"
              value={todo.description}
            />
          </label>
          <label htmlFor="priority">
            Priority
            <select id="priority" name="priority">
              {Object.values(PriorityEnum).map((priority) => (
                <option value={priority}>{priority.toUpperCase()}</option>
              ))}
            </select>
          </label>
          <div class="todo-detail__form__actions">
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
      <a href="/">Back to list</a>
    </div>
  </Layout>
);

export default DetailView;
