import { launch, Page, ElementHandle } from 'puppeteer-core';
import { getOptions } from './options';
import { ParsedRequest } from './types';

let _page: Page | null;

async function getPage(isDev: boolean) {
    if (_page) {
        return _page;
    }
    const options = await getOptions(isDev);
    const browser = await launch(options);
    _page = await browser.newPage();
    return _page;
}

export async function getScreenshot(request: ParsedRequest, isDev: boolean) {
    const page = await getPage(isDev);

    const {
        url, selector, canvas, ua, size, full, css, waitforframe,
    } = request;

    if (ua) {
        await page.setUserAgent(ua);
    }
    await page.setViewport(size);

    if (url.startsWith('data:text/html;base64,')) {
        await page.setContent(Buffer.from(url.substr('data:text/html;base64,'.length), 'base64').toString('binary'), { waitUntil: 'networkidle0' });
    } else if (url.startsWith('data:text/html,')) {
        await page.setContent(url.substr('data:text/html,'.length), { waitUntil: 'networkidle0' });
    } else {
        await page.goto(url, { waitUntil: 'networkidle0' });
    }

    if (waitforframe && page.frames().length > 1) {
        try {
            const loadframes = page.frames();
            loadframes.shift(); // First frame is current page, no need to wait
            await Promise.all(
                loadframes.map((f) => f.waitForNavigation({
                    waitUntil: 'networkidle0',
                    timeout: Number(waitforframe),
                })),
            );
        } catch (ex) {
            console.error(ex.message);
        }
    }

    if (css) {
        await page.evaluate((_css) => {
            const styleSheet = document.createElement('style');
            styleSheet.type = 'text/css';
            styleSheet.innerText = _css;
            document.head.appendChild(styleSheet);
        }, css);
    }

    let buffer: Buffer;
    let elem: ElementHandle | null = null;
    for (const sel of selector) { // eslint-disable-line no-restricted-syntax
        if (sel) {
            elem = await page.$(sel); // eslint-disable-line no-await-in-loop
            if (elem) break;
        }
    }
    if (selector && canvas) {
        const pngDataURL: string = await page.evaluate((_elem) => _elem.toDataURL('image/png'), elem);
        buffer = Buffer.from(pngDataURL.split(',')[1], 'base64');
    } else if (!full) {
        if (elem) {
            buffer = await elem.screenshot({ encoding: 'binary' });
        } else {
            buffer = await page.screenshot({ encoding: 'binary' });
        }
    } else {
        if (elem) {
            await page.evaluate((_selector) => {
                window.scrollBy(0, document.querySelector(_selector).offsetTop);
            }, selector);
        }
        buffer = await page.screenshot({ encoding: 'binary' });
    }

    await page.goto('about:blank', { waitUntil: 'networkidle0' });

    await page.close();

    return buffer;
}
