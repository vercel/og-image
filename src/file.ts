import { writeFile } from 'fs';
import { join, basename, dirname } from 'path';
import { promisify } from 'util';
import { tmpdir } from 'os';
const writeFileAsync = promisify(writeFile);

export async function writeTempFile(name: string, contents: string) {
    const randomPath = join(tmpdir(), `${name}.html`);
    console.log('Writing file to ' + randomPath);
    await writeFileAsync(randomPath, contents);
    return randomPath;
}

export function pathToFileURL(path: string) {
    const fileName = basename(path);
    const folderName = dirname(path);
    const fileUrl = 'file://' + join(folderName, encodeURIComponent(fileName));
    console.log('File url is ' + fileUrl);
    return fileUrl;
}