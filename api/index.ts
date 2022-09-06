import { VercelRequest, VercelResponse } from "@vercel/node";
import screenshot from "./lib/screenshot";

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== "GET") {
    return res.status(400).json({ error: "invalid method" });
  }

  const url = Array.isArray(req.query.url) ? req.query.url[0] : req.query.url;

  if (!url) {
    return res.status(400).json({ error: "missing url" });
  }

  let parsedUrl;

  try {
    parsedUrl = new URL(url);
  } catch (err) {
    return res.status(400).json({ error: "unable to parse url" });
  }

  const { hostname, origin } = parsedUrl;

  // make sure the url is allowed if we're NOT on development
  if (process.env.VERCEL_ENV !== "development") {
    // check if the hostname is prod or preview
    if (
      // prod
      hostname.endsWith("thirdweb.com") ||
      // preview
      (hostname.endsWith("-thirdweb.vercel.app") &&
        origin.startsWith("https://thirdweb-"))
    ) {
      // allow only `_og` paths
    } else {
      return res.status(401).json({ error: "invalid hostname" });
    }
  }

  // if (!pathname.includes("_og")) {
  //   return res.status(400).json({ error: "invalid url" });
  // }

  console.log({ origin, hostname, env: process.env.VERCEL_ENV });

  try {
    const file = await screenshot(url);
    res.setHeader("Content-Type", `image/png`);
    res.setHeader(
      "Cache-Control",
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    );
    res.statusCode = 200;
    res.end(file);
    return;
  } catch (err) {
    console.error("failed to get screenshot", err);
  }

  return res.status(500).json({ error: "internal server error" });
};
