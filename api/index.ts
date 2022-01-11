import { IncomingMessage, ServerResponse } from 'http';
import { join } from 'path';
import { parseRequest } from './_lib/parser';
import { Template } from './_lib/template';
import { renderToStaticMarkup } from 'react-dom/server';
import { Canvas, GlobalFonts, Image, convertSVGTextToPath } from '@napi-rs/canvas'

GlobalFonts.registerFromPath(join(__dirname, '_fonts', 'Inter-Regular.ttf'));
GlobalFonts.registerFromPath(join(__dirname, '_fonts', 'Inter-Bold.ttf'));
GlobalFonts.registerFromPath(join(__dirname, '_fonts', 'Licorice-Regular.ttf'));

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    try {
        const parsedReq = parseRequest(req);
        const { fileType } = parsedReq;

        const svgStart = Date.now()
        const svg = renderToStaticMarkup(Template(parsedReq));
        console.log('Rendered jsx to html in', Date.now() - svgStart, 'ms')

        const canvasStart = Date.now()
        const img = new Image()
        img.src = convertSVGTextToPath(svg);
        img.width = 1280;
        img.height = 640;
        const canvas = new Canvas(img.width, img.height);
        const ctx = canvas.getContext('2d');
        ctx.font = '30px Licorice';
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const buffer = await canvas.encode(fileType as any);
        console.log(`Rendered canvas to ${fileType} in`, Date.now() - canvasStart, 'ms')
        
        res.statusCode = 200;
        res.setHeader('Content-Type', `image/${fileType}`);
        res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
        res.end(buffer);
    } catch (e) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>');
        console.error(e);
    }
}
