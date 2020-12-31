import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ArtParsedRequest, DefaultParsedRequest, PalleteParsedRequest, ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname, query } = parse(req.url || '/', true);

    const previewType = (pathname || '/').slice(1);

    const { hash, address, title, subtitle } = (query || {});

    if (previewType.includes('art')) {
        const parsedRequest: ArtParsedRequest = {
            hash: hash as string,
            type: 'art',
        };
    
        return parsedRequest;
    }

    if (previewType.includes('pallete')) {
        const parsedRequest: PalleteParsedRequest = {
            address: address as string,
            type: 'pallete',
        };
    
        return parsedRequest;
    }

    if (previewType.includes('default')) {
        const parsedRequest: DefaultParsedRequest = {
            hash: hash as string,
            title: title as string,
            subtitle: subtitle as string,
            type: 'default',
        };
    
        return parsedRequest;
    }

    return {
        type: 'none'
    } as ParsedRequest
}

// function getArray(stringOrArray: string[] | string | undefined): string[] {
//     if (typeof stringOrArray === 'undefined') {
//         return [];
//     } else if (Array.isArray(stringOrArray)) {
//         return stringOrArray;
//     } else {
//         return [stringOrArray];
//     }
// }