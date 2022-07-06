import { readFileSync } from 'fs'
import { marked } from 'marked'
import { sanitizeHtml } from './sanitizer'
import { ParsedRequest, Theme } from './types'
const twemoji = require('twemoji')
const twOptions = { folder: 'svg', ext: '.svg' }
const emojify = (text: string) => twemoji.parse(text, twOptions)

const rglr = readFileSync(
  `${__dirname}/../_fonts/MessinaSansWeb-Regular.woff2`
).toString('base64')
const bold = readFileSync(
  `${__dirname}/../_fonts/MessinaSansWeb-SemiBold.woff2`
).toString('base64')
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString(
  'base64'
)

const ice = readFileSync(`${__dirname}/../_themes/ice.png`).toString('base64')
const graph = readFileSync(`${__dirname}/../_themes/graph.png`).toString(
  'base64'
)
const rainbow = readFileSync(`${__dirname}/../_themes/rainbow.png`).toString(
  'base64'
)

const themes: Record<Theme, { background: string; foreground: string }> = {
  light: {
    background: 'var(--color-new-day)',
    foreground: 'var(--color-midnight)',
  },
  dark: {
    background: 'var(--color-midnight)',
    foreground: 'var(--color-new-day)',
  },
  ice: {
    background: `url(data:image/png;base64,${ice})`,
    foreground: 'var(--color-midnight)',
  },
  graph: {
    background: `url(data:image/png;base64,${graph})`,
    foreground: 'var(--color-midnight)',
  },
  rainbow: {
    background: `url(data:image/png;base64,${rainbow})`,
    foreground: 'var(--color-new-day)',
  },
}

function getCss(theme: Theme) {
  console.log({ theme })
  const { background, foreground } = themes[theme]

  return `
    @font-face {
        font-family: 'MessinaSans';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'MessinaSans';
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

    :root {
      --color-new-day: hsl(40, 100%, 98%);
      --color-midnight: hsl(225, 82%, 24%);
      --color-cobalt: #265cff;
    }

    body {
        background: ${background};
        background-size: auto 100vh;
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

    .eyebrow {
        font-family: 'MessinaSans', sans-serif;
        font-size: 70px;
        font-style: normal;
        color: ${foreground};
        line-height: 78px;
        margin-bottom: 30px;
    }
    
    .heading {
        font-family: 'MessinaSans', sans-serif;
        font-size: 175px;
        font-style: normal;
        color: ${foreground};
        line-height: 212px;
    }
    
    p {
        margin: 0;
    }
    `
}

export function getHtml(parsedReq: ParsedRequest) {
  const { largeText, smallText, theme, md } = parsedReq
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
            <div class="spacer">
            <div class="spacer">
            <div class="eyebrow">${emojify(
              md ? marked(smallText) : sanitizeHtml(smallText)
            )}
            </div>
            <div class="heading">${emojify(
              md ? marked(largeText) : sanitizeHtml(largeText)
            )}
            </div>
        </div>
    </body>
</html>`
}
