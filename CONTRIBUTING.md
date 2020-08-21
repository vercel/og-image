# Contributing

There are two pieces to `screenshotter` that are worth noting before you begin development.

1. The backend screenshot generator located in [/api/index.ts](https://github.com/wei/screenshotter/blob/master/api/index.ts)
2. The frontend inputs located in [/web/index.ts](https://github.com/wei/screenshotter/blob/master/web/index.ts)

Vercel handles [routing](https://github.com/wei/screenshotter/blob/master/vercel.json#L6) in an elegate way for us so deployment is easy.

To start hacking, do the following:

1. Clone this repo with `git clone https://github.com/wei/screenshotter`
2. Change directory with `cd screenshotter`
3. Run `yarn` or `npm install` to install all dependencies
4. Run locally with `vercel dev` and visit [localhost:3000](http://localhost:3000)  (if nothing happens, run `npm install -g vercel`)
5. If necessary, edit the `exePath` in [options.ts](https://github.com/wei/screenshotter/blob/master/api/_lib/options.ts) to point to your local Chrome executable

Now you're ready to start local development!
