
import { readFileSync } from 'fs';
import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const regular = readFileSync(`${__dirname}/../.fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../.fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../.fonts/Vera-Mono.woff2`).toString('base64');

function getCss(theme: string, fontSize: string) {
    let background = 'white';
    let foreground = 'black';
    let radial = 'lightgray';

    if (theme === 'dark') {
        background = 'black';
        foreground = 'white';
        radial = 'dimgray';
    }
    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${regular}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        background: ${background};
        background-image: radial-gradient(${radial} 5%, transparent 0);
        background-size: 60px 60px;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .logo {
        margin: 0 75px;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        font-family: 'Inter', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: ${foreground};
        line-height: 1.8;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, theme, md, fontSize, images, widths, heights } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontSize)}
    </style>
    <body>
        <div>
            <div class="spacer">
            <div class="logo-wrapper">
                ${images.map((img, i) =>
                    getPlusSign(i) + getImage(img, widths[i], heights[i])
                ).join('')}
            </div>
            <div class="spacer">
            <div class="heading">${emojify(
                md ? marked(text) : sanitizeHtml(text)
            )}
            </div>
        </div>
    </body>
</html>`;
}

function getImage(url: string, width ='auto', height = '225') {
    const src = sanitizeHtml(url);
    return `<img class="logo" src="${src}" width="${width}" height="${height}" />`
}

function getPlusSign(i: number) {
    return i === 0 ? '' : '<div class="plus">+</div>';
}
