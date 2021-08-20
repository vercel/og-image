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

function getCss(templateImage: string, template: string, fontSize: string) {
    return `
    p,
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
        background-image: url(${templateImage});
        background-size: cover;
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
        padding: ${template === 'blog' ? '70px 50px' : '60px 50px'};
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .text-wrapper {
      margin: ${template === 'site' ? '0 auto' : '0'};
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
        margin: 0 40px;
        align-items: center;
        align-content: center;
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

    .breadcrumbs {
        font-family: 'Poppins', sans-serif;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #999;
        letter-spacing: 0.4px;
        padding-top: 0px;
        font-size: 35px;
    }

    .heading {
        font-family: 'Poppins', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: #000;
        line-height: 1.5;
        letter-spacing: 0.4px;
        padding-top: ${template === 'site' ? '100px' : '80px'};
        text-align: ${template === 'site' ? 'center' : 'left'};
    }

    .sub-heading {
        ${(template === 'docs' || template === 'learn') && 'max-width: 60%;'};
        font-family: 'Poppins', sans-serif;
        color: #777;
        letter-spacing: 0.4px;
        padding-top: 0px;
        font-size: 2.5rem;
        text-align: ${template === 'site' ? 'center' : 'left'};
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { template, templateImage, md, fontSize, images, widths, heights, intro, titleText, subtitleText, breadcrumbsText } = parsedReq;
    console.log(template)
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(templateImage, template, fontSize)}
    </style>
    <body>
        <div class="${intro ? 'intro' : 'wrapper'}">
            <div class="text-wrapper">
              ${(template === 'learn' || template === 'docs') && breadcrumbsText ? `<div class="breadcrumbs">${emojify(
                  md ? marked(breadcrumbsText) : sanitizeHtml(breadcrumbsText)
              )}
              </div>` : ''}
              <div class="heading">${emojify(
                  md ? marked(titleText) : sanitizeHtml(titleText)
              )}
              </div>
              ${subtitleText ? `<div class="sub-heading">${emojify(
                  md ? marked(subtitleText) : sanitizeHtml(subtitleText)
              )}
              </div>` : ''}
            </div>
            ${template === 'blog' && images.length ? (`<div class="logo-wrapper">
                ${images.map((img, i) =>
                    getImage(img, widths[i], heights[i], intro)
                )}
            </div>`) : ''}
        </div>
    </body>
</html>`
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

