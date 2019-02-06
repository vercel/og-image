# [Open Graph Image as a Service](https://og-image.now.sh)

<a href="https://twitter.com/zeithq/status/1092587111985881088">
    <img align="right" src="https://raw.githubusercontent.com/styfle/og-image/master/public/tweet.png" height="300" />
</a>

Serverless service that generates dynamic Open Graph images that you can embed in your `<meta>` tags.

See the image embedded in the tweet for a real use case.


## What is an Open Graph Image?

Have you ever posted a hyperlink to Twitter, Facebook, or Slack and seen an image popup?
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

Read the [blog post](https://zeit.co/blog/social-og-image-cards-as-a-service) for more info on the "Why" part.

The short answer is that it would take a long time to painstakingly design an image for every single blog post. And we don't want the exact same image for every blog post because that wouldn't make the article stand out when it was shared to Twitter. 

That's where `og-image.now.sh` comes in. We can simply pass the title of our blog post to our generator service and it will generate the image for us on the fly!

It looks like the following:

```html
<head>
  <title>Hello</title>
  <meta property="og:image" content="https://og-image.now.sh/Hello.png" />
</head>
```

Now try changing the text `Hello` to the title of your choosing and watch the magic happen ✨

## Deploy your own

You'll want to fork this repository and deploy your own image generator.

1. Click the fork button at the top right of GitHub
2. Clone the repo to your local machine with `git clone URL_OF_FORKED_REPO_HERE`
3. Make changes by swapping out images, changing colors, etc (see [contributing](https://github.com/styfle/og-image/blob/master/CONTRIBUTING.md) for more)
4. Deploy by running `now` from the CLI (if you don't already have it, run `npm install -g now`)

Alternatively, you can do a one-click to deploy with the button below.

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/styfle/og-image)

Once you have an image generator that sparks joy, you can setup [automatic Now + GitHub](https://zeit.co/github) deployments so that pushing to master is also deploying to production! 🚀

## Authors

- Steven ([@styfle](https://twitter.com/styfle)) - [ZEIT](https://zeit.co)
- Evil Rabbit ([@evilrabbit](https://twitter.com/evilrabbit_)) - [ZEIT](https://zeit.co)
