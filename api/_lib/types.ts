export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';
export type Bg = 'dots' | 'plain';

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    theme: Theme;
    md: boolean;
    fontSize: string;
    images: string[];
    widths: string[];
    heights: string[];
    imagesCircle: boolean[];
    bg: Bg;
}
