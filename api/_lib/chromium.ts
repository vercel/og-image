import core from "puppeteer-core";
import { getOptions } from "./options";
import { ResponseFormat } from "./types";
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

export async function getScreenshot(
  url: string,
  width: number,
  height: number,
  isDev: boolean,
  responseFormat: ResponseFormat
) {
  const page = await getPage(isDev);
  await page.setViewport({ width, height });
  await page.goto(url);
  // TODO: use a different wait for function
  await page.waitForTimeout(2000);
  const file = await page.screenshot({
    type: "jpeg",
    encoding: responseFormat === "json" ? "base64" : "binary",
  });
  return file;
}
