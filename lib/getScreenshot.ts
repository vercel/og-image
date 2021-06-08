import chrome from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

export async function getScreenshot(html: string, format: Format) {
  const browser = await puppeteer.launch(
    process.env.AWS_REGION
      ? {
          args: chrome.args,
          executablePath: await chrome.executablePath,
          headless: chrome.headless,
        }
      : {
          args: [],
          executablePath:
            process.platform === 'win32'
              ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
              : process.platform === 'linux'
              ? '/usr/bin/google-chrome'
              : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
          headless: true,
        }
  );
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900 });
  await page.setContent(html);

  const file = await page.screenshot({ type: format });
  return file;
}
