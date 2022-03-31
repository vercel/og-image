import { readFileSync } from "fs";
import marked from "marked";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";

const twemoji = require("twemoji");
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(
  `${__dirname}/../_fonts/Inter-Regular.woff2`
).toString("base64");
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString(
  "base64"
);
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString(
  "base64"
);

function getCss(theme: string, fontSize: string) {
  const rawFontSize = parseInt(fontSize.replace("px", ""));
  const kickerFontSize = `${rawFontSize * 0.3}px`;
  const subtitleFontSize = `${rawFontSize * 0.5}px`;

  let background = "white";
  let foreground = "black";

  if (theme === "dark") {
    background = "black";
    foreground = "white";
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
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border: 10px solid;
        border-width: 10px;
        border-image-source: linear-gradient(to left, #AA604F, #4B3A9D);
        border-image-slice: 1;
        box-sizing: border-box;
        margin: 0;
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
        box-shadow: 0px 0px 25px -10px black;
        border-radius: 50%;
        border: 5px solid white;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .container {
        margin-left: 3rem;
        margin-right: 3rem;
        display: flex;
        flex-direction: row;
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
        font-weight: bold;
        color: ${foreground};
        line-height: 1.125;
    }
    .kicker {
        font-family: 'Inter', sans-serif;
        color: ${foreground};
        font-size: ${sanitizeHtml(kickerFontSize)};
        text-transform: uppercase;
        font-weight: normal;
    }

    .subtitle {
        font-family: 'Inter', sans-serif;
        color: ${foreground};
        font-size: ${sanitizeHtml(subtitleFontSize)};
        font-weight: lighter;
    }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
  const {
    title,
    subtitle,
    kicker,
    theme,
    md,
    fontSize,
    mainImage,
    mainImageWidth,
    mainImageHeight,
  } = parsedReq;
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
            <div class="container">
                <div class="logo-wrapper">
                    ${getImage(mainImage, mainImageWidth, mainImageHeight)}
                </div>
            <div class="spacer">
            ${
              kicker
                ? `<div class="kicker">${emojify(
                    md ? marked(kicker) : sanitizeHtml(kicker)
                  )}</div>`
                : ""
            }
            <div class="heading">${emojify(
              md ? marked(title) : sanitizeHtml(title)
            )}
            </div>
            ${
              subtitle
                ? `<div class="subtitle">${emojify(
                    md ? marked(subtitle) : sanitizeHtml(subtitle)
                  )}</div>`
                : ""
            }
        </div>
    </body>
</html>`;
}

function getImage(src: string, width = "auto", height = "225") {
  return `<img
        class="logo"
        alt="Generated Image"
        loading="eager"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`;
}
