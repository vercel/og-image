import { IncomingMessage } from 'http';
import { ItemType, ParsedRequest, ResponseFormat } from './types';

export function parseRequest(req: IncomingMessage) {

    if (!req.url) {
        throw new Error('url not valid')
    }

    if (req.headers.authorization !== process.env.AUTH_SHARED_KEY) {
        throw new Error('unauthorized')
    }

    let itemType: ItemType
    
    if (req.url.startsWith('/api/p/')) {
        itemType = 'project'
    } else if (req.url.startsWith('/api/n/')) {
        itemType = 'node'
    } else {
        throw new Error('unknown endpoint')
    }

    const itemID = req.url.slice(7)

    const questionIndex = req.url.indexOf('?')
    let searchParams: URLSearchParams
    if (!questionIndex || questionIndex < 0) {
        searchParams = new URLSearchParams()
    } else {
        searchParams = new URLSearchParams(req.url.substring(questionIndex+1))
    }

    const width = parseInt(searchParams.get("width") || '1200')
    const height = parseInt(searchParams.get("height") || '800')
    let responseFormatParam = searchParams.get("response_format") || 'jpeg'

    if (isNaN(width)) {
        throw new Error('bad width')
    }
    if (isNaN(height)) {
        throw new Error('bad height')
    }

    let responseFormat: ResponseFormat
    if (responseFormatParam === 'jpeg' || responseFormatParam === 'json') {
        responseFormat = <ResponseFormat> responseFormatParam
    } else {
        throw new Error('bad response format')
    }

    const parsedRequest: ParsedRequest = {
        responseFormat,
        itemType,
        width,
        height,
        itemID
    };
    return parsedRequest;
}
