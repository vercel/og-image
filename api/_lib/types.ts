import { Viewport } from 'puppeteer';

export interface ParsedRequest {
    url: string;
    selector: string[];
    canvas: boolean;
    ua: string | undefined;
    size: Viewport;
    full: boolean;
    css: string | undefined;
    waitforframe: number | undefined;
}
