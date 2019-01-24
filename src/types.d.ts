type ScreenshotType = 'png' | 'jpeg';
type Theme = 'light' | 'dark';

interface ParsedRequest {
    type: ScreenshotType;
    text: string;
    theme: Theme;
    md: boolean;
    fontSize: string;
    images: string[];
}