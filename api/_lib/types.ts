export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';
// add a type such as docs, api

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    theme: Theme;
    md: boolean;
    fontSize: string;
    images: string[];
    widths: string[];
    heights: string[];
}
