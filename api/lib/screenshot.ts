import chrome from "chrome-aws-lambda";
import puppeteer, {
  BrowserConnectOptions,
  BrowserLaunchArgumentOptions,
  LaunchOptions,
} from "puppeteer-core";

const isDev = !process.env.AWS_REGION;

type PuppeteerLaunchOptions = LaunchOptions &
  BrowserLaunchArgumentOptions &
  BrowserConnectOptions;

export default async function screenshot(url: string) {
  console.time("screenshot-e2e");
  console.time("browser-launch");
  const options: PuppeteerLaunchOptions = isDev
    ? {
        args: [],
        devtools: false,
        executablePath:
          process.platform === "win32"
            ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
            : process.platform === "linux"
            ? "/usr/bin/google-chrome"
            : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      }
    : {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
        devtools: false,
      };

  const browser = await puppeteer.launch(options);
  console.timeEnd("browser-launch");
  console.time("page-setup");
  const page = await browser.newPage();
  // og image is supposed to be 1.9:1 (1200x630)
  // twitter image is supposed to be 2:1 (1200x600), but works fine with 1200x630, too
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  console.timeEnd("page-setup");
  console.time("page-load");
  await page.goto(url, { waitUntil: "networkidle2" });
  console.timeEnd("page-load");
  console.time("take-screenshot");
  const screenshot = await page.screenshot({ type: "png" });
  console.timeEnd("take-screenshot");
  console.timeEnd("screenshot-e2e");
  return screenshot;
}
