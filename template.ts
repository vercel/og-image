
import { readFileSync } from 'fs';

function getCss(fontWeight: FontWeight, fontSize: string) {
    const regular = `${__dirname}/fonts/Inter-UI-Regular.woff2`;
    const bold = `${__dirname}/fonts/Inter-UI-Bold.woff2`;
    const buffer = readFileSync(fontWeight === 'normal' ? regular : bold);
    const base64 = buffer.toString('base64');
    return `
    @font-face {
        font-family: 'Inter UI';
        font-style:  normal;
        font-weight: ${fontWeight};
        src: url(data:font/woff2;charset=utf-8;base64,${base64}) format('woff2');
    }

    body {
        background: white;
        background-image: radial-gradient(lightgray 5%, transparent 0);
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    .img-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: space-evenly;
        justify-items: center;
    }

    .logo {
        width: 225px;
        height: 225px;
    }

    .plus {
        color: #b1b1b1;
        font-family: Verdana;
        font-size: 100px;
    }

    .spacer {
        margin: 150px;
    }
    
    .heading {
        font-family: 'Inter UI', sans-serif;
        font-size: ${fontSize};
        font-style: normal;
        font-weight: ${fontWeight};
    }`;
}

export function getHtml(text: string, fontWeight: FontWeight, fontSize: string, images: string[]) {
    return `<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(fontWeight, fontSize)}
    </style>
    <body>
        <div>
            <div class="spacer">
            <div class="img-wrapper">
                <img class="logo" src="${images[0]}" />
                ${images.slice(1).map(img => {
                    return `<div class="plus">+</div><img class="logo" src="${img}" />`;
                })}
            </div>
            <div class="spacer">
            <div class="heading">${text}</div>
        </div>
    </body>
</html>`;
}
