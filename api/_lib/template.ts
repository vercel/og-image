
import { readFileSync } from 'fs';
import fromUnixTime from 'date-fns/fromUnixTime';
import { getTokenSwapPrice } from './get-pricing-preview';
import { getChainLabel } from './multichain';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
import { MATCHA_TRADING_HISTORY_WINDOWS, fetchHistoryForTokenPair } from './token-history';
const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');

function getCss(theme: string, fontSize: string) {
    let background = 'white';
    let foreground = 'black';

    if (theme.toLowerCase() === 'dark') {
        background = 'rgb(31, 31, 65)';
        foreground = 'white';
    }
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
    
    
    @font-face {
        font-family: 'Gilroy';
        src: url('/fonts/Gilroy-SemiBoldItalic.woff2') format('woff2'),
        url('/fonts/Gilroy-SemiBoldItalic.woff') format('woff'),
        url('/fonts/Gilroy-SemiBoldItalic.ttf') format('truetype');
        font-weight: 600;
        font-style: italic;
    }
    
    @font-face {
        font-family: 'Gilroy';
        src: url('/fonts/Gilroy-ExtraBold.woff2') format('woff2'),
        url('/fonts/Gilroy-ExtraBold.woff') format('woff'),
        url('/fonts/Gilroy-ExtraBold.ttf') format('truetype');
        font-weight: 800;
        font-style: normal;
    }
    
    @font-face {
        font-family: 'Gilroy';
        src: url('/fonts/Gilroy-SemiBold.woff2') format('woff2'),
        url('/fonts/Gilroy-SemiBold.woff') format('woff'),
        url('/fonts/Gilroy-SemiBold.ttf') format('truetype');
        font-weight: 600;
        font-style: normal;
    }
    
    @font-face {
        font-family: 'Gilroy';
        src: url('/fonts/Gilroy-Black.woff2') format('woff2'),
        url('/fonts/Gilroy-Black.woff') format('woff'),
        url('/fonts/Gilroy-Black.ttf') format('truetype');
        font-weight: 900;
        font-style: normal;
    }
    
    @font-face {
        font-family: 'Gilroy';
        src: url('/fonts/Gilroy-MediumItalic.woff2') format('woff2'),
        url('/fonts/Gilroy-MediumItalic.woff') format('woff'),
        url('/fonts/Gilroy-MediumItalic.ttf') format('truetype');
        font-weight: 500;
        font-style: italic;
    }
    
    @font-face {
        font-family: 'Gilroy';
        src: url('/fonts/Gilroy-Light.woff2') format('woff2'),
        url('/fonts/Gilroy-Light.woff') format('woff'),
        url('/fonts/Gilroy-Light.ttf') format('truetype');
        font-weight: 300;
        font-style: normal;
    }
    
    @font-face {
        font-family: 'Gilroy';
        src: url('/fonts/Gilroy-BoldItalic.woff2') format('woff2'),
        url('/fonts/Gilroy-BoldItalic.woff') format('woff'),
        url('/fonts/Gilroy-BoldItalic.ttf') format('truetype');
        font-weight: bold;
        font-style: italic;
    }
    
    @font-face {
        font-family: 'Gilroy';
        src: url('/fonts/Gilroy-Bold.woff2') format('woff2'),
        url('/fonts/Gilroy-Bold.woff') format('woff'),
        url('/fonts/Gilroy-Bold.ttf') format('truetype');
        font-weight: bold;
        font-style: normal;
    }

    body {
        background-color: ${background};
        position: absolute;
        height: 471;
        width: 900;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    .spacer {
        margin: 150px;
    }

    .container {
        display: flex;
        flex-direction: column;
    }
    
    .heading {
        font-family: 'Gilroy', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: ${foreground};
        line-height: 1.8;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .subheading {
        margin-left: 8px;
        font-family: 'Gilroy', sans-serif;
        font-size: 16px;
        color: ${foreground};
    }

    .row {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .base-token {
        font-size: 32px;
    }

    .quote-token {
        margin-left: 8px;
        font-size: 22px;
    }

    .chain-label {
        color: white;
        border-radius: 32px;
        padding: 3px 10px 3px 10px;
        margin-left: 10px;
        font-size: 14px;
        font-family: 'Gilroy', sans-serif;
        font-weight: 600;
    }

    .price {
        font-family: 'Gilroy-SemiBold', sans-serif;
        font-size: 48px;
        color: ${foreground};
        margin: 16px 0px;
    }
    
    .footer {
        display: flex;
        justify-content: space-between;
    }`;
}


export async function getHtml(parsedReq: ParsedRequest) {
    const { baseTokenAddr, quoteTokenAddr, baseTokenSymbol, quoteTokenSymbol, chainId, theme } = parsedReq;
    const tokenSwapRes = await getTokenSwapPrice(chainId, baseTokenAddr, quoteTokenAddr);
    const historyData = await fetchHistoryForTokenPair(
        MATCHA_TRADING_HISTORY_WINDOWS.TWENTY_FOUR_HOURS, 
        chainId, 
        baseTokenAddr, 
        quoteTokenAddr
    );
    const formattedHistoryData = historyData?.map((x) => {
        const formattedVal = {
          close: x.close,
          date: fromUnixTime(x.time),
        };
        return formattedVal;
    });

    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, '50px')}
    </style>
    <body>
        <div class="container">
            <div class="heading">
                <div class="row">
                    <div class="base-token">
                        ${baseTokenSymbol} 
                    </div>
                    <div class="quote-token">
                        ${quoteTokenSymbol && `/ ${quoteTokenSymbol}`}
                    </div>
                </div>
                <div class="chain-label" style="background-color:${getChainLabel(chainId).color}">
                    ${getChainLabel(chainId).name}
                </div>
            </div>
            <div class="price">
                $${tokenSwapRes.data}
            </div>
            <div class="footer">
                <div> </div>
                <div class="row">
                    <img
                        src="./logo.png"
                        width=20
                    />
                    <div class="subheading">
                        Matcha
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>`;
}