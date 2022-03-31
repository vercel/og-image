<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fog-image&demo-title=OG%20Image%20Generator&demo-description=A%20service%20that%20generates%20dynamic%20Open%20Graph%20images&demo-url=https%3A%2F%2Fog-image.vercel.app%2F&demo-image=https%3A%2F%2Fog-image.vercel.app%2FOpen%2520Graph%2520Image%2520as%2520a%2520Service.png%3Ftheme%3Dlight%26md%3D1%26fontSize%3D95px%26images%3Dhttps%253A%252F%252Fassets.vercel.com%252Fimage%252Fupload%252Ffront%252Fassets%252Fdesign%252Fzeit-black-triangle.svg"><img src="https://vercel.com/button" alt="Deploy with Vercel" align="right" width="128"/></a>

# [Open Graph Image as a Service](https://og-image.vercel.app)

<a href="https://twitter.com/vercel">
    <img align="right" src="https://og-image.vercel.app/tweet.png" height="300" />
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

## Why use this service?

The short answer is that it would take a long time to painstakingly design an image for every single blog post and every single documentation page. And we don't want the exact same image for every blog post because that wouldn't make the article stand out when it was shared to Twitter. 

That's where `og-image.vercel.app` comes in. We can simply pass the title of our blog post to our generator service and it will generate the image for us on the fly!

It looks like the following:

```html
<head>
  <title>Hello World</title>
  <meta property="og:image" content="https://og-image.vercel.app/Hello%20World.png" />
</head>
```

Now try changing the text `Hello%20World` to the title of your choosing and watch the magic happen ✨

## Deploy your own

You'll want to fork this repository and deploy your own image generator.

1. Click the fork button at the top right of GitHub
2. Clone the repo to your local machine with `git clone URL_OF_FORKED_REPO_HERE`
3. Change directory with `cd og-image`
4. Make changes by swapping out images, changing colors, etc (see [contributing](https://github.com/vercel/og-image/blob/main/CONTRIBUTING.md) for more info)
5. Remove all configuration inside `vercel.json` besides `rewrites`
6. Run locally with `vercel dev` and visit [localhost:3000](http://localhost:3000)  (if nothing happens, run `npm install -g vercel`)
7. Deploy to the cloud by running `vercel` and you'll get a unique URL
8. Connect [Vercel for GitHub](https://vercel.com/github) to automatically deploy each time you `git push` 🚀

## Authors

- Steven ([@styfle](https://twitter.com/styfle)) - [Vercel](https://vercel.com)
- Evil Rabbit ([@evilrabbit](https://twitter.com/evilrabbit_)) - [Vercel](https://vercel.com)
