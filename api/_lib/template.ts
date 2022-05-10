
import { readFileSync } from 'fs';
import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Favorit-Medium.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Favorit-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/FavoritMono-Medium.woff2`).toString('base64');

function getCss(theme: string, fontSize: string) {
    let foreground = 'black';

    if (theme === 'dark') {
        foreground = 'white';
    }
    return `
    @font-face {
        font-family: 'ABC Favorit';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: "ABC Favorit";
        font-style: "normal";
        font-display: "swap";
        font-weight: 700;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: "ABC Favorit Mono";
        font-style: "normal";
        font-display: "swap";
        font-weight: 400;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }
    body {
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

    .background-image {
        position: absolute;
        inset: 0;
        object-fit: cover;
        width: 100%;
        height: 101%;
        z-index: 0;
    }

    .content {
        position: relative;
        z-index: 1;
    }
    
    .heading {
        font-family: "ABC Favorit", -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: ${foreground};
        line-height: 1.8;
    }`;

}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, theme, md, fontSize } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontSize)}
    </style>
    <body>
        <img
        class="background-image"
        alt="Prysm background"
        src="https://nccmlpufieusnuqflhrr.supabase.co/storage/v1/object/public/squads-og-logos/squad-meta-share.png"
        />
        <div class="content">
            <div class="spacer">
            <div class="spacer">
            <div class="heading">${emojify(
        md ? marked(text) : sanitizeHtml(text)
    )}
            </div>
        </div>
    </body>
</html>`;
}