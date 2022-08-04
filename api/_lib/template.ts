import { readFileSync } from "fs";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";
const twemoji = require("twemoji");
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(
  `${__dirname}/../_fonts/Inter-Regular.woff2`
).toString("base64");
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString(
  "base64"
);
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString(
  "base64"
);

const ibmPlexMono = readFileSync(
  `${__dirname}/../_fonts/IBMPlexMono-Medium.ttf`
).toString("base64");

function getCss(avatarSrc: string) {
  return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    @font-face {
        font-family: 'IBMPlexMono';
        src: url(data:font/ttf;charset=utf-8;base64,${ibmPlexMono})  format("ttf");
      }

    body {
        background-color: black;
        margin: 100px;
    }

    .purple-gradient {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 30%;
      z-index: -1;
    }

    .blue-gradient {
      position: absolute;
      top: 0;
      right: 0;
      z-index: -1;
    }

    .icon {
      width: 80px;
      height: 80px;
      margin-right: 25px;
      margin-top: 4px;
    }

    .heading-icon {
      width: 100px;
      height: 100px;
      margin-right: 30px;
      margin-top: 40px
    }

    .heading-wrapper {
      display: flex;
    }

    .list-container {
      display: flex;
    }

    .list {
      display: flex;
      flex-direction: row;
      margin-right: 40px;
      margin-bottom: 30px
    }

    .right-side {
      margin-left: 60px;
      display: flex;
      justify-content: center;
      flex-direction: column;
    }

    .bottom-section-container {
      position: absolute;
      bottom: 80px;
      left: 80px;
      width: 80vw;
    }

    .bottom-section {
      margin-top: 40px;
    }

    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 40px;
      margin-bottom: 40px;
      flex-direction: column;
    }

    .avatar-image {
      width: 200px;
      height: 200px;
      filter: url(#round);
      display: grid;
    }

    .avatar-image::before {
      content: "";
      display: block;
      margin: auto 0;
      padding-top: 86.6%;
      background: url("${avatarSrc}");
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    }

    .container {
      display: flex;
      justify-content: space-between;
    }

    .spacer {
        margin: 150px;
    }
    
    .heading {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      max-width: 1250px;
      overflow: hidden;
      font-family: 'Inter', sans-serif;
      font-size: 100px;
      font-style: normal;
      font-weight: bold;
      color: white;
      line-height: 1.8;
    }
    
    .description {
      margin-top: 20px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      max-width: 1300px;
      overflow: hidden;
      font-family: 'Inter', sans-serif;
      font-size: 70px;
      font-style: normal;
      color: white;
      opacity: 70%;
      line-height: 1.5;
    }

    .releaser {
      font-family: 'Inter', sans-serif;
      font-size: 70px;
      font-style: normal;
      color: white;
    }

    .list-text {
      font-family: 'Inter', sans-serif;
      font-size: 70px;
      font-style: normal;
      color: white;
      margin-top: 4px
  }

    .logo-wrapper {
      position: absolute;
      bottom: 120px;
      right: 120px;
    }`;
}

export function shortenString(str: string, extraShort?: true) {
  return `${str.substring(0, extraShort ? 4 : 6)}...${str.substring(
    str.length - 4
  )}`;
}

export function getHtml(parsedReq: ParsedRequest) {
  let { contractName, version, description, releaser, extensions, avatar } =
    parsedReq;

  contractName = contractName === "undefined" ? "Contract" : contractName;
  description =
    description === "undefined"
      ? "Deploy this contract in one click"
      : description;
  version = version === "undefined" ? "" : version;
  avatar = avatar === "undefined" ? "" : avatar;
  extensions = extensions.filter((extension) => extension !== "undefined");

  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(
          avatar
            ? avatar
            : `https://source.boringavatars.com/marble/120/${releaser}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51?square`
        )}
    </style>
    <body>
      <img
        class="purple-gradient"
        alt="Generated Image"
        src="https://thirdweb.com/assets/og-image/purple-gradient.png"
      />
      <img
        class="blue-gradient"
        alt="Generated Image"
        src="https://thirdweb.com/assets/og-image/blue-gradient.png"
      />
      <svg
        style="visibility: hidden; position: absolute;"
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
    >
      <defs>
        <filter id="round">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
    <div>
      <div class="container">
        <div>
          <div class="heading-wrapper">
            <svg class="heading-icon" width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.44141 20.1211L11.2305 24.9961C11.5352 25.168 11.8438 25.2539 12.1562 25.2539C12.4688 25.2539 12.7773 25.168 13.082 24.9961L21.8828 20.1211C22.4219 19.8086 22.8242 19.457 23.0898 19.0664C23.3555 18.6758 23.4883 18.0898 23.4883 17.3086V8.27344C23.4883 7.67969 23.3711 7.18359 23.1367 6.78516C22.9102 6.38672 22.5391 6.04297 22.0234 5.75391L14.2656 1.41797C13.5703 1.03516 12.8672 0.84375 12.1562 0.84375C11.4453 0.84375 10.7422 1.03516 10.0469 1.41797L2.28906 5.75391C1.78125 6.04297 1.41016 6.38672 1.17578 6.78516C0.941406 7.18359 0.824219 7.67969 0.824219 8.27344V17.3086C0.824219 18.0898 0.957031 18.6758 1.22266 19.0664C1.49609 19.457 1.90234 19.8086 2.44141 20.1211ZM3.71875 18.3047C3.42969 18.1406 3.22266 17.9648 3.09766 17.7773C2.98047 17.582 2.92188 17.3398 2.92188 17.0508V9.10547L11.0664 13.6875V22.4414L3.71875 18.3047ZM20.5938 18.3047L13.2578 22.4414V13.6875L21.4023 9.10547V17.0508C21.4023 17.3398 21.3398 17.582 21.2148 17.7773C21.0977 17.9648 20.8906 18.1406 20.5938 18.3047ZM12.1562 11.7539L4.11719 7.26562L7.07031 5.58984L15.1211 10.0898L12.1562 11.7539ZM17.3477 8.85938L9.29688 4.37109L10.9961 3.41016C11.7773 2.96484 12.5508 2.96484 13.3164 3.41016L20.1953 7.26562L17.3477 8.85938Z" fill="white" fill-opacity="0.5"/>
            </svg>
            <div class="heading">
              ${emojify(sanitizeHtml(contractName))}
            </div>
          </div>
          <div class="description">
            ${emojify(sanitizeHtml(description))}
          </div>
        </div>
        <div class="right-side">
          <div class="avatar">
            <div class="avatar-image" />
          </div>
           
          
        
          <div class="releaser">
            ${emojify(
              sanitizeHtml(
                releaser.startsWith("0x")
                  ? shortenString(releaser, true)
                  : releaser
              )
            )}
          </div>
        </div>
      </div>
      <div class="bottom-section-container">
          <div class="list-container">
            <div class="list">
              <svg class="icon" width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.623 22.84L2.79635 15.2L0.636353 16.88L12.6364 26.2133L24.6364 16.88L22.463 15.1866L12.623 22.84ZM12.6364 19.4533L22.4497 11.8133L24.6364 10.12L12.6364 0.786621L0.636353 10.12L2.80969 11.8133L12.6364 19.4533ZM12.6364 4.15996L20.2897 10.12L12.6364 16.08L4.98302 10.12L12.6364 4.15996V4.15996Z" fill="white" fill-opacity="0.5"/>
              </svg>
              <div class="list-text">
                v${emojify(sanitizeHtml(version))}
              </div>
            </div>
          </div>
          ${
            extensions.length > 0
              ? `
              <div class="list">
              <svg class="icon" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 24.5H18.6667V21.8333H16V24.5ZM21.3333 24.5H24V21.8333H21.3333V24.5ZM5.33333 24.5H8V21.8333H5.33333V24.5ZM10.6667 24.5H13.3333V21.8333H10.6667V24.5ZM21.3333 19.1667H24V16.5H21.3333V19.1667ZM21.3333 13.8333H24V11.1667H21.3333V13.8333ZM0 0.5V24.5H2.66667V3.16667H24V0.5H0ZM21.3333 8.5H24V5.83333H21.3333V8.5Z" fill="white" fill-opacity="0.5"/>
              </svg>
      
              <div class="list-text">
              ${extensions
                .splice(0, 3)
                .map((extension) => `${emojify(sanitizeHtml(extension))}`)
                .join(", ")}
              </div>
              </div>
            `
              : ""
          }
        </div>

    </div>
    <div class="logo-wrapper">
    <img
        class="logo"
        alt="Generated Image"
        src="https://thirdweb.com/brand/thirdweb-icon.png"
        width="auto"
        height="100px"
    />
  </div>
  </body>
</html>`;
}
