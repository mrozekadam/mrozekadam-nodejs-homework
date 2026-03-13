import path from 'path';
import fs from 'fs';

/**
 * Sends a view to the client.
 */
export function view(viewName, res) {
    res.sendFile(path.join(process.cwd(), 'src', 'views', `${viewName}.html`));
}

/**
 * Renders the 404 view as HTML with a proper 404 status code.
 */
export function notFound(res) {
    const filePath = path.join(process.cwd(), 'src', 'views', '404.html');
    const html = fs.readFileSync(filePath, 'utf-8');
    res.status(404).send(html);
}