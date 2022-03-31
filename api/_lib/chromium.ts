import core from 'puppeteer-core';
import { getOptions } from './options';
import { FileType } from './types';
let _page: core.Page | null;

async function getPage(isDev: boolean) {
  if (_page) {
    return _page;
  }
  const options = await getOptions(isDev);
  const browser = await core.launch(options);
  _page = await browser.newPage();
  return _page;
}

interface ScreenshotOptions {
  width?: number;
  height?: number;
}

export async function getScreenshot(
  html: string,
  type: FileType,
  isDev: boolean,
  options?: ScreenshotOptions
) {
  const page = await getPage(isDev);
  await page.setViewport({
    width: options ? options.width || 2048 : 2048,
    height: options ? options.height || 1170 : 1170,
  });
  await page.setContent(html);
  const file = await page.screenshot({ type });
  return file;
}
