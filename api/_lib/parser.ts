import { IncomingMessage } from "http";
import { parse } from "url";
import { ParsedRequest } from "./types";

export function parseRequest(req: IncomingMessage) {
	console.log("HTTP " + req.url);
	const { pathname, query } = parse(req.url || "/", true);
	const { fontSize, widths, heights, theme, md, desc } = query || {};

	if (Array.isArray(fontSize)) {
		throw new Error("Expected a single fontSize");
	}
	if (Array.isArray(theme)) {
		throw new Error("Expected a single theme");
	}

	let extension = "png";
	const text = (pathname || "/").slice(1);
	const description = String(desc);

	const parsedRequest: ParsedRequest = {
		fileType: extension === "jpeg" ? extension : "png",
		text: decodeURIComponent(text),
		desc: decodeURIComponent(description),
		theme: theme === "dark" ? "dark" : "light",
		md: md === "1" || md === "true",
		fontSize: fontSize || "96px",
		images: ["http://clipart-library.com/data_images/6103.png"], //https://shanmukh.xyz/avatar.png
		widths: getArray(widths),
		heights: getArray(heights),
	};
	return parsedRequest;
}

function getArray(stringOrArray: string[] | string | undefined): string[] {
	if (typeof stringOrArray === "undefined") {
		return [];
	} else if (Array.isArray(stringOrArray)) {
		return stringOrArray;
	} else {
		return [stringOrArray];
	}
}
