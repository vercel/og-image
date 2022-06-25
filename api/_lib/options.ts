import chrome from 'chrome-aws-lambda';
const exePath = process.platform === 'win32'
? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
: process.platform === 'linux'
? '/usr/bin/google-chrome'
: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

interface Options {
    args: string[];
    executablePath: string;
    headless: boolean;
}

export async function getOptions(isDev: boolean) {
    const localArgs = ['--lang=ja', '--no-sandbox', '--disable-setuid-sandbox']
    const productionArgs = ['--lang=ja']
    const args = process.env.IS_LOCAL === "true" ? localArgs : productionArgs

    let options: Options;
    if (isDev) {
        options = {
            args: args,
            executablePath: exePath,
            headless: true
        };
    } else {
        options = {
            args: chrome.args,
            executablePath: await chrome.executablePath,
            headless: chrome.headless,
        };
    }
    return options;
}
