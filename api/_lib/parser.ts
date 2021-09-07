import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    const { query } = parse(req.url || '/', true);

    let baseTokenSymbol = '';
    let quoteTokenSymbol = '';
    let baseTokenAddr = '';
    let quoteTokenAddr = '';
    let chainId = 1;
    if (query.baseTokenSymbol && !Array.isArray(query.baseTokenSymbol)) {
        baseTokenSymbol = query.baseTokenSymbol;
    };
    if (query.quoteTokenSymbol && query.quoteTokenSymbol !== 'undefined' && !Array.isArray(query.quoteTokenSymbol)) {
        quoteTokenSymbol = query.quoteTokenSymbol;
    };
    if (query.baseTokenAddr && !Array.isArray(query.baseTokenAddr)) {
        baseTokenAddr = query.baseTokenAddr;
    };
    if (query.quoteTokenAddr && query.quoteTokenAddr !== 'undefined' && !Array.isArray(query.quoteTokenAddr)) {
        quoteTokenAddr = query.quoteTokenAddr;
    };
    if (query.chainId && !Array.isArray(query.chainId)) {
        chainId = +query.chainId;
    };

    const parsedRequest: ParsedRequest = {
        theme: query.theme === 'dark' ? 'dark' : 'light',
        baseTokenSymbol: baseTokenSymbol,
        quoteTokenSymbol: quoteTokenSymbol,
        baseTokenAddr: baseTokenAddr,
        quoteTokenAddr: quoteTokenAddr,
        chainId: chainId,
    };
    return parsedRequest;
}