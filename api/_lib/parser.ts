import { VercelRequest } from "@vercel/node";
import { ParsedRequest } from './types';

export function parseRequest(req: VercelRequest) {
    const { query, url } = req;
    const { issue_number: issue = '0', date = '' } = (query || {});
    console.log('Request', url);
    
    const arr = (url || '/').slice(1).split('.');
    let extension = '';
    let text = '';
    if (arr.length === 0) {
        text = '';
    } else if (arr.length === 1) {
        text = arr[0];
    } else {
        extension = arr.pop()?.split('?')[0] as string;
        text = arr.join('.');
    }

    const parsedRequest: ParsedRequest = {
        fileType:  extension === 'jpeg' ? extension : 'png',
        text: decodeURIComponent(text),
        date: decodeURIComponent(date as string),
        issue: parseInt(issue as string, 10),
    }
    return parsedRequest;
}

//Hello%20World.png?issue_number=1&date=Mar%2014%2C%202019
