export type FileType = 'png' | 'jpeg';
export type Template = 'site' | 'docs' | 'learn' | 'blog';

export interface ParsedRequest {
    template: Template | string;
    templateImage: string;
    fileType: FileType;
    md: boolean;
    fontSize: string;
    images: string[];
    widths: string[];
    heights: string[];
    intro: boolean;
    titleText: string;
    subtitleText: string;
    breadcrumbsText: string;
}
