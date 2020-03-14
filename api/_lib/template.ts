import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
import { readFileSync } from 'fs';

const ipaGp = readFileSync(`${__dirname}/../_fonts/ipagp_web.woff2`).toString('base64');

function getCss(theme: string, fontSize: string) {
    let background = 'white';
    let foreground = 'black';

    if (theme === 'dark') {
        background = 'black';
        foreground = 'white';
    }
    return `
    @font-face {
        font-family: "IPA PGothic";
        src: url(data:font/woff2;charset=utf-8;base64,${ipaGp}) format('woff2');
    }

    body {
        font-family: "IPA PGothic";
        background-color: ${background};
        background-image: 
        repeating-linear-gradient(        transparent, transparent 50px, rgba(0,0,0,.1) 50px, rgba(0,0,0,.1) 53px, transparent 53px, transparent 63px, rgba(0,0,0,.1) 63px, rgba(0,0,0,.1) 66px, transparent 66px, transparent 116px, rgba(0,0,0,.1) 116px, rgba(0,0,0,.1) 166px, rgba(255,255,255,.2) 166px, rgba(255,255,255,.2) 169px, rgba(0,0,0,.1) 169px, rgba(0,0,0,.1) 179px, rgba(255,255,255,.2) 179px, rgba(255,255,255,.2) 182px, rgba(0,0,0,.1) 182px, rgba(0,0,0,.1) 232px, transparent 231px),
        repeating-linear-gradient( 90deg, transparent, transparent 50px, rgba(0,0,0,.1) 50px, rgba(0,0,0,.1) 53px, transparent 53px, transparent 63px, rgba(0,0,0,.1) 63px, rgba(0,0,0,.1) 66px, transparent 66px, transparent 116px, rgba(0,0,0,.1) 116px, rgba(0,0,0,.1) 166px, rgba(255,255,255,.2) 166px, rgba(255,255,255,.2) 169px, rgba(0,0,0,.1) 169px, rgba(0,0,0,.1) 179px, rgba(255,255,255,.2) 179px, rgba(255,255,255,.2) 182px, rgba(0,0,0,.1) 182px, rgba(0,0,0,.1) 232px, transparent 232px),
        repeating-linear-gradient(125deg, transparent, transparent 2px, rgba(0,0,0,.2) 2px, rgba(0,0,0,.2) 3px, transparent 3px, transparent 5px, rgba(0,0,0,.2) 5px);
        color: ${foreground};
        height: 100vh;
        font-size: ${sanitizeHtml(fontSize)};
        margin: 50px;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, theme, md, fontSize} = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontSize)}
    </style>
    <body>
      ${ md ? marked(text) : sanitizeHtml(text) }
    </body>
</html>`;
}
