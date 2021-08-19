import chromium from 'chrome-aws-lambda';

interface Options {
    args: string[];
    executablePath: string;
    headless: boolean;
}

export async function getOptions(isDev: boolean) {
    let options: Options;
    if (isDev) {
        options = {
            args: chromium.args,
            executablePath: '/bin/chromium',
            headless: true
        };
    } else {
        options = {
            args: chromium.args,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
        };
    }
    return options;
}
