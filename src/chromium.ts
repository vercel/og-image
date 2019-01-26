import * as chromeAws from 'chrome-aws-lambda';
import { launch, Page } from 'puppeteer-core';
let _page: Page | null;

async function getPage() {
    if (_page) {
        return _page;
    }
    const chrome = chromeAws as any;
    const browser = await launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    });
    _page = await browser.newPage();
    return _page;
}

export async function getScreenshot(url: string, type: FileType) {
    const page = await getPage();
    await page.setViewport({ width: 2048, height: 1170 });
    await page.goto(url);
    const file = await page.screenshot({ type });
    return file;
}