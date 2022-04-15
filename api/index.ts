import { IncomingMessage, ServerResponse } from 'http';
import { parseRequest } from './_lib/parser';
import { getScreenshot } from './_lib/chromium';
import path from 'path'
import { JSONResponse } from './_lib/types';

const isDev = !process.env.AWS_REGION;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    try {
        const parsedReq = parseRequest(req);
        const { responseFormat, width, height, itemID, itemType } = parsedReq;

        const url = path.join(process.env.NAVATTIC_CAPTURE_PLAYER_URL || '', itemType === 'node' ? 'n' : '', itemID)
        console.log('requesting', url)
        // file will be a buffer (binary data) if responseFormat is jpeg and it will be a string if responseFormat is json
        const file = await getScreenshot(url, width, height, isDev, responseFormat);
        res.statusCode = 200;
        res.setHeader('Content-Type', responseFormat === 'jpeg' ? 'image/jpeg' : 'application/json');
        res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
        if (responseFormat === 'json') {
            const resp : JSONResponse = {
                screenshot: <string> file
            }
            res.end(JSON.stringify(resp))
            return
        }
        res.end(file);
    } catch (e) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>');
        console.error(e);
    }
}
