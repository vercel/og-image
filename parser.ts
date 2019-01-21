import { IncomingMessage } from 'http';
import { parse } from 'url';

interface ParsedRequest {
    type: ScreenshotType;
    text: string;
    fontWeight: FontWeight;
    images: string[];
};

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname = '/', query = {} } = parse(req.url || '', true);
    const { fontWeight, images } = query;
    if (Array.isArray(fontWeight)) {
        throw new Error('Expected a single fontWeight');
    }
    const arr = pathname.slice(1).split('.');
    const type = arr.pop();
    const text = arr.join('.');
    const parsedRequest: ParsedRequest = {
        type: type as ScreenshotType,
        text: decodeURIComponent(text),
        fontWeight: fontWeight as FontWeight,
        images: Array.isArray(images) && images.length > 0
            ? images
            : ['https://assets.zeit.co/image/upload/front/assets/design/now-black.svg'],
    };
    return parsedRequest;
}