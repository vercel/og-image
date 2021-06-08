function getVars(theme: Theme) {
  switch (theme) {
    case 'dark':
      return {
        text_color: '#fff',
        background_color: '#000',
        pattern_color: '#333',
      };
    case 'light':
      return {
        text_color: '#000',
        background_color: '#fff',
        pattern_color: '#ddd',
      };
  }
}

export function getStyles(theme: Theme, fontSize: string) {
  const { text_color, background_color, pattern_color } = getVars(theme);

  return `
    <head>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600" rel="stylesheet"/>

      <style>
        :root {
          --pattern: 5rem;
        }
        body {
          font-size: ${fontSize}pt;
          font-family: "Inter", sans-serif;
          color: ${text_color};
          background: ${background_color};
          background-image: 
            radial-gradient(circle at calc(var(--pattern) * 0.25) calc(var(--pattern) * 0.25), ${pattern_color} 2%, transparent 0%), 
            radial-gradient(circle at calc(var(--pattern) * 0.75) calc(var(--pattern) * 0.75), ${pattern_color} 2%, transparent 0%)
          ;
          background-size: var(--pattern) var(--pattern);
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        p {
          text-align: center;
          max-width: 80vw;
        }
        strong {
          font-weight: 600;
        }
      </style>
    </head>
  `;
}

export function getImageStyles(image: Image) {
  return `
    width: ${image.width}rem;
    height: ${image.height}rem;
  `;
}
