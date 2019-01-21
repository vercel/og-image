const { parse } = require('url');

function parseRequest(req) {
    const { pathname = '/', query = {} } = parse(req.url, true);
    const { fontWeight, image } = query;
    console.log('Hit ' + pathname, query);
    const arr = pathname.slice(1).split('.');
    const type = arr.pop();
    const text = arr.join('.');
    return { type, text, fontWeight, image };
}

module.exports = { parseRequest }