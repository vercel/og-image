import * as chromeAwsLambda from 'chrome-aws-lambda';
import { launch } from 'puppeteer-core';
const chrome = chromeAwsLambda as any;

export async function getScreenshot(url: string, type: ScreenshotType) {
    const browser = await launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 2048, height: 1170 });
    await page.goto(url);
    const file = await page.screenshot({ type });
    await browser.close();
    return file;
}