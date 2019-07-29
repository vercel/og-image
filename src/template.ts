// import { readFileSync } from "fs"
import marked from "marked"
import { sanitizeHtml } from "./sanitizer"
const twemoji = require("twemoji")
const twOptions = { folder: "svg", ext: ".svg" }
const emojify = (text: string) => twemoji.parse(text, twOptions)

// const regular = readFileSync(
//   `${__dirname}/../.fonts/Inter-Regular.woff2`
// ).toString("base64")
// const bold = readFileSync(`${__dirname}/../.fonts/Inter-Bold.woff2`).toString(
//   "base64"
// )
// const mono = readFileSync(`${__dirname}/../.fonts/Vera-Mono.woff2`).toString(
//   "base64"
// )

function getCss(theme: string, fontSize: string) {
  let background = "white"
  let foreground = "black"

  if (theme === "dark") {
    background = "black"
    foreground = "white"
  }

  return `

    * {
        box-sizing: border-box;
    }

    body {
        background: ${background};
        height: 100vh;
        margin: 0;
        padding: 0;
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

    .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: system-ui, -apple-system, BlinkMacSystemFont;
        position: relative;
        padding: 0 5%;
    }

    .eggo {
        position: absolute;
        top: 30px;
        right: 30px;
    }

    .logo-holder {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
        width: 40%;
    }

    .logo {
        width: 100%;
        display: block;
    }

    .info-holder {
        flex-grow: 1;
        padding: 90px 0 90px 5%;
    }

    .divider {
        width: 80%;
        height: 3px;
        background: #d2a043;
        margin: 30px 0;
    }

    .with-author-holder {
        display: flex;
        align-items: baseline;
        width: 100%;
        font-size: 32px;
        color: #63768d;
        font-weight: 300;
    }

    .author-name {
        margin-left: 10px;
        color: black;
        font-weight: 500;
        text-transform: uppercase;
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
    
    .heading {
        font-family: system-ui, -apple-system, BlinkMacSystemFont;
        font-size: ${fontSize};
        font-style: normal;
        font-weight: 500;
        color: ${foreground};
        line-height: 1.25;
        margin: 0;
    }`
}

export function getHtml(parsedReq: ParsedRequest, course: any) {
  const { theme, md, fontSize, widths, heights } = parsedReq
  const { square_cover_large_url, title, instructor } = course
  const images = [square_cover_large_url]
  const text = title
  const adjustedFontSize =
    text.length > 60 ? (text.length > 80 ? "52px" : "56px") : fontSize

  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, adjustedFontSize)}
    </style>
    <body>
        <div class="wrapper">
            ${getImage(
              "https://d2ddoduugvun08.cloudfront.net/items/0s0k2J0j3i3O2m0D1k2K/eggo.svg",
              "60",
              "60",
              "eggo"
            )}
            <div class="logo-holder">
                ${images
                  .map(
                    (img, i) =>
                      getPlusSign(i) +
                      getImage(img, widths[i], heights[i], "logo")
                  )
                  .join("")}
            </div>
            <div class="info-holder">
                <div class="heading">${emojify(
                  md ? marked(text) : sanitizeHtml(text)
                )}</div>
                <div class="divider"></div>
                <div class="with-author-holder">
                    <div>with</div>
                    <div class="author-name">${emojify(
                      md
                        ? marked(instructor.full_name)
                        : sanitizeHtml(instructor.full_name)
                    )}</div>
                </div>
            </div>
        </div>
    </body>
</html>`
}

function getImage(
  src: string,
  width = "500",
  height = "auto",
  className: string
) {
  return `<img
        class="${className}"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
}

function getPlusSign(i: number) {
  return i === 0 ? "" : '<div class="plus">+</div>'
}
