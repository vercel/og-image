export interface AssetMetadata {
  defaultToLimitOrder?: boolean;
  allowedPairs?: Array<string>;
  coingeckoId?: string;
}

export interface Asset<T = AssetMetadata> {
  symbol: string;
  name: string;
  decimals: number;
  tokenAddress: string;
  chainId: number;
  primaryColor: string;
  secondaryColor: string;
  importType: AssetImportType;
  aliases?: string[];
  metadata?: Partial<T>;
}

export type AssetImportType = 'external' | 'curated' | 'custom' | 'unsupported';