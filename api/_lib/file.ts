import { writeFile } from 'fs';
import { join } from 'path';
import { createHash } from 'crypto';
import { promisify } from 'util';
import { tmpdir } from 'os';
const writeFileAsync = promisify(writeFile);

export async function writeTempFile(name: string, contents: string) {
    const fileName = createHash('md5').update(name).digest('hex') + '.html';
    const filePath = join(tmpdir(), fileName);
    console.log(`Writing file ${name} to ${filePath}`);
    await writeFileAsync(filePath, contents);
    return filePath;
}

export function pathToFileURL(path: string) {
    const fileUrl = 'file://' + path;
    console.log('File url is ' + fileUrl);
    return fileUrl;
}