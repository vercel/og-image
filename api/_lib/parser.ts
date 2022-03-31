import { IncomingMessage } from "http";
import { parse } from "url";
import { ParsedRequest } from "./types";

export function parseRequest(req: IncomingMessage) {
  console.log("HTTP " + req.url);
  const { pathname, query } = parse(req.url || "/", true);
  const {
    fontSize,
    mainImage,
    mainImageHeight,
    mainImageWidth,
    footerImage,
    footerImageHeight,
    footerImageWidth,
    theme,
    kicker,
    subtitle,
    width,
    height,
  } = query || {};

  if (Array.isArray(fontSize)) {
    throw new Error("Expected a single fontSize");
  }
  if (Array.isArray(theme)) {
    throw new Error("Expected a single theme");
  }
  if (Array.isArray(kicker)) {
    throw new Error("Expected a single kicker");
  }
  if (Array.isArray(subtitle)) {
    throw new Error("Expected a single subtitle");
  }
  if (Array.isArray(mainImage)) {
    throw new Error("Expected a single image");
  }
  if (Array.isArray(mainImageHeight)) {
    throw new Error("Expected a single image height");
  }
  if (Array.isArray(mainImageWidth)) {
    throw new Error("Expected a single image width");
  }
  if (Array.isArray(footerImage)) {
    throw new Error("Expected a single image");
  }
  if (Array.isArray(footerImageHeight)) {
    throw new Error("Expected a single image height");
  }
  if (Array.isArray(footerImageWidth)) {
    throw new Error("Expected a single image width");
  }

  if (Array.isArray(width)) {
    throw new Error("Expected a single height");
  }
  if (Array.isArray(height)) {
    throw new Error("Expected a single width");
  }

  const arr = (pathname || "/").slice(1).split(".");
  let extension = "";
  let title = "";
  if (arr.length === 0) {
    title = "";
  } else if (arr.length === 1) {
    title = arr[0];
  } else {
    extension = arr.pop() as string;
    title = arr.join(".");
  }

  const parsedRequest: ParsedRequest = {
    fileType: extension === "jpeg" ? extension : "png",
    title: decodeURIComponent(title),
    theme: theme === "dark" ? "dark" : "light",
    fontSize: fontSize || "96px",
    mainImage: decodeURIComponent(mainImage),
    mainImageHeight,
    mainImageWidth,
    footerImage: decodeURIComponent(footerImage),
    footerImageHeight,
    footerImageWidth,
    kicker: decodeURIComponent(kicker),
    subtitle: decodeURIComponent(subtitle),
    width: parseInt(width, 10) || undefined,
    height: parseInt(height, 10) || undefined,
  };

  return parsedRequest;
}
