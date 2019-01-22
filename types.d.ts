type FontWeight = 'normal' | 'bold';
type ScreenshotType = 'png' | 'jpeg';

interface ParsedRequest {
    type: ScreenshotType;
    text: string;
    md: boolean,
    fontWeight: FontWeight;
    fontSize: string;
    images: string[];
}