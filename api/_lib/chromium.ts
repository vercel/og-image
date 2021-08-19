import playwright from 'playwright-core';
import { getOptions } from './options';
import { FileType } from './types';
let _page: playwright.Page | null;

async function getPage(isDev: boolean) {
    if (_page) {
        return _page;
    }
    const options = await getOptions(isDev);
    const browser = await playwright.chromium.launch(options);
    _page = await browser.newPage({ viewport: { width: 1200, height: 600 }});
    return _page;
}

export async function getScreenshot(html: string, type: FileType, isDev: boolean) {
    const page = await getPage(isDev);
    await page.setContent(html);
    const file = await page.screenshot({ type });
    return file;
}
