import { IncomingMessage, ServerResponse } from 'http';
import { parseRequest } from './_lib/parser';
import { getScreenshot } from './_lib/chromium';

const isDev = !process.env.AWS_REGION;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    try {
        const parsedReq = parseRequest(req);
        const file = await getScreenshot(parsedReq, isDev);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/png');
        res.end(file);
    } catch (e) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<h1>Internal Error</h1><p>${e.message}</p>`);
        console.error(e);
    }
}
