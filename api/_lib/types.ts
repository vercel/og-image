export type ResponseFormat = 'json' | 'jpeg';

export interface ParsedRequest {
    responseFormat: ResponseFormat;
    nodeID: string,
    width: number;
    height: number;
}

export interface JSONResponse {
    screenshot: string
}
