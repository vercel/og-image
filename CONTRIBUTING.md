# Contributing

There are two pieces to `og-image` that are worth noting before you begin development.

1. The backend image generator located in [/src/card.ts](https://github.com/styfle/og-image/blob/master/src/card.ts)
2. The frontend inputs located in [/src/browser.ts](https://github.com/styfle/og-image/blob/master/src/browser.ts)

The Now 2.0 platform handles [routing](https://github.com/styfle/og-image/blob/master/now.json#L12) in an elegate way for us so deployment is easy.

However, local development requires a few steps.

1. Run `npm run watch` to get TS to JS compilation file watch running (compiles on save)
2. Run the backend with `npm start` and visit http://localhost:13463/Boom.png
3. Run the frontend with `npx http-server .` and visit http://localhost:8080/public/index.html
4. Edit `index.html` and change the path of the script from `browser.js` to `../dist/browser.js`
5. Edit `browser.ts` and change the URL of `https://og-image.now.sh` to `http://localhost:13463`

Now you're ready to start local development!
