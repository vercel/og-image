import { readFileSync } from "fs"
import marked from "marked"
import { sanitizeHtml } from "./sanitizer"
const twemoji = require("twemoji")
const twOptions = { folder: "svg", ext: ".svg" }
const emojify = (text: string) => twemoji.parse(text, twOptions)

const eggoSrc = readFileSync(`${__dirname}/eggo.svg`).toString("base64")
const eggo = "data:image/svg+xml;base64," + eggoSrc

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
        font-family: 'Open Sans', system-ui, -apple-system, BlinkMacSystemFont;
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
        width: 50%;
    }

    .logo {
        width: 100%;
        display: block;
        padding: 5%;
    }

    .info-holder {
        flex-grow: 1;
        padding: 90px 0 90px 5%;
    }

    .divider {
        width: 60%;
        height: 2px;
        background: #EFB548;
        margin: 40px 0;
    }

    .with-author-holder {
        display: flex;
        align-items: baseline;
        width: 100%;
        font-size: 28px;
        letter-spacing: 1px;
        color: #778FAC;
        font-weight: 300;
    }

    .author-name {
        margin-left: 10px;
        color: #181421;
        letter-spacing: 4px;
        font-weight: 700;
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
        font-family: 'Open Sans', system-ui, -apple-system, BlinkMacSystemFont;
        font-size: ${fontSize};
        font-style: normal;
        font-weight: 500;
        letter-spacing: 1.25px;
        color: ${foreground};
        line-height: 1.25;
        margin: 0;
    }`
}

export function getHtml(parsedReq: ParsedRequest, resource: any) {
    const { theme, md, fontSize, widths, heights, resourceType } = parsedReq
    // TODO: this should be able to handle any Resource (ContentModel)
    // which might mean we need to use a "convertToItem" style function?
    const { square_cover_large_url, title, instructor } = resource
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
            ${getImage(eggo, "60", "60", "eggo")}
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
