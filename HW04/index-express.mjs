import express from 'express';
import { isStaticFile, serveStaticFile } from './src/helpers/staticFileHelper.mjs';
import { view, notFound } from './src/helpers/viewHelper.mjs';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    view('index', res);
});

app.get('*splat', async (req, res) => {
    const requestedFile = req.params.splat.join('/');
    
    if (await isStaticFile(requestedFile)) {
        await serveStaticFile(requestedFile, res);
    } else {
        notFound(res);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
