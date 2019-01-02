
const logo = 'https://assets.zeit.co/image/upload/front/assets/design/now-black.svg';

const css = `
body {
    background: white;
    background-image: radial-gradient(lightgray 5%, transparent 0);
    background-size: 100px 100px;
    height: 100vh;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
}

.logo {
    width: 225px;
    height: 225px;
}

.spacer {
    margin: 150px;
}
  
.heading {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 75px;
    font-weight: bold;
}`;

function getHtml(text) {
    return `<html>
    <style>
        ${css}
    </style>
    <body>
        <div>
            <div class="spacer">
            <img class="logo" src="${logo}" />
            <div class="spacer">
            <div class="heading">${text}</div>
        </div>
    </body>
</html>`;
}

module.exports = { getHtml }