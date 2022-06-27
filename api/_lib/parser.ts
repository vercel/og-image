import { IncomingMessage } from 'http';
import { parse } from 'url';
import fetch from 'node-fetch'
import { ParsedRequest, Theme } from './types';

const gqlQuery = `query room($id: Int!) {
    room(id: $id) {
      id
      title
      description
      start
      end
      type
      creator {
        id
        firstName
        lastName
        username
        avatar
      }
    }
  }`;
  
function truncateString(str: string, num: number): string {
    if (str.length > num) {
        return str.slice(0, num) + "...";
    } else {
        return str;
    }
}

export async function parseRequest(req: IncomingMessage) {
    // console.log('HTTP ' + req.url);
    const { pathname, query } = parse(req.url || '/', true);
    const { fontSize, images, widths, heights, theme, md, room, background, clipping } = (query || {});

    if (Array.isArray(fontSize)) {
        throw new Error('Expected a single fontSize');
    }
    if (Array.isArray(theme)) {
        throw new Error('Expected a single theme');
    }
    if (Array.isArray(background)) {
        throw new Error('Expected a single background');
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

    let json: any
    if(room) {
        const response = await fetch('https://api.getonmic.com/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              query: gqlQuery,
              variables: { id: Number(room) },
            })
          })
        json = await response.json()
    }

    const parsedRequest: ParsedRequest = {
        fileType: extension === 'jpeg' ? extension : 'png',
        text: json?.data?.room ? `${truncateString(json?.data?.room?.title, 56)}` : truncateString(decodeURIComponent(text), 56),
        theme: theme === 'dark' ? 'dark' : 'light',
        md: md === '1' || md === 'true' || !!json?.data?.room,
        fontSize: fontSize || '75px',
        background: background || 'https://static.getonmic.com/h4.png',
        images: json?.data?.room ? [json?.data?.room?.creator?.avatar] : getArray(images),
        widths: getArray(widths),
        heights: getArray(heights),
        clipping: clipping === '1' || clipping === 'true',
    };
    parsedRequest.images = getDefaultImages(parsedRequest.images, parsedRequest.theme);
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
        ? 'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-black.svg'
        : 'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-white.svg';

    if (!images || !images[0]) {
        return [defaultImage];
    }
    // if (!images[0].startsWith('https://assets.vercel.com/') && !images[0].startsWith('https://assets.zeit.co/')) {
    //     images[0] = defaultImage;
    // }
    return images;
}
