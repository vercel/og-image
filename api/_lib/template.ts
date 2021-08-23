import { readFileSync } from "fs"
import { sanitizeHtml } from "./sanitizer"
import { ParsedRequest } from "./types"
const twemoji = require("twemoji")
const twOptions = { folder: "svg", ext: ".svg" }
const emojify = (text: string) => twemoji.parse(text, twOptions)

const rglr = readFileSync(
  `${__dirname}/../_fonts/Poppins-Regular.ttf`
).toString("base64")
const bold = readFileSync(`${__dirname}/../_fonts/Poppins-Bold.ttf`).toString(
  "base64"
)
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString(
  "base64"
)

function getCss(templateImage: string, template: string, fontSize: string, width: string, height: string) {
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

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    .container {
        height: 100vh;
        padding: ${template === "site" ? "0" : "0 50px"};
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .text__wrapper {
      flex-basis: ${template === 'blog' ? '60%' : '75%'};
      display: flex;
      ${template === 'site' ? 'align-items: center;': ''}
      margin: ${template === "site" ? "0 auto" : "0"};
      flex-direction: column;
    }

    .text__titles {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      margin: ${template === "site" ? "60px auto 0px auto" : "0"};
    }

    .text__breadcrumbs {
        position: absolute;
        top: 30px;
        left: 50px;
        display: flex;
        font-family: 'Poppins', sans-serif;
        justify-content: flex-start;
        align-items: center;
        color: #999;
        letter-spacing: 0.4px;
        margin-top: 10px;
        font-size: 35px;
    }

    .text__titles--title {
        font-family: 'Poppins', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        font-weight: 600;
        color: #1F2D3D;
        letter-spacing: 0.4px;
        text-align: ${template === "site" ? "center" : "left"};
        margin: ${template === "site" ? "0 auto" : "0"};

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }

    .text__titles--subtitle {
        font-family: 'Poppins', sans-serif;
        color: #777;
        margin-top: 10px;
        font-size: 2.5rem;
        text-align: ${template === "site" ? "center" : "left"};

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }

    .blog__image {
        flex-basis: 40%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .blog__image > .logo {
        border: ${(height === '250' && width === '250') ? 'none' : '1px solid #E0E6ED'};
        box-sizing: border-box;
        border-radius: 3px;
    }`
}

export function getHtml(parsedReq: ParsedRequest) {
  const {
    template,
    templateImage,
    fontSize,
    image,
    width,
    height,
    titleText,
    subtitleText,
    breadcrumbsText,
  } = parsedReq
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(templateImage, template, fontSize, height, width)}
    </style>
    <body>
      <div class="container">
        <div class="text__wrapper">
          <div class="text__breadcrumbs">
          ${((template === "learn" || template === "docs") && breadcrumbsText) ? emojify(
            sanitizeHtml(breadcrumbsText)
          ) : ''} 
          </div>
          <div class="text__titles">
            <div class="text__titles--title">${emojify(sanitizeHtml(titleText))} </div>
            <div class="text__titles--subtitle">
              ${subtitleText && emojify(
                sanitizeHtml(subtitleText)
              )} 
            </div>
          </div>
        </div>
        ${(template === "blog" &&
          image) ?
          `<div class="blog__image"> ${getImage(
            image,
            width,
            height
          )} </div>` : ''
        }
      </div>
    </body>
</html>`
}

function getImage(
  src: string,
  width = "auto",
  height = "240"
) {
  return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
}
