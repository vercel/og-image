import { launch, Page } from 'puppeteer-core';
import { getOptions } from './options';
import { FileType } from './types';
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

export async function getArtScreenshot(hash: string, type: FileType, isDev: boolean) {
    const page = await getPage(isDev);
    await page.setViewport({ width: 675, height: 1080 });
    await page.goto(`https://app-ruddy-eight.vercel.app/preview/art/${hash}`);
    const file = await page.screenshot({ type });
    return file;
}
