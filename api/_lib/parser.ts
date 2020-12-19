import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ArtParsedRequest, ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname, query } = parse(req.url || '/', true);

    const previewType = (pathname || '/').slice(1);

    const { hash } = (query || {});

    if (previewType === 'art') {
        const parsedRequest: ArtParsedRequest = {
            hash: hash as string,
            type: 'art',
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