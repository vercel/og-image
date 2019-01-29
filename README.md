# [Open Graph Image Generator](https://og-image.now.sh)

A service that generates dynamic [Open Graph](http://ogp.me) images that you can embed in your `<meta>` tags.

## What is an Open Graph Image?

Have you ever posted a hyperlink to twitter, facebook, or slack and seen an image popup?
How did your social network know how to "unfurl" the URL and get an image?
The answer is in your `<head>`.

The [Open Graph protocol](http://ogp.me) says you can put a `<meta>` tag in the `<head>` of a webpage to define this image.

It looks like the following:

```html
<head>
  <title>Hello</title>
  <meta property="og:image" content="http://example.com/hello.jpg" />
</head>
```

## Why use this service?

The purpose of the `og:image` tag is to give some context to the webpage, the URL that was shared on a social network.
It would take a long time to painstakingly design an image for every single blog post so thats where `og-image.now.sh` comes in.
We can simply pass the title of our blog post as an image name and it will generate the image for us on the fly!

It looks like the following:

```html
<head>
  <title>Hello</title>
  <meta property="og:image" content="https://og-image.now.sh/Hello.png" />
</head>
```

Now try changing the text `Hello` to the title of your choosing and watch the magic happen ✨

## Deploy

You'll want to fork this repository and deploy your own image generator.

1. Click the fork button at the top right of GitHub
2. Clone the repo to your local machine with `git clone URL_TO_FORKED_REPO_HERE`
3. Make changes by swapping out images, changing colors, etc
4. Deploy by running `now` (if you don't already have it, run `npm install -g now`)

Alternatively, you can do a one-click to deploy with the button below.

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/styfle/og-image)

## Authors

Steven ([@styfle](https://twitter.com/styfle)) - [ZEIT](https://zeit.co)
