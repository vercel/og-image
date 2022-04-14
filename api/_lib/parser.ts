import { IncomingMessage } from 'http';
import { ParsedRequest, ResponseFormat } from './types';

export function parseRequest(req: IncomingMessage) {
    if (!req.url) {
        throw new Error('url not valid')
    }

    const questionIndex = req.url.indexOf('?')
    if (!questionIndex || questionIndex < 0) {
        throw new Error('no parameters given')
    }

    const searchParams = new URLSearchParams(req.url.substring(questionIndex+1))
    const width = parseInt(searchParams.get("width") || '1200')
    const height = parseInt(searchParams.get("height") || '800')
    const nodeID = searchParams.get("node_id")
    let responseFormatParam = searchParams.get("response_format") || 'jpeg'

    if (!nodeID) {
        throw new Error('node_id required')
    }
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
        nodeID,
        width,
        height,
    };
    return parsedRequest;
}
