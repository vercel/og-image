
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

    .logo {
        width: 225px;
        height: 225px;
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
    <style>
        ${getCss(fontWeight, fontSize)}
    </style>
    <body>
        <div>
            <div class="spacer">
            <img class="logo" src="${images[0]}" />
            <div class="spacer">
            <div class="heading">${text}</div>
        </div>
    </body>
</html>`;
}
