export type ResponseFormat = 'json' | 'jpeg';
export type ItemType = 'project' | 'node';

export interface ParsedRequest {
    responseFormat: ResponseFormat;
    itemID: string;
    itemType: ItemType;
    width: number;
    height: number;
}

export interface JSONResponse {
    screenshot: string
}
