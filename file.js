const { writeFile } = require('fs');
const { join } = require('path');
const { promisify } = require('util');
const writeFileAsync = promisify(writeFile);
const { tmpdir } = require('os');
const { URL } = require('url');

async function writeTempFile(name, contents) {
    const randomPath = join(tmpdir(), `${name}.html`);
    console.log('Writing file to ' + randomPath);
    await writeFileAsync(randomPath, contents);
    return randomPath;
}

function pathToFileURL(path) {
    const { href } = new URL(path, 'file:');
    console.log('File url is ' + href);
    return href;
}

module.exports = { writeTempFile, pathToFileURL }