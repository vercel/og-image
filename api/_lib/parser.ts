import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';
import { readFileSync } from 'fs';
import path from 'path';

const TemplateValues = [
  'site',
  'blog',
  'learn',
  'docs'
]

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname, query } = parse(req.url || '/', true);
    const { template = 'site', fontSize, image, width, height, md, intro, titleText, subtitleText, breadcrumbsText } = (query || {});
    const extension = pathname?.split('/')?.pop() ?? 'png'

    if (Array.isArray(template)) {
        throw new Error('Expected a single template');
    }
    if (Array.isArray(fontSize)) {
        throw new Error('Expected a single fontSize');
    }

    const parsedRequest: ParsedRequest = {
        templateImage: getTemplateB64Image(TemplateValues.includes(template) ? template : 'blog'),
        template: template,
        fileType: extension === 'jpeg' ? extension : 'png',
        md: md === '1' || md === 'true',
        fontSize: fontSize || '96px',
        image: !Array.isArray(image)  && image ? image : '',
        width: !Array.isArray(width)  && width ? width : '',
        height: !Array.isArray(height)  && height ? height : '',
        intro: Boolean(intro),
        titleText: decodeURIComponent((titleText || '') as string),
        subtitleText: decodeURIComponent((subtitleText || '') as string),
        breadcrumbsText: decodeURIComponent((breadcrumbsText || '') as string),
    };
    if (template === 'blog' && !parsedRequest.image) {
      const fatRakun = 'data:image/svg+xml;base64,' + readFileSync(path.join(process.cwd(), 'api', '_imgs', '_fat-rakun.svg')).toString('base64');
      parsedRequest.image = fatRakun
      parsedRequest.width = '250'
      parsedRequest.height = '250'
    }
    return parsedRequest;
}

function getTemplateB64Image(template: string): string {
  return 'data:image/svg+xml;base64,' + readFileSync(path.join(process.cwd(),'api', '_imgs', `_template-${template}.svg`)).toString('base64');
}

