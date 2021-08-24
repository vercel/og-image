<a href="https://vercel.com/new/project?template=vercel/og-image"><img width="128" src="https://vercel.com/button" align="right"></a>

# [Open Graph Image as a Service](https://og-image.vercel.app)

Serverless service that generates dynamic Open Graph images that you can embed in your `<meta>` tags.

For each keystroke, headless chromium is used to render an HTML page and take a screenshot of the result which gets cached.

This fork has been significantly modified from [vercel/og-image](https://github.com/vercel/og-image). The goal is to dynamically create the following og-image types.

![image](https://user-images.githubusercontent.com/7415984/130135123-820a6de1-ca17-43dd-b4b5-239096b3f1f1.png)

## 🏗 Usage

There are a few query parameters that we accept in order to dynamically generate the og:images, and those are:

1. `template` - `'site'` | `'learn'` | `'docs'` | `'blog'`
2. `breadcrumbsText` - `string` (`docs` and `learn` template only)
3. `titleText` - `string`
4. `subtitleText` - `string`
5. `fontSize` - `string` - default `96px`
6. `image` - `string` URL to image (`blog` template only)
7. `width` - `number` Applys to custom image, i.e. `450` (`blog` template only)
8. `height` - `number` Applys to custom image, i.e. `250` (`blog` template only)

The query parameter options **must always be URI Encoded**, i.e. spaces are `%20`, forward slashes are `%2F`, etc. If building a URL by hand, you can use the `encodeURIComponent()` function in the browser dev tools or the GCHQ's [CyberChef](https://gchq.github.io/CyberChef/#recipe=URL_Encode(false)&input=) tool.

```html
<head>
  <title>Hello Checkly World</title>
  <meta property="og:image" content="https://og-image-git-ndom91-add-base-img-types-checkly.vercel.app/docs.png?titleText=Scraping%2520%2526%2520asserting%2520on%2520a%2520page&subtitleText=Any%2520standard%2520Node.js%2520script%2520that%2520successfully%2520finishes%2520an%2520execution%2520is%2520a%2520valid%252C%2520passing%2520browser%2520check.&breadcrumbsText=Checkly%2520Docs%2520%252F%2520Headless%2520Automation%2520%252F%2520Basics%2520Debugging&template=docs&fontSize=50px" />
</head>
```

![Docs Example](https://user-images.githubusercontent.com/7415984/130284244-d6711cc7-097c-45db-8423-5946691c87ab.png)

There is a playground available with which one can experiment with all available fields located at [og-image-types-checkly.vercel.app](https://og-image-git-ndom91-add-base-img-types-checkly.vercel.app). **Clicking on the generated image will copy its URL to your clipboard**.

## 👷 Contributing

To contribute, you'll want to first clone the repository and install its dependencies.

```
$ git clone https://github.com/checkly/og-image.git
$ cd og-image && npm install
```

Next, you can start a normal development server with `npm run dev:local`, this will open the web playground at [`localhost:3005`](http://localhost:3005). If you visit an image URL directly (i.e. `http://localhost:3005/docs.png?template=docs&title=Hello%20World`), it will serve the png version of the image. 
 
However, if you run the dev server via `npm run dev:local:debug`, it will **start the development server with a flag to serve the raw HTML** version of the images when requested directly. So instead of getting the png image, you will get the HTML and can more easily debug styling issues.


## 👥 Authors

- Steven ([@styfle](https://twitter.com/styfle)) - [Vercel](https://vercel.com)
- Evil Rabbit ([@evilrabbit](https://twitter.com/evilrabbit_)) - [Vercel](https://vercel.com)
- Maxi Gimenez ([@maxigimenez](https://github.com/maxigimenez)) - [Checkly](https://checklyhq.com)
- Nico Domino ([@ndom91](https://github.com/ndom91)) - [Checkly](https://checklyhq.com)
