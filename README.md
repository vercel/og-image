# Egghead Open Graph Images

This automatically generates Open Graph images for Egghead courses.

Navigate to `https://og-image-egghead-course.now.sh` followed by the slug of the course you want an image for.



#### For Example

`https://og-image-egghead-course.now.sh/gatsby-theme-authoring` creates this:

![](https://og-image-egghead-course.now.sh/gatsby-theme-authoring)

`https://og-image-egghead-course.now.sh/vue-and-socket-io-for-real-time-communication` creates this:

![](https://og-image-egghead-course.now.sh/vue-and-socket-io-for-real-time-communication)

---


# [Open Graph Image as a Service](https://og-image.now.sh)

<a href="https://twitter.com/zeithq/status/1092587111985881088">
    <img align="right" src="https://raw.githubusercontent.com/zeit/og-image/master/public/tweet.png" height="300" />
</a>

Serverless service that generates dynamic Open Graph images that you can embed in your `<meta>` tags.

For each keystroke, headless chromium is used to render an HTML page and take a screenshot of the result which gets cached.

See the image embedded in the tweet for a real use case.


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