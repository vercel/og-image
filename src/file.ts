import { writeFile } from 'fs';
import { join } from 'path';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { tmpdir } from 'os';
const writeFileAsync = promisify(writeFile);

export async function writeTempFile(name: string, contents: string) {
    const randomFile = randomBytes(32).toString('hex') + '.html';
    const randomPath = join(tmpdir(), randomFile);
    console.log(`Writing file ${name} to ${randomPath}`);
    await writeFileAsync(randomPath, contents);
    return randomPath;
}

export function pathToFileURL(path: string) {
    const fileUrl = 'file://' + path;
    console.log('File url is ' + fileUrl);
    return fileUrl;
}