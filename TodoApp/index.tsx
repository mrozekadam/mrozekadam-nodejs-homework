import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import IndexView from './src/views/IndexView';
import NotFoundView from './src/views/NotFoundView';

const app = new Hono();
const port = 3000;

app.get('/', (c) => c.html(<IndexView title="TodoApp" />));

app.use('/*', serveStatic({ root: './public' }));

app.notFound((c) => c.html(<NotFoundView />, 404));

serve({ fetch: app.fetch, port }, () => {
    console.log(`Server listening on port ${port}`);
});
