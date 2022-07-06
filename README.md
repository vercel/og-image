# Watershed Social Cards

A service that generates dynamic social media/Open Graph images for [Watershed](https://watershed.com/).

Adapted from [Vercel’s system](https://github.com/vercel/og-image).

## Adding a theme

1. Add new 2048 x 1170px background to `public/_themes` directory.
2. Open `web/index.ts` & add the name to the `THEMES` array.
3. Open `api/_lib/types.ts` & add the name to the `THEMES` array. (These are separate because the client & server don’t share code.)
4. Open `api/_lib/template.ts` & add the desired background/foreground to the `themes` object.

MIT License
