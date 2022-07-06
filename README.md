# Watershed Social Cards

A service that generates dynamic social media/Open Graph images for [Watershed](https://watershed.com/).

Based heavily on [Vercel’s system](https://vercel.com/blog/social-og-image-cards-as-a-service).

## Adding a theme

1. Open `web/index.ts` & add the name to the `THEMES` array.
2. Open `api/_lib/types.ts` & add the name to the `THEMES` array. (These are separate because the client & server don’t share code.)
3. Open `api/_lib/template.ts` & add the desired background/foreground to the `themes` object. Add image imports above modeled off the existing ones.

MIT License
