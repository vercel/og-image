type FileType = 'png' | 'jpeg';
type Theme = 'light' | 'dark';
type ResourceType = 'series' | 'podcast' | 'instructor' | 'topic' | 'playlist'

interface ParsedRequest {
    resourceType: string;
    fileType: FileType;
    text: string;
    theme: Theme;
    md: boolean;
    fontSize: string;
    images: string[];
    widths: string[];
    heights: string[];
}
