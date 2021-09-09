import uniqBy from 'lodash/uniqBy';
import {
  UnknownTokenPrimaryColor,
  UnknownTokenSecondaryColor,
} from '../_styles/theme';
import type { Asset, AssetImportType, AssetMetadata } from '../_types/matcha';
import {
  CHAIN_IDS,
  NATIVE_CHAIN_TOKEN_FAKE_CONTRACT_ADDRESS,
  NULL_ADDRESS,
} from './constants';
import axios from 'axios';

const COINGECKO_TOKEN_LIST_POLYGON =
  'https://tokens.coingecko.com/polygon-pos/all.json';
const COINGECKO_TOKEN_LIST_BSC =
  'https://tokens.coingecko.com/binance-smart-chain/all.json';

export interface TokenListSchema {
  name: string;
  timestamp: string;
  version: Version;
  tags: Tags;
  logoURI: string;
  keywords?: string[] | null;
  tokens: TokensEntity[];
}
export interface Version {
  major: number;
  minor: number;
  patch: number;
}
export interface Tags {}
export interface TokensEntity {
  name: string;
  symbol: string;
  address: string;
  chainId: number;
  decimals: number;
  logoURI: string;
}

const nativePolygon: Asset<AssetMetadata> = {
  chainId: CHAIN_IDS.MATIC,
  decimals: 18,
  importType: 'curated',
  name: 'Polygon',
  symbol: 'MATIC',
  primaryColor: '#ffffff',
  secondaryColor: '#ffffff',
  tokenAddress: NATIVE_CHAIN_TOKEN_FAKE_CONTRACT_ADDRESS,
  aliases: [],
  metadata: {
    coingeckoId: 'polygon',
  },
};

const nativeBnb: Asset<AssetMetadata> = {
  chainId: CHAIN_IDS.BSC,
  decimals: 18,
  importType: 'curated',
  name: 'Binance Coin',
  symbol: 'BNB',
  primaryColor: '#F0B90B',
  secondaryColor: '#FFF6DA',
  tokenAddress: NATIVE_CHAIN_TOKEN_FAKE_CONTRACT_ADDRESS,
  aliases: [],
  metadata: {
    coingeckoId: 'binancecoin',
  },
};

interface UnsupportedTokensData {
  unsupportedTokens: TokenListSchema;
  unsupportedKeywords: Array<string>;
}

interface UnsupportedAssetsAndKeywords {
  unsupportedAssets: Array<Asset>;
  unsupportedKeywords: Array<string>;
}

const fetchUnsupportedTokensAndKeywords = async (): Promise<
  UnsupportedAssetsAndKeywords
> => {
  const unsupportedTokensDataRaw = await axios.get('/api/unsupported-tokens');
  const unsupportedTokensData: UnsupportedTokensData = unsupportedTokensDataRaw.data;

  // Map to internal asset representation
  const unsupportedAssets = unsupportedTokensData.unsupportedTokens.tokens?.map(
    (token) => {
      return {
        symbol: token.symbol.toUpperCase(),
        name: token.name,
        decimals: token.decimals,
        tokenAddress: token.address.toLowerCase(),
        primaryColor: UnknownTokenPrimaryColor,
        secondaryColor: UnknownTokenSecondaryColor,
        importType: 'unsupported' as AssetImportType,
        chainId: token.chainId,
      };
    },
  );
  return {
    unsupportedAssets,
    unsupportedKeywords: unsupportedTokensData.unsupportedKeywords,
  };
};

const fetchAssetsForEthereum = async (): Promise<Array<Asset>> => {
  // Via https://bsctokenlists.org/token-list?url=https://gateway.pinata.cloud/ipfs/QmdKy1K5TMzSHncLzUXUJdvKi1tHRmJocDRfmCXxW5mshS
  const rawTokenList = await axios.get(
    'https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokens.1inch.eth.link',
  );
  if (rawTokenList.status >= 400) {
    throw new Error('Unable to fetch tokenlist');
  }
  const tokenList: TokenListSchema = rawTokenList.data;

  const assetsFromTokenList: Array<Asset> = tokenList.tokens?.map((token) => {
    if (token.symbol === 'MATIC') {
      token.name = 'Polygon';
    }
    return {
      symbol: token.symbol.toUpperCase(),
      name: token.name,
      decimals: token.decimals,
      tokenAddress: token.address.toLowerCase(),
      primaryColor: UnknownTokenPrimaryColor,
      secondaryColor: UnknownTokenSecondaryColor,
      importType: 'external',
      chainId: CHAIN_IDS.MAINNET,
    };
  });

  const filtered = assetsFromTokenList
    .filter((x) => x.tokenAddress !== NULL_ADDRESS)
    .filter((x) => x.symbol !== 'ETH')
    .filter((x) => x.symbol !== 'BTC')
    .filter((x) => x.symbol !== 'ETHRSIAPY');

  const allAssets = [...filtered];
  return allAssets;
};

