type ScreenshotType = 'png' | 'jpeg';

interface ParsedRequest {
    type: ScreenshotType;
    text: string;
    md: boolean;
    fontSize: string;
    images: string[];
}