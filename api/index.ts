import { IncomingMessage, ServerResponse } from 'http';
import { join } from 'path';
import { parseRequest } from './_lib/parser';
import { Template } from './_lib/template';
import { renderToStaticMarkup } from 'react-dom/server';
import { render } from '@resvg/resvg-js'

const fontFiles = [
  join(__dirname, '_fonts', 'Inter-Regular.ttf'),
  join(__dirname, '_fonts', 'Inter-Bold.ttf'),
  join(__dirname, '_fonts', 'Licorice-Regular.ttf'),
]


export default async function handler(req: IncomingMessage, res: ServerResponse) {
    try {
        const parsedReq = parseRequest(req);
        const { fileType, theme } = parsedReq;

        if (fileType !== 'png') {
            throw new Error('Only PNG is supported');
        }
        
        const svgStart = Date.now()
        const svg = renderToStaticMarkup(Template(parsedReq));
        console.log('Rendered jsx to html in', Date.now() - svgStart, 'ms')
        
        const pngStart = Date.now()
        const buffer = render(svg, {
            background: theme === 'light' ? '#FFFFFF' : '#000000',
            fitTo: {
                mode: 'width',
                value: 1280,
            },
            font: {
                fontFiles, // Load custom fonts.
                loadSystemFonts: false, // It will be faster to disable loading system fonts.
                defaultFontFamily: 'Licorice',
            },
            // imageRendering: 1,
            // shapeRendering: 2,
            logLevel: 'debug',
        })
        console.log('Rendered image in', Date.now() - pngStart, 'ms')

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
