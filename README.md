<a href="https://vercel.com/new/project?template=vercel/og-image"><img width="128" src="https://vercel.com/button" align="right"></a>

# [Open Graph Image as a Service](https://og-image.vercel.app)

Serverless service that generates dynamic Open Graph images that you can embed in your `<meta>` tags.

For each keystroke, headless chromium is used to render an HTML page and take a screenshot of the result which gets cached.

This fork has been significantly modified from [vercel/og-image](https://github.com/vercel/og-image). The goal is to dynamically create the following og-image types.

![image](https://user-images.githubusercontent.com/7415984/130135123-820a6de1-ca17-43dd-b4b5-239096b3f1f1.png)

## What is an Open Graph Image?

Have you ever posted a hyperlink to Twitter, Facebook, or Slack and seen an image popup?
How did your social network know how to "unfurl" the URL and get an image?
The answer is in your `<head>`.

The [Open Graph protocol](http://ogp.me) says you can put a `<meta>` tag in the `<head>` of a webpage to define this image.

It looks like the following:

```html
<head>
  <title>Title</title>
  <meta property="og:image" content="http://example.com/logo.jpg" />
</head>
```

## Usage

There are a few query parameters that we accept in order to dynamically generate the og:images, and those are:

1. `template`: `'site' | 'learn' | 'docs' | 'blog'`
2. `breadcrumbsText`: `string` (`docs` and `learn` type only!)
3. `titleText`: `string`
4. `subtitleText`: `string`
5. `image`: `string` (`blog` type only! URI Encoded URL to image)
6. `width`: `number` (`blog` type only! Applys to custom image)
7. `height`: `number` (`blog` type only! Applys to custom image)

The text must always be URI Encoded in the query parameter, i.e. spaces are '%20', forward slashes are '%2F', etc.

```html
<head>
  <title>Hello World</title>
  <meta property="og:image" content="https://og-image-git-ndom91-add-base-img-types-checkly.vercel.app/docs.png?titleText=**Scraping%2520%2526%2520asserting%2520on%2520a%2520page**&subtitleText=Any%2520standard%2520Node.js%2520script%2520that%2520successfully%2520finishes%2520an%2520execution%2520is%2520a%2520valid%252C%2520passing%2520browser%2520check.&breadcrumbsText=Checkly%2520Docs%2520%252F%2520Headless%2520Automation%2520%252F%2520Basics%2520Debugging&template=docs&md=1&fontSize=50px" />
</head>
```

![Docs Example](https://user-images.githubusercontent.com/7415984/130284244-d6711cc7-097c-45db-8423-5946691c87ab.png)

There is a web playground where one can experiment with all available fields located at [og-image-types-checkly.vercel.app](https://og-image-git-ndom91-add-base-img-types-checkly.vercel.app)

## Authors

- Steven ([@styfle](https://twitter.com/styfle)) - [Vercel](https://vercel.com)
- Evil Rabbit ([@evilrabbit](https://twitter.com/evilrabbit_)) - [Vercel](https://vercel.com)
- Maxi Gimenez ([@maxigimenez](https://github.com/maxigimenez)) - [Checkly](https://checklyhq.com)
- Nico Domino ([@ndom91](https://github.com/ndom91)) - [Checkly](https://checklyhq.com)
