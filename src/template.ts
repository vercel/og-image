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

    body {
        background: ${background};
        height: 100vh;
        display: flex;
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

    .wrapper {
        display: flex;
        align-items: center;
        font-family: system-ui, -apple-system, BlinkMacSystemFont;
    }

    .logo-holder {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
        padding-left: 50px;
    }

    .logo {
        margin: 0 75px;
    }

    .info-holder {
        padding: 0 50px 0 60px;
    }

    .divider {
        width: 80%;
        height: 3px;
        background: #d2a043;
        margin: 60px 0;
    }

    .with-author-holder {
        display: flex;
        align-items: baseline;
        width: 100%;
        font-size: 60px;
        color: #63768d;
        font-weight: 300;
    }

    .author-name {
        margin-left: 20px;
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
        line-height: 1.1;
        margin: 0;
    }`
}

export function getHtml(parsedReq: ParsedRequest, course: any) {
    const { theme, md, fontSize, widths, heights } = parsedReq
    const { square_cover_large_url, title } = course
    const images = [square_cover_large_url]
    const text = title

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
            <div class="wrapper">
                <div class="logo-holder">
                    ${images
            .map(
                (img, i) =>
                    getPlusSign(i) + getImage(img, widths[i], heights[i])
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
                        <div class="author-name">Mike Sherov</div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>`
}

function getImage(src: string, width = "800", height = "auto") {
    return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
}

function getPlusSign(i: number) {
    return i === 0 ? "" : '<div class="plus">+</div>'
}