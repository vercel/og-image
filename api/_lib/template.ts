import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(
  `${__dirname}/../_fonts/Inter-Regular.woff2`,
).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString(
  'base64',
);
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString(
  'base64',
);

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
        font-size: 200px;
        font-style: normal;
        color: ${foreground};
        line-height: 1.8;
    }
    
    .description {
        font-family: 'Inter', sans-serif;
        font-size: 100px;
        font-style: normal;
        color: ${foreground};
        line-height: 1.8;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
  let { theme, images, contractName, version, description } =
    parsedReq;

  contractName = contractName === 'undefined' ? 'Contract' : contractName;
  description =
    description === 'undefined'
      ? 'Deploy this contract in one click'
      : description;
  version = version === 'undefined' ? '' : version;

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
            <div class="logo-wrapper">
            <img
                class="logo"
                alt="Generated Image"
                src="${sanitizeHtml(images[0])}"
                width="${sanitizeHtml('auto')}"
                height="${sanitizeHtml('150')}"
            />
        </div>
        <div class="heading">${emojify(sanitizeHtml(contractName))} ${emojify(
    sanitizeHtml(version),
  )}
        </div>
        <div class="description">${emojify(sanitizeHtml(description))}
        </div>
        </div>
    </body>
</html>`;
}