const BSC_ALLOW_LIST = [
  'WBNB',
  'BUSD',
  'CAKE',
  'ETH',
  'USDT',
  'BTCB',
  'BDO',
  'BETH',
  'DOT',
  'AUTO',
  'UST',
  'BELT',
  'USDC',
  'VAI',
  'DAI',
  'BUNNY',
  'ADA',
  'UNI',
  'LINK',
  'ALPACA',
  'ALPHA',
  'XRP',
  'EGG',
  'BSCX',
  'SBDO',
  'SXP',
  'BTD',
  'LTC',
  'MSC',
  'BAND',
  'WOOP',
  'COMP',
  'XVS',
  'SUSHI',
  'BRY',
  'ATOM',
  'EOS',
  'BLZD',
  'HEMLET',
  'TWT',
  'TPT',
  'LIT',
  'SFP',
  'REEF',
  'DODO',
  'INJ',
  'FRONT',
  'BEL',
  'ALICE',
  'BIFI',
  'YFI',
  'MDO',
  'TOOLS',
  'SOUP',
  'WAULT',
  'SAFEMOON',
  'FUEL',
  'WATCH',
  'EGLD',
  'IOTX',
  'UNFI',
  'BTCST',
  'TRADE',
  'LINE',
  'NRV',
  'BALBT',
  'ZEE',
  'HARD',
  'ZSEED',
  'FOR',
  'SWIRL',
  'BOR',
  'BFI',
  'SWGB',
  'DITTO',
  'BMXX',
  'BOG',
  'BOPEN',
  'SWAMP',
  'MSS',
  'COS',
  'SWINGBY',
  'DUSK',
  'NULS',
  'RAMP',
  'XTZ',
  'MGOOG',
  'MAMZN',
  'DEXE',
  'HGET',
  'BUX',
  'FIL',
  'BCH',
];

const POLYGON_ALLOW_LIST = [
  'ETH',
  'WETH',
  'USDC',
  'WMATIC',
  'USDT',
  'WBTC',
  'QUICK',
  'DAI',
  'LINK',
  'AAVE',
  'SUSHI',
  // 'FISH',
  // 'TEL',
  // 'WISE',
  // 'DEFI5',
  // 'GHST',
  // 'CEL',
  // 'WOLF',
  // 'PAUTO',
  // 'KRILL',
  'UNI',
  // 'BIFI',
  // 'ADDY',
  // 'UBT',
  // '$DG',
  // 'GAJ',
  // 'SX',
  // 'POLYDOGE',
  // 'DEGEN',
  // 'MOCEAN',
  // 'POLR',
  // 'AGAr',
  // 'AGA',
  // 'PolyMoon',
  // 'GFI',
  // 'VISION',
  // 'GAME',
  // 'EMON',
  // 'FRAX',
  // 'SUPER',
  // 'HEX',
  // 'PYR',
  // 'SWAP',
  // 'ANY',
  // 'DSLA',
  // 'FXS',
  // 'IGG',
  // 'SSGT',
  // 'PLOT',
  // 'POLYGOLD',
  // 'QUACK',
  // 'GEN',
  // 'SRAT',
  // 'PCAKE',
  // 'SAFU',
  // 'DRC',
  // 'BTU',
  // 'xMARK',
  // 'AURORA',
  // 'MOWL',
  // 'DMT',
  // 'LION',
  // 'BzB',
  // 'PolyStar',
  // 'MOON',
];

