
import { readFileSync } from 'fs';
import { getTokenSwapPrice } from './get-pricing-preview';
import { getChainLabel } from './multichain';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
import { 
    USDC_CONTRACT_MAINNET_ADDRESS, 
    BUSD_CONTRACT_BSC_ADDRESS, 
    USDC_CONTRACT_MATIC_POS_ADDRESS,
    NATIVE_CHAIN_TOKEN_FAKE_CONTRACT_ADDRESS,
    CHAIN_IDS,
} from './constants';
import { MATCHA_LOGO_URL } from './config';
import { MATCHA_TRADING_HISTORY_WINDOWS, fetchHistoryForTokenPair } from './token-history';
import { fetchAssetsForBsc, fetchAssetsForEthereum, fetchAssetsForPolygon } from './token-lists';
const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');
const gilroy = readFileSync(`${__dirname}/../_fonts/Gilroy-SemiBold.woff2`).toString('base64');

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
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${gilroy})  format("woff2");
    }

    body {
        background-color: ${background};
        display: flex;
        flex-direction: column;
    }

    .spacer {
        margin: 150px;
    }

    .container {
        display: flex;
        flex-direction: column;
        margin-left: 16px;
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
        margin-left: 4px;
        font-family: 'Gilroy', sans-serif;
        font-size: 20px;
        color: ${foreground};
    }

    .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: 
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

    .css-chart {
        /* The chart borders */
        border-bottom: 1px solid;
        border-left: 1px solid;
        /* The height, which is initially defined in the HTML */
        height: var(--widget-size);
        /* A little breathing room should there be others items around the chart */
        margin: 1em;
        /* Remove any padding so we have as much space to work with inside the element */
        padding: 0;
        position: relative;
        /* The chart width, as defined in the HTML */
        width: var(--widget-size);
    }

    .price {
        font-family: 'Gilroy', sans-serif;
        font-size: 48px;
        color: ${foreground};
        margin-bottom: 8px;
    }

    .quiz-graph {
        padding: 10px 0px; 
    }

    .quiz-graph .x-labels {
        text-anchor: middle;
    }

    .quiz-graph .y-labels {
        text-anchor: end;
    }

    .quiz-graph .quiz-graph-grid {
        stroke: #ccc;
        stroke-dasharray: 0;
        stroke-width: 1;
    }

    .label-title {
        text-anchor: middle;
        text-transform: uppercase;
        font-size: 12px;
        fill: gray;
    }

    .chart {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .logo {
        position: fixed;
        top: 16px;
        right: 16px;
    }`;
}

// Helper for scaling range
const convertRange = ( value: number, r1: number[], r2: number[] ) => { 
    return Math.round(( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / (( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ]) || 1);
}

const MAX_WIDTH = 290;
const MAX_HEIGHT = 130;

export async function getHtml(parsedReq: ParsedRequest) {
    let { baseTokenAddr, quoteTokenAddr, baseTokenSymbol, quoteTokenSymbol, chainId, theme } = parsedReq;

    // Fill in missing symbol and addresses
    let assetFetcher;
    let useDefaultStablecoinAddr = !(quoteTokenSymbol || quoteTokenAddr);
    switch (chainId) {
        case CHAIN_IDS.MAINNET:
            if (useDefaultStablecoinAddr) {
                quoteTokenAddr = USDC_CONTRACT_MAINNET_ADDRESS;
            };
            assetFetcher = fetchAssetsForEthereum;
            break;
        case CHAIN_IDS.BSC:
            if (useDefaultStablecoinAddr) {
                quoteTokenAddr = BUSD_CONTRACT_BSC_ADDRESS;
            };
            assetFetcher = fetchAssetsForBsc;
            break;
        case CHAIN_IDS.MATIC:
            if (useDefaultStablecoinAddr) {
                quoteTokenAddr = USDC_CONTRACT_MATIC_POS_ADDRESS;
            };
            assetFetcher = fetchAssetsForPolygon;
            break;
    }
    // Fill in missing symbol and addr info if needed
    if (assetFetcher) {
        let assets;
        if (!baseTokenSymbol && baseTokenAddr) {
            assets = await assetFetcher();
            const baseAsset = assets.find(
                (x) => x.tokenAddress === baseTokenAddr,
            );
            baseTokenSymbol = baseAsset?.symbol!;
        }
        if (!quoteTokenSymbol && quoteTokenAddr) {
            if (!assets) {
                assets = await assetFetcher();
            }
            const baseAsset = assets.find(
                (x) => x.tokenAddress === quoteTokenAddr,
            );
            quoteTokenSymbol = baseAsset?.symbol!;
        }
        if (baseTokenSymbol && !baseTokenAddr) {
            if (!assets) {
                assets = await assetFetcher();
            }
            if (baseTokenSymbol === 'ETH') {
                baseTokenAddr = NATIVE_CHAIN_TOKEN_FAKE_CONTRACT_ADDRESS;
            } else {
                const baseAsset = assets.find(
                    (x) => x.symbol === baseTokenSymbol,
                );
                baseTokenAddr = baseAsset?.tokenAddress!;
            }
        }
        // Fetch quote token address if needed
        if (quoteTokenSymbol && !quoteTokenAddr) {
            if (!assets) {
                assets = await assetFetcher();
            }
            if (quoteTokenSymbol === 'ETH') {
                quoteTokenAddr = NATIVE_CHAIN_TOKEN_FAKE_CONTRACT_ADDRESS;
            } else {
                const baseAsset = assets.find(
                    (x) => x.symbol === quoteTokenSymbol,
                );
                quoteTokenAddr = baseAsset?.tokenAddress!;
            }
        }
    }
    if (!baseTokenSymbol || !quoteTokenSymbol) return '';
    // Get token price and graph data
    const tokenSwapRes = await getTokenSwapPrice(chainId, baseTokenAddr, quoteTokenAddr);
    const historyData = await fetchHistoryForTokenPair(
        MATCHA_TRADING_HISTORY_WINDOWS.TWENTY_FOUR_HOURS, 
        chainId, 
        baseTokenAddr, 
        quoteTokenAddr,
    );

    // Get graph x and y range
    let minClose: number = Number.MAX_VALUE;
    let maxClose: number = Number.MIN_VALUE
    let minDate: number = Number.MAX_VALUE;
    let maxDate: number = Number.MIN_VALUE;
    let convertedPoints = '';
    for (let x of historyData!) {
        maxClose = Math.max(maxClose, x.close);
        minClose = Math.min(minClose, x.close);
        maxDate = Math.max(maxDate, x.time);
        minDate = Math.min(minDate, x.time);
    };

    for (let d of historyData!) {
        convertedPoints += `${convertRange(d.time, [minDate, maxDate], [0, MAX_WIDTH])},${MAX_HEIGHT - convertRange(d.close, [minClose, maxClose], [0, MAX_HEIGHT] )} `;
    }
    
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
        </div>
        <div class="chart">
            <svg version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="quiz-graph">
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:rgba(99,224,238,.5);stop-opacity:1"></stop>
                    <stop offset="100%" style="stop-color:white;stop-opacity:0"></stop>
                </linearGradient>

                <polyline fill="none" stroke="#34becd" stroke-width="2" points="
                    ${convertedPoints}
                "></polyline>
               
            </svg>
        </div>
        <div class="logo">
            <div class="row">
                <img
                    src="${MATCHA_LOGO_URL}"
                    width=20
                />
                <div class="subheading">
                    Matcha
                </div>
            </div>
        </div>
    </body>
</html>`;
}