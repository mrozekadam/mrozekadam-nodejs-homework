import type { FC, PropsWithChildren } from "hono/jsx";

type Props = PropsWithChildren<{
  title?: string;
}>;

const Layout: FC<Props> = ({ title = "TodoApp", children }) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <link rel="stylesheet" href="/styles.css" />
    </head>
    <body>
      <nav>
        <a href="/">Home</a>
      </nav>
      {children}
    </body>
  </html>
);

export default Layout;