export const MATIC_WETH_ADDRESS = '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619';
const fetchAssetsForPolygon = async (): Promise<Array<Asset>> => {
  // Via https://bsctokenlists.org/token-list?url=https://gateway.pinata.cloud/ipfs/QmdKy1K5TMzSHncLzUXUJdvKi1tHRmJocDRfmCXxW5mshS
  const rawTokenList = await axios.get(COINGECKO_TOKEN_LIST_POLYGON);
  if (rawTokenList.status >= 400) {
    throw new Error('Unable to fetch tokenlist');
  }
  const tokenList: TokenListSchema = rawTokenList.data;

  const assetsFromTokenList: Array<Asset> = tokenList.tokens?.map((token) => {
    return {
      symbol: token.symbol.toUpperCase(),
      name: token.name,
      decimals: token.decimals,
      tokenAddress: token.address.toLowerCase(),
      primaryColor: UnknownTokenPrimaryColor,
      secondaryColor: UnknownTokenSecondaryColor,
      // HACK(johnrjj) - Right now we only allow a limited subset from coingecko, we'll mark as curated to avoid scary disclosures.
      importType: 'external',
      chainId: CHAIN_IDS.MATIC,
    };
  });

  const ETH_FOR_MATIC: Asset = {
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
    tokenAddress: MATIC_WETH_ADDRESS.toLowerCase(),
    primaryColor: '#000000',
    secondaryColor: '#E8ECFD',
    importType: 'external',
    chainId: CHAIN_IDS.MATIC,
  };

  // Weird token list includes 0x0000000 as matic
  const filtered = assetsFromTokenList
    .filter((x) => x.symbol !== 'MATIC')
    .filter((x) => x.tokenAddress !== NULL_ADDRESS)
    .filter((x) => POLYGON_ALLOW_LIST.includes(x.symbol));

  const allAssets = uniqBy(
    [nativePolygon, ETH_FOR_MATIC, ...filtered],
    (x) => `${x.tokenAddress}-${x.chainId}`,
  );
  return allAssets;
};

// http://tokens.1inch.eth.link

const fetchAssetsForBsc = async (): Promise<Array<Asset>> => {
  // Via https://bsctokenlists.org/token-list?url=https://gateway.pinata.cloud/ipfs/QmdKy1K5TMzSHncLzUXUJdvKi1tHRmJocDRfmCXxW5mshS
  const rawTokenList = await axios.get(COINGECKO_TOKEN_LIST_BSC);
  if (rawTokenList.status >= 400) {
    throw new Error('Unable to fetch tokenlist');
  }
  const tokenList: TokenListSchema = rawTokenList.data;

  const assetsFromTokenList: Array<Asset> = tokenList.tokens?.map((token) => {
    return {
      symbol: token.symbol.toUpperCase(),
      name: token.name,
      decimals: token.decimals,
      tokenAddress: token.address.toLowerCase(),
      primaryColor: UnknownTokenPrimaryColor,
      secondaryColor: UnknownTokenSecondaryColor,
      importType: 'external',
      chainId: CHAIN_IDS.BSC,
    };
  });

  const filtered = assetsFromTokenList
    .filter(
      (x) => x.tokenAddress !== '0x441761326490cacf7af299725b6292597ee822c2',
    )
    .filter(
      (x) => x.tokenAddress !== '0x14ace3d3429408bfa8562099a253172913ad71bd',
    )
    .filter((x) => x.tokenAddress !== NULL_ADDRESS)
    .filter((x) => x.symbol !== 'BNB')
    .filter((x) => BSC_ALLOW_LIST.includes(x.symbol));

  const allAssets = uniqBy(
    [nativeBnb, ...filtered],
    (x) => `${x.tokenAddress}-${x.chainId}`,
  );
  return allAssets;
};

// // Tokenlists from Coingecko for BSC and Polygon btw https://tokens.coingecko.com/polygon-pos/all.json
// // https://tokens.coingecko.com/binance-smart-chain/all.json

// const pickAssetsStaticFactory = (tokensSymbolOrAddress: string[]) => {
//   return (assets: Asset[], _assetsStatsMap: TokensStats) => {
//     return tokensSymbolOrAddress
//       .map((symbolOrAddress) => {
//         return assets.find(
//           (a: Asset) =>
//             a.symbol === symbolOrAddress ||
//             a.tokenAddress.toLowerCase() === symbolOrAddress.toLowerCase(),
//         );
//       })
//       .filter((a) => !!a) as Asset[];
//   };
// };

export {
//   pickAssetsStaticFactory,
  fetchAssetsForBsc,
  fetchAssetsForPolygon,
  fetchAssetsForEthereum,
  fetchUnsupportedTokensAndKeywords,
};
