import chromium from "chrome-aws-lambda";
import playwright from "playwright-core";

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
    browser = await playwright.chromium.launch({ ...devOptions });
  } else {
    browser = await playwright.chromium.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
  }

  // og image is supposed to be 1.9:1 (1200x630)
  // twitter image is supposed to be 2:1 (1200x600), but works fine with 1200x630, too
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2,
  });

  await page.goto(url, { waitUntil: "networkidle" });
  return await page.screenshot({ type: "png" });
}
