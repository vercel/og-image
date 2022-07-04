
import { readFileSync } from 'fs';
import { marked } from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');

function getCss(theme: string) {
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
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
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
        background-image: radial-gradient(circle at 25px 25px, ${radial} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${radial} 2%, transparent 0%);
        background-size: 100px 100px;
        height: 100vh;
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

    .header { 
        display:flex;
        align-items:center;
        position:fixed;
        left: 0;
        top:0;
    }

    .logo {
        margin: 50px
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

    .footer-logo {
        display:flex;
        align-items:center;
        position:fixed;
        right: 0;
        bottom:0;
    }

    .title-wrapper {
        display:flex;
        flex-direction: column;
        justify-content:center;
    }

    .title {
        padding: 0px;
        font-family: 'Inter', sans-serif;
        font-size: 100px;
        font-style: normal;
        color: ${foreground};
        line-height: 0px;
        margin:0px;
        margin-top:-35px;
    }

    .image {
        position:fixed;
        top:500px;
    }
    
    .sub-title {
        padding: 0px;
        font-family: 'Inter', sans-serif;
        font-size: 50px;
        font-style: normal;
        color: ${foreground};
        line-height: 0px;
        margin:0px;
        margin-top:-50px;
    }`


}



export function getHtml(parsedReq: ParsedRequest) {
    const { text, theme, md,  widths, heights, subtitle, image } = parsedReq;
    const covalentLogoMark = 'https://www.covalenthq.com/static/images/branding/logo-mark/logo-mark-black.svg';
    
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme)}
    </style>
    <body>
        <div>
            <div class="header">
                ${getImage(covalentLogoMark, widths[0], heights[0])}
                <div class="title-wrapper">
                    <div class="title">
                        ${emojify(
                            md ? marked(text) : sanitizeHtml(text)
                        )}
                    </div>
                    <div class="sub-title">
                    ${emojify(
                        md ? marked(subtitle) : sanitizeHtml(subtitle)
                    )}
                    </div>
                </div>
            </div>
            <div class="image">
            ${getImage(image, widths[0], heights[0])}
            </div>
        </div>
    </body>
</html>`;
}

function getImage(src: string, width ='auto', height = '225') {
    return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
}

// ${covalentLogo.map((img, i) =>
//     getPlusSign(i) + getImage(img, widths[i], heights[i])
// ).join('')}

// <div class="title-wrapper">
// <div class="title">
//     ${emojify(
//         md ? marked(text) : sanitizeHtml(text)
//     )}
// </div>
// <div class="sub-title">
// ${emojify(
//     md ? marked(text) : sanitizeHtml(text)
// )}
// </div>
// </div>