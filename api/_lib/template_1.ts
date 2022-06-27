import { readFileSync } from 'fs';
import { marked } from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Montserrat-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Montserrat-SemiBold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');

function getCss(theme: string, fontSize: string, backgroundImg: string, clipping: boolean) {
    let background = 'white';
    let foreground = '#002251';
    // let radial = 'lightgray';

    if (theme === 'dark') {
        background = 'black';
        foreground = 'white';
        // radial = 'dimgray';
    }
    return `
    @font-face {
        font-family: 'Montserrat';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Montserrat';
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
        margin: 0;
        background-image: url('${backgroundImg}');
        background-size: contain;
        background-repeat: no-repeat;
        width: ${clipping ? 800 : 1200}px;
        height: ${clipping ? 800 : 630}px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: row;
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
      justify-content: center;
      flex-direction: column;
      width: 50%;
    }

    .logo-wrapper img {
        border-radius: 50%;
    }

    .spacer {
        margin: 150px;
    }

    .center-heading {
        text-align: center;
        width: 70%;
        font-family: 'Montserrat', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: ${foreground};
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        font-family: 'Montserrat', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: ${foreground};
        padding-left: 60px;
    }

    .title {
      width: 50%;
    }`;
}

export function getHtml(parsedReq: ParsedRequest, clipping: boolean) {
    const { text, theme, md, fontSize, images, widths, heights, background } = parsedReq;
    let body = `
    <div class="title">
        <div class="heading">
        ${emojify(
            md ? marked(text) : sanitizeHtml(text)
        )}
        </div>
    </div>
    <div class="logo-wrapper">
    ${getImage(images[0], widths[0], heights[0])}
    </div>
    `
    
    if (clipping) {
        body = `
        <div class="center-heading">
        <strong>${emojify(
            md ? marked(text) : sanitizeHtml(text)
        )}</strong>
        </div>
        `
    }
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontSize, background, clipping)}
    </style>
    <body>
    ${body}
    </body>
</html>`;
}

function getImage(src: string, width ='auto', height = '280') {
    return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
}