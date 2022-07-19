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

function getCss() {

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
        background-color: black;
        margin: 100px;
    }

    .purple-gradient {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 30%;
      z-index: -1;
    }

    .blue-gradient {
      position: absolute;
      top: 0;
      right: 0;
      z-index: -1;
    }

    .right-side {
      margin-right: 60px;
      margin-left: 60px;
    }

    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 60px;
      margin-bottom: 40px;

    }

    .hexagon { 
      width: 200px;
      height: 200px;
    }

    .container {
      display: flex;
      justify-content: space-between;
    }

    .spacer {
        margin: 150px;
    }
    
    .heading {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        max-width: 1400px;
        overflow: hidden;
        font-family: 'Inter', sans-serif;
        font-size: 130px;
        font-style: normal;
        font-weight: bold;
        color: white;
        line-height: 1.8;
    }
    
    .description {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-family: 'Inter', sans-serif;
        font-size: 60px;
        font-style: normal;
        color: white;
        opacity: 50%
    }

    .releaser {
        font-family: 'Inter', sans-serif;
        font-size: 40px;
        font-style: normal;
        color: white;
    }
    `
    ;
}

export function shortenString(str: string, extraShort?: true) {
  return `${str.substring(0, extraShort ? 4 : 6)}...${str.substring(
    str.length - (extraShort ? 3 : 4),
  )}`;
}

export function getHtml(parsedReq: ParsedRequest) {
  let { contractName, version, description, releaser } = parsedReq;

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
        ${getCss()}
    </style>
    <body>
      <img
        class="purple-gradient"
        alt="Generated Image"
        src="https://thirdweb.com/assets/og-image/purple-gradient.png"
      />
      <img
        class="blue-gradient"
        alt="Generated Image"
        src="https://thirdweb.com/assets/og-image/blue-gradient.png"
      />
    <div>
      <div class="container">
        <div>
          <div class="heading">
            ${emojify(sanitizeHtml(contractName))} ${emojify(sanitizeHtml(version))}
          </div>
          <div class="description">
            ${emojify(sanitizeHtml(description))}
          </div>
        </div>
        <div class="right-side">
          <div class="avatar">
            <svg class="hexagon" width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <mask id="mask0_1516_1492" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="3" width="128" height="122">
              <path d="M123.681 48.2373C119.01 38.4153 113.564 28.9815 107.393 20.0255L105.402 17.1647C102.952 13.6093 99.7402 10.6445 96.0006 8.48571C92.261 6.32692 88.0869 5.02838 83.7828 4.68444L80.2883 4.40284C69.4465 3.53239 58.553 3.53239 47.7116 4.40284L44.2171 4.68444C39.9128 5.02838 35.7391 6.32692 31.9994 8.48571C28.2598 10.6445 25.048 13.6093 22.5975 17.1647L20.6071 20.0511C14.4362 29.0071 8.98949 38.4409 4.31874 48.2629L2.81471 51.4246C0.96151 55.3241 0 59.5873 0 63.9048C0 68.2223 0.96151 72.4855 2.81471 76.385L4.31874 79.5467C8.98949 89.369 14.4362 98.8028 20.6071 107.758L22.5975 110.645C25.048 114.2 28.2598 117.165 31.9994 119.324C35.7391 121.483 39.9128 122.782 44.2171 123.125L47.7116 123.407C58.553 124.277 69.4465 124.277 80.2883 123.407L83.7828 123.125C88.0901 122.777 92.2662 121.473 96.0058 119.307C99.746 117.141 102.956 114.169 105.402 110.607L107.393 107.72C113.564 98.7644 119.01 89.3306 123.681 79.5083L125.185 76.3466C127.038 72.4471 128 68.1839 128 63.8664C128 59.5489 127.038 55.2857 125.185 51.3862L123.681 48.2373Z" fill="white"/>
              </mask>
              <g mask="url(#mask0_1516_1492)">
              <rect width="128" height="128" fill="url(#pattern0)"/>
              </g>
              <defs>
              <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlink:href="#image0_1516_1492" transform="scale(0.0078125)"/>
              </pattern>
              <image id="image0_1516_1492" width="128" height="128" xlink:href="data:image/png;base64,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"/>
              </defs>
            </svg>
          </div>
        
          <div class="releaser">
            ${emojify(sanitizeHtml(releaser.startsWith("0x") ? shortenString(releaser) : releaser))}
          </div>
        </div>
      </div>

    </div>
  </body>
</html>`;
}
