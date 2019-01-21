import { writeFile } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { tmpdir } from 'os';
import { URL } from 'url';
const writeFileAsync = promisify(writeFile);

export async function writeTempFile(name: string, contents: string) {
    const randomPath = join(tmpdir(), `${name}.html`);
    console.log('Writing file to ' + randomPath);
    await writeFileAsync(randomPath, contents);
    return randomPath;
}

export function pathToFileURL(path: string) {
    const { href } = new URL(path, 'file:');
    console.log('File url is ' + href);
    return href;
}