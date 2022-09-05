import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

const isDev = !process.env.AWS_REGION;

const devOptions = {
  args: [],
  executablePath:
    process.platform === "win32"
      ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
      : process.platform === "linux"
      ? "/usr/bin/google-chrome"
      : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
};

export default async function screenshot(url: string) {
  let browser;

  if (isDev) {
    browser = await puppeteer.launch(devOptions);
  } else {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
  }

  const page = await browser.newPage();
  // og image is supposed to be 1.9:1 (1200x630)
  // twitter image is supposed to be 2:1 (1200x600), but works fine with 1200x630, too
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: "networkidle0" });
  return await page.screenshot({ type: "png" });
}
