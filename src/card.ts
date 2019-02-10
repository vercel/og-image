import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parseRequest } from './parser';
import { getScreenshot } from './chromium';
import { getHtml } from './template';
import { writeTempFile, pathToFileURL } from './file';

const isDev = !process.env.NOW_REGION;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    try {
        const parsedReq = parseRequest(req);
        const html = getHtml(parsedReq);
        const { text, fileType } = parsedReq;
        const filePath = await writeTempFile(text, html);
        const fileUrl = pathToFileURL(filePath);
        const file = await getScreenshot(fileUrl, fileType, isDev);
        res.statusCode = 200;
        res.setHeader('Content-Type', `image/${fileType}`);
        res.setHeader('Cache-Control', `public, immutable, no-transform, max-age=31536000`);
        res.end(file);
    } catch (e) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>');
        console.error(e);
    }
}


if (isDev) {
    const PORT = process.env.PORT || 13463;
    const listen = () => console.log(`Listening on ${PORT}...`);
    createServer(handler).listen(PORT, listen);
}
