import marked from 'marked';

import { getStyles, getImageStyles } from './getStyles';

export function getTemplate(
  text: string,
  theme: Theme,
  images: Image[],
  fontSize: string,
  markdown: boolean
) {
  return `
    <!DOCTYPE html>
    <html>
      ${getStyles(theme, fontSize)}
      <body>
        ${images
          .map(
            (image) => `<img src="${image}" style="${getImageStyles(image)}"`
          )
          .join('+')}
        ${markdown ? marked(text) : text}
      </body>
    </html>
  `;
}
