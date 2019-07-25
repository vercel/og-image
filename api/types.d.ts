type FileType = 'png' | 'jpeg';
type Theme = 'light' | 'dark';

interface ParsedRequest {
    fileType: FileType;
    text: string;
    theme: Theme;
    md: boolean;
    fontSize: string;
    images: string[];
    widths: string[];
    heights: string[];
}
