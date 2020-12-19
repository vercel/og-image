export type FileType = 'png' | 'jpeg';

export interface ParsedRequest {
    type: string;
}

export interface ArtParsedRequest extends ParsedRequest {
    hash: string;
    type: 'art';
}
