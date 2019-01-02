const { parse } = require('url');

function parseRequest(req) {
    const { pathname = '/' } = parse(req.url);
    console.log('Hit ' + pathname);
    const arr = pathname.slice(1).split('.');
    const type = arr.pop();
    const text = arr.join('.');
    return { type, text };
}

module.exports = { parseRequest }