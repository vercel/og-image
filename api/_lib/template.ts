
import { readFileSync } from 'fs';
import { marked } from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const light = readFileSync(`${__dirname}/../_fonts/GothamPro-Light.woff2`).toString('base64');
const rglr = readFileSync(`${__dirname}/../_fonts/GothamPro-Medium.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/GothamPro-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');

function getCss(theme: string, fontSize: string) {
    // let background = 'white';
    let foreground = 'black';
    // let radial = 'lightgray';

    if (theme === 'dark') {
        // background = 'black';
        foreground = 'white';
        // radial = 'dimgray';
    }
    return `
    @font-face {
        font-family: 'GothamPro';
        font-style:  normal;
        font-weight: 300;
        src: url(data:font/woff2;charset=utf-8;base64,${light}) format('woff2');
    }

    @font-face {
        font-family: 'GothamPro';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'GothamPro';
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
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MjgiIHZpZXdCb3g9IjAgMCAxMjAwIDYyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTS0wLjAxOTI4NzEgMEgxMjAwVjYyOEgtMC4wMTkyODcxVjBaIiBmaWxsPSIjMTg1RENFIi8+CjxyZWN0IHg9IjYzOC4zNDgiIHk9Ii0yNDMuMzczIiB3aWR0aD0iNDI0Ljk4MiIgaGVpZ2h0PSIxMDMzLjIyIiB0cmFuc2Zvcm09InJvdGF0ZSgyNC45Njg4IDYzOC4zNDggLTI0My4zNzMpIiBmaWxsPSIjNENCRkZFIiBmaWxsLW9wYWNpdHk9IjAuNSIvPgo8L3N2Zz4K');
        background-size: cover;
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
        max-width: 60%;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .spacer {
        margin: 150px;
    }

    .spacer--small {
        margin: 40px;
    }


    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading--small {
        font-family: 'GothamPro', sans-serif;
        font-size: 66px;
        font-style: normal;
        font-weight: 300;
        color: ${foreground};
        line-height: 1.3;
    }
    
    .heading {
        font-family: 'GothamPro', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: ${foreground};
        line-height: 1.3;
    }
   
    .info-title {
      font-size: 2.6rem;
      font-weight: 300;
    }
    
    .info {
      font-size: 3rem;
      margin-top: -0.8em;
    }
    
    .info-wrapper{
      width: 40%;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;    
    }
    `;
}


export function getRNSHtmlTemplate(parsedReq: ParsedRequest) {
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
            <div class="spacer--small">
            <div class="logo-wrapper">
                ${images.map((img, i) =>
                    getPlusSign(i) + getImage(img, widths[i], heights[i])
                ).join('')}
            </div>
            <div class="spacer">
            <div class="heading--small">RNS Announcement</div>
            <div class="heading">${emojify(
                md ? marked(text) : sanitizeHtml(text)
            )}
            </div>
        </div>
    </body>
</html>`;
}

export function getCompanyHtmlTemplate(parsedReq: ParsedRequest) {
    const {  theme, md, fontSize, images, widths, heights, companyName, sharePrice, marketCap } = parsedReq;
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
                <div class="spacer--small">
                    <div class="logo-wrapper">
                        ${images.map((img, i) =>
                              getPlusSign(i) + getImage(img, widths[i], heights[i])).join('')
                        }
                    </div>
                    <div class="spacer">
                    <div class="heading">${emojify(md ? marked(<string>companyName) : sanitizeHtml(<string>companyName))}
                    <div class="info-wrapper"> 
                      <div>
                          <p class="info-title">Share price</p>
                          <p class="info">${sharePrice}</p>
                      </div>
                      <div>
                          <p class="info-title">Market cap</p>
                          <p class="info">${marketCap}</p>
                      </div>
                    </div>
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

function getPlusSign(i: number) {
    return i === 0 ? '' : '<div class="plus">+</div>';
}
