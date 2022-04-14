# Screenshot Capturer

## Usage


### Local Development

First make sure you have the vercel CLI installed via `npm install -g vercel`

(Replace with your chrome path)  
`CHROME_PATH=/usr/bin/chromium NAVATTIC_APP_URL="http://localhost:8787" vercel dev -l 3001`

Test by going to `http://localhost:3001/api?node_id={some node ID here}` in your browser. After a few seconds you should see a screenshot load on the page.

### Cloud Deployment

Deploy to the cloud by running `vercel` and you'll get a unique URL. You'll need to update the navattic `keys.js` file with the production/staging URLs after deployment.

(Optional) Connect [Vercel for GitHub](https://vercel.com/github) to automatically deploy each time you `git push` 🚀

### Request Format

You can make requests to `/api` with the following query string parameters:

- `node_id` **required** - the id of the node you want to capture
- `width` optional - the width in pixels for the capturing viewpoint and resulting image size (default `1200`)
- `height` optional - the height in pixels for the capturing viewpoint and resulting image size (default `800`)
- `response_format` optional - the output format for the screenshot. Accepts values `png` or `json` (default `png`)

## Authors

Forked from [vercel/og-image](https://github.com/vercel/og-image)

Original authors:

- Steven ([@styfle](https://twitter.com/styfle)) - [Vercel](https://vercel.com)
- Evil Rabbit ([@evilrabbit](https://twitter.com/evilrabbit_)) - [Vercel](https://vercel.com)
