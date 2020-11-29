export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';
export type imageType = 'Docs' | 'API' | 'Blogs';


export interface ParsedRequest {
    fileType: FileType;
    text: string;
    theme: Theme;
    md: boolean;
    fontSize: string;
    images: string[];
    widths: string[];
    heights: string[];
    imageType: string;
}
