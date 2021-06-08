// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { parseFile } from 'lib/parseFile';
import { parseImages } from 'lib/parseImages';
import { getTemplate } from 'lib/getTemplate';
import { getScreenshot } from 'lib/getScreenshot';
import {
  parseQueryArray,
  parseQueryBoolean,
  parseQueryString,
} from 'lib/parseQuery';

import type { NextApiHandler } from 'next';

const API: NextApiHandler = async (req, res) => {
  const { file, theme, fontSize, images, widths, heights, md, debugHTML } =
    req.query;

  const parsedFile = parseQueryString(file);
  const { slug, extension } = parseFile(parsedFile);

  const parsedThemePreference = parseQueryString(theme);
  const parsedFontSize = parseQueryString(fontSize);

  const parsedImageSources = parseQueryArray(images);
  const parsedImageWidths = parseQueryArray(widths);
  const parsedImageHeights = parseQueryArray(heights);

  const parsedMD = parseQueryBoolean(md);
  const parsedDebugHTML = parseQueryBoolean(debugHTML);

  const parsedTheme = parsedThemePreference == 'dark' ? 'dark' : 'light';

  const parsedImages = parseImages(
    parsedImageSources,
    parsedImageWidths,
    parsedImageHeights
  );

  const fallbackImage = {
    src:
      theme == 'light'
        ? 'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-black.svg'
        : 'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-white.svg',
    width: '8',
    height: '8',
  };

  const template = getTemplate(
    slug,
    parsedTheme,
    parsedImages.length ? parsedImages : [fallbackImage],
    parsedFontSize.length ? parsedFontSize : '12',
    parsedMD
  );

  if (parsedDebugHTML) {
    res.status(200).send(template);
  } else {
    res.setHeader('Content-Type', `image/${extension}`);
    res.setHeader('Cache-Control', 'public, immutable, max-age=604800');

    const screenshot = await getScreenshot(template, extension);
    res.status(200).send(screenshot);
  }
};

export default API;
