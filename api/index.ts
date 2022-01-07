import { IncomingMessage, ServerResponse } from 'http';
import { parseRequest } from './_lib/parser';
import { Template } from './_lib/template';
import { renderToStaticMarkup } from 'react-dom/server';
import sharp from 'sharp';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    try {
        const parsedReq = parseRequest(req);
        const { fileType } = parsedReq;
        
        const svgStart = Date.now()
        const svg = renderToStaticMarkup(Template(parsedReq));
        console.log('Rendered jsx to html in', Date.now() - svgStart, 'ms')
        
        const sharpStart = Date.now()
        const file = await sharp(Buffer.from(svg)).resize(1280, 640).toFormat(fileType).toBuffer()
        console.log(`Rendered svg to ${fileType} in`, Date.now() - sharpStart, 'ms')

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
