// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import chrome from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';
import marked from 'marked';

import type { NextApiHandler } from 'next';

const getPage = async () => {
  const browser = await puppeteer.launch(
    process.env.AWS_REGION
      ? {
          args: chrome.args,
          executablePath: await chrome.executablePath,
          headless: chrome.headless,
        }
      : {
          args: [],
          executablePath:
            process.platform === 'win32'
              ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
              : process.platform === 'linux'
              ? '/usr/bin/google-chrome'
              : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
          headless: true,
        }
  );
  const page = await browser.newPage();
  return page;
};

const getScreenshot = async (html: string) => {
  const page = await getPage();
  await page.setViewport({ width: 1600, height: 900 });
  await page.setContent(html);

  const file = await page.screenshot({ type: 'png' });
  return file;
};

const API: NextApiHandler = async (req, res) => {
  const { file, theme, img, img_size, text, text_size } = req.query;

  let html = '<p>Hello, World!</p>';

  if (typeof text == 'string') {
    html = marked(text);
  }

  let text_color = '#000';
  let background_color = '#fff';
  let radial_color = '#ddd';
  let logo =
    'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-black.svg';

  switch (theme) {
    case 'dark':
      text_color = '#fff';
      background_color = '#000';
      radial_color = '#333';
      logo =
        'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-white.svg';
      break;
    case 'light':
      text_color = '#000';
      background_color = '#fff';
      radial_color = '#ddd';
      logo =
        'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-black.svg';
      break;
  }

  const template = `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.gstatic.com"/>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600" rel="stylesheet"/>

    <style>
      :root {
        --pattern: 5rem;
      }
      html {
        font-family: "Inter", sans-serif;
      }
      body {
        color: ${text_color};
        background: ${background_color};
        background-image: radial-gradient(circle at calc(var(--pattern) * 0.25) calc(var(--pattern) * 0.25), ${radial_color} 2%, transparent 0%), radial-gradient(circle at calc(var(--pattern) * 0.75) calc(var(--pattern) * 0.75), ${radial_color} 2%, transparent 0%);
        background-size: var(--pattern) var(--pattern);
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      img {
        display: inline-block;
        width: ${img_size + 'rem' ?? '12rem'};
        height: calc(${img_size + 'rem' ?? '12rem'} * 0.866);
      }
      div > img {
        margin: 0 2rem;
      }
      p {
        font-size: ${text_size + 'rem' ?? '5rem'};
        text-align: center;
        max-width: 80vw;
      }
      strong {
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    ${
      img
        ? typeof img == 'string'
          ? `<img src="${img}" />`
          : `<div>${img.map((img) => `<img src="${img}" />`).join('')}</div>`
        : `<img src="${logo}" />`
    }
    ${html}
  </body>
</html>`;

  const screenshot = await getScreenshot(template);
  res.setHeader('Content-Type', `image/png`);
  res.setHeader('Cache-Control', 'public, immutable, max-age=604800');
  res.status(200).send(screenshot);
};

export default API;
