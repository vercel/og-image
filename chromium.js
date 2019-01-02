const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

async function getScreenshot(url, type) {
    const browser = await puppeteer.launch({
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

module.exports = { getScreenshot };