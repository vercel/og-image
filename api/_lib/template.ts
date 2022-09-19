import { readFileSync } from "fs";
import { marked } from "marked";
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

function getCss(fontSize: string) {
	let background = "#161515";
	let foreground = "white";
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
        height: 100vh;
        display: flex;
        text-align: left;
        padding: 0 150px;
        padding-bottom: 200px;
        align-items: flex-end;
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

    .logo {
      margin-bottom: 75px;
    }

    .spacer {
        margin-bottom: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .desc {
        font-size: 0.5em;
        opacity: 0.8;
        font-weight: 500;
        margin-top: 40px !important;
        margin-bottom: 50px !important;
        line-height: 1.5;
    }

    .website {
        font-size: 0.5em;
        opacity: 0.5;
        font-weight: 400;
    }

    .heading {
        font-family: 'Inter', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: ${foreground};
        line-height: 1.3; 
        font-weight: 900;
        font-size: 100px;
        margin: 0;
    }

    .heading * {
        margin: 0;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
	const { text, desc, md, fontSize, images, widths, heights } = parsedReq;
	return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(fontSize)}
    </style>
    <body>
        <div>
            <div class="spacer">
            <div class="logo-wrapper">
                ${images
									.map(
										(img, i) =>
											getPlusSign(i) + getImage(img, widths[i], heights[i])
									)
									.join("")}
            </div>
            <div class="spacer">
                <div class="heading">${emojify(
									md ? marked(text) : sanitizeHtml(text)
								)}
                <p class="desc">${desc}</p>
                <div class="spacer">
                    <p class="website">shanmukh.xyz</p>
                </div>
                </div>
            </div>
    </body>
</html>`;
}

function getImage(src: string, width = "auto", height = "225") {
	return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`;
}

function getPlusSign(i: number) {
	return i === 0 ? "" : '<div class="plus">+</div>';
}
