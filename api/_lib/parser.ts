import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest, Theme } from './types';



export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);

    const { pathname, query } = parse(req.url || '/', true);
    const { fontSize, images, widths, heights, theme, md } = (query || {});

    if (Array.isArray(fontSize)) {
        throw new Error('Expected a single fontSize');
    }
    if (Array.isArray(theme)) {
        throw new Error('Expected a single theme');
    }
    
    const arr = (pathname || '/').slice(1).split('.');
    let extension = '';
    let text = '';
    if (arr.length === 0) {
        text = '';
    } else if (arr.length === 1) {
        text = arr[0];
    } else {
        extension = arr.pop() as string;
        text = arr.join('.');
    }

    const parsedRequest: ParsedRequest = {
        fileType: extension === 'jpeg' ? extension : 'png',
        text: decodeURIComponent(text),
        theme: theme === 'dark' ? 'dark' : 'light',
        md: md === '1' || md === 'true',
        fontSize: fontSize || '96px',
        images: getArray(images),
        widths: getArray(widths),
        heights: getArray(heights),
    };


    parsedRequest.images = getDefaultImages(parsedRequest.images, parsedRequest.theme);

    const urlParams =  req.url ?  req.url.split("/")[1] : "/"
    const params = new URLSearchParams(urlParams.split("?")[1])

    if(params.get("type") == "company") {
        const data = getCompanyInfo(req.url ? req.url : "/")

        const _parsedRequest: ParsedRequest = {
            ...parsedRequest,
            ...data,
        }

        return _parsedRequest
    }

    return parsedRequest;
}

function getArray(stringOrArray: string[] | string | undefined): string[] {
    if (typeof stringOrArray === 'undefined') {
        return [];
    } else if (Array.isArray(stringOrArray)) {
        return stringOrArray;
    } else {
        return [stringOrArray];
    }
}

function getDefaultImages(images: string[], theme: Theme): string[] {
    const defaultImage = theme === 'light'
        ? 'https://og-image.stockora.com/stockora-black.svg'
        : 'https://og-image.stockora.com/stockora.svg';

    if (!images || !images[0]) {
        return [defaultImage];
    }
    if (!images[0].startsWith('https://assets.vercel.com/') && !images[0].startsWith('https://assets.zeit.co/')) {
        images[0] = defaultImage;
    }
    return images;
}

function getCompanyInfo(url: string){
    const urlParams = url.split("/")[1]
    const params = new URLSearchParams(urlParams.split("?")[1])

    return{
        type: "company",
        companyName: urlParams.split("?")[0],
        sharePrice: params.get("sharePrice"),
        marketCap: params.get("marketCap")
    }
}
