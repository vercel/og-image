# Contributing

There are two pieces to `og-image` that are worth noting before you begin development.

1. The backend image generator located in [/src/card.ts](https://github.com/zeit/og-image/blob/master/src/card.ts)
2. The frontend inputs located in [/src/browser.ts](https://github.com/zeit/og-image/blob/master/src/browser.ts)

The Now 2.0 platform handles [routing](https://github.com/zeit/og-image/blob/master/now.json#L12) in an elegate way for us so deployment is easy.

To start hacking, do the following:

1. Clone this repo with `git clone https://github.com/zeit/og-image`
2. Change directory with `cd og-image`
2. Run `yarn` or `npm install` to install all dependencies
3. Run  `yarn dev` or `npm run dev` to start the dev server
4. Visit http://localhost:8080/public/index.html
5. If necessary, edit the `exePath` in [options.ts](https://github.com/zeit/og-image/blob/master/src/options.ts) to point to your local Chrome executable

Now you're ready to start local development!

You can set an environment variable to assist with debugging `export OG_HTML_DEBUG=1`. This will render the image as HTML so you can play around with your browser's dev tools before committing changes to the template.
