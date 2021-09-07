export type Theme = 'light' | 'dark';

export interface ParsedRequest {
    baseTokenAddr: string;
    quoteTokenAddr?: string;
    baseTokenSymbol: string;
    quoteTokenSymbol?: string;
    chainId: number;
    theme: Theme;
}
