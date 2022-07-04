export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    theme: Theme;
    md: boolean;
    images: string[];
    widths: string[];
    heights: string[];
    subtitle: string;
    image: string;
}
