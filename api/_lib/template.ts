
import { readFileSync } from 'fs';
import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Poppins-Regular.ttf`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Poppins-Bold.ttf`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');
const bgImg = readFileSync(`${__dirname}/../_imgs/background.png`).toString('base64');

function getCss(_theme: string, fontSize: string) {
    return `
    body {
        padding: 0;
        margin: 0;
    }

    @font-face {
        font-family: 'Poppins';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/ttf;charset=utf-8;base64,${rglr}) format('ttf');
    }

    @font-face {
        font-family: 'Poppins';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/ttf;charset=utf-8;base64,${bold}) format('ttf');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        background-image: url(data:image/png;base64,${bgImg});
        background-size: 512x 512px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .intro {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .wrapper {
        padding: 100px;
    }

    .intro .heading {
        display: none;
    }

    code {
        color: #FF4949;
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
    }

    .logo {
        margin: 0 0 55px;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    .heading,
    .sub-heading {
        font-family: 'Poppins', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: #000;
        line-height: 1.5;
        letter-spacing: 0.4px;
        padding-top: 80px;
    }

    .sub-heading {
        letter-spacing: 0.4px;
        padding-top: 0px;
        font-size: 55px;
    }

    .authors {
        display: flex;
        font-family: 'Poppins', sans-serif;
        font-size: 50px;
        font-style: normal;
        color: #000;
        padding: 0 100px 100px;
    }

    .authors .author {
        display: flex;
        align-items: center;
        margin-right: 50px;
    }

    .authors .author img {
        margin-right: 5px;
        border-radius: 9999px;
        width: 60px;
        border: 2px solid #fff;
        box-sizing: border-box;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, theme, md, fontSize, images, widths, heights, intro, subTitle, authors, authorsImg } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontSize)}
    </style>
    <body>
        <div class="${intro ? 'intro' : 'wrapper'}">
            <div class="logo-wrapper">
                ${images.map((img, i) =>
                    getPlusSign(i) + getImage(img, widths[i], heights[i], intro)
                ).join('')}
            </div>
            <div class="heading">${emojify(
                md ? marked(text) : sanitizeHtml(text)
            )}
            </div>
            ${subTitle ? `<div class="sub-heading">${emojify(
                md ? marked(subTitle) : sanitizeHtml(subTitle)
            )}
            </div>` : ''}
        </div>
        ${authors && authors.length ? `<div class="authors">
            ${authors.map((name, i) =>
                `<div class="author">
                    <img src="${authorsImg[i]}" /> ${name}
                </div>`
            ).join('')}
        </div>`: ''}
    </body>
</html>`;
}

function getImage(src: string, width ='auto', height = '40', isIntro = false) {
    return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(isIntro ? '80' : height)}"
    />`
}

function getPlusSign(i: number) {
    return i === 0 ? '' : '<div class="plus">+</div>';
}
