export type FileType = 'png' | 'jpeg';

export interface ParsedRequest {
    fileType: FileType;
    nodeID: string,
    width: number;
    height: number;
}
