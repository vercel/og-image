// import { readFileSync } from 'fs';
import { ParsedRequest } from './types';

function getCss() {
    let background = 'white';
    let foreground = 'black';
    let radial = 'lightgray';

    return `
    @import url('https://fonts.googleapis.com/css2?family=Amaranth:wght@700&family=Roboto+Slab&display=swap');

    body {
        background: ${background};
        background-image: radial-gradient(circle at 25px 25px, ${radial} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${radial} 2%, transparent 0%);
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    .date {
        font-family: 'Roboto Slab', serif; 
        font-size: 30px;
        line-height: 1.8;
        color: ${foreground};
    }
    
    
    .heading {
        font-family: 'Amaranth', sans-serif;
        font-size: 64px;
        font-weight: bold;
        color: ${foreground};
        line-height: 1.8;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, issue, date } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
       <h1 class="heading" >#${issue} - ${text}</h1> 
       <div class="date" > ${date} </div>
    </body>
</html>`;
}
