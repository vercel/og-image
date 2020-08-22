import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { query } = parse(req.url || '/', true);
    let { url, selector, canvas, ua, size = '1024,768', full, css, waitforframe } = (query || {});

    if (!url) {
        throw new Error('Missing url parameter');
    }
    if (!size.toString().match(/^\d+,\d+$/)) {
        throw new Error('Malformed size parameter');
    }
    if (waitforframe && !waitforframe.toString().match(/^\d+$/)) {
        throw new Error('waitforframe needs to be in milliseconds');
    }

    const parsedRequest: ParsedRequest = {
        url: url.toString(),
        selector: getArray(selector),
        canvas: !!(canvas || '').toString(),
        ua: ua ? ua.toString() : undefined,
        size: {
            width: Number(size.toString().split(',')[0]),
            height: Number(size.toString().split(',')[1])
        },
        full: !!(full || '').toString(),
        css: css ? css.toString() : undefined,
        waitforframe: waitforframe ? Number(waitforframe.toString()) : undefined
    };

    return parsedRequest;
}

function getArray(stringOrArray: string[] | string | undefined): string[] {
    if (typeof stringOrArray === 'undefined' || stringOrArray === '') {
        return [];
    } else if (Array.isArray(stringOrArray)) {
        return stringOrArray;
    } else {
        return [stringOrArray];
    }
}