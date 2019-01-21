
const { readFileSync } = require('fs');

/**
 * 
 * @param {'bold' | 'normal'} fontWeight 
 */
function getCss(fontWeight) {
    const regular = `${__dirname}/fonts/Inter-UI-Regular.woff2`;
    const bold = `${__dirname}/fonts/Inter-UI-Bold.woff2`;
    const buffer = readFileSync(fontWeight === 'bold' ? bold : regular);
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
        font-size: 75px;
        font-style: normal;
        font-weight: ${fontWeight};
    }`;
}

/**
 * 
 * @param {string} text 
 * @param {'bold' | 'normal'} fontWeight 
 * @param {'now-black' | 'now-white' | 'zeit-black-triangle' | 'zeit-white-triangle'} image 
 */
function getHtml(text, fontWeight, image) {
    const logo = `https://assets.zeit.co/image/upload/front/assets/design/${image}.svg`;
    return `<html>
    <style>
        ${getCss(fontWeight)}
    </style>
    <body>
        <div>
            <div class="spacer">
            <img class="logo" src="${logo}" />
            <div class="spacer">
            <div class="heading">${text}</div>
        </div>
    </body>
</html>`;
}

module.exports = { getHtml }
