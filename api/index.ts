import { IncomingMessage, ServerResponse } from 'http';
import { parseRequest } from './_lib/parser';
import { Template } from './_lib/template';
import { renderToStaticMarkup } from 'react-dom/server';
import sharp from 'sharp'

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    try {
        const parsedReq = parseRequest(req);
        const svg = renderToStaticMarkup(Template(parsedReq));
        const { fileType } = parsedReq;
        const file = await sharp(Buffer.from(svg)).resize(1280, 640).toFormat(fileType).toBuffer();
        res.statusCode = 200;
        res.setHeader('Content-Type', `image/${fileType}`);
        res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
        res.end(file);
    } catch (e) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>');
        console.error(e);
    }
}
