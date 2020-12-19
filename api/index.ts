import { IncomingMessage, ServerResponse } from 'http';
import { parseRequest } from './_lib/parser';
import { getArtScreenshot } from './_lib/chromium';
import { ArtParsedRequest } from './_lib/types';

const isDev = !process.env.AWS_REGION;
// const isHtmlDebug = process.env.OG_HTML_DEBUG === '1';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    try {
        const parsedRequest = parseRequest(req);

        let file: Buffer = Buffer.alloc(0);
        if (parsedRequest.type === 'art') {
            file = await getArtScreenshot((parsedRequest as ArtParsedRequest).hash, 'png', isDev);
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', `image/png`);
        res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
        res.end(file);
    } catch (e) {
        console.error(e);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>');
    }
}
