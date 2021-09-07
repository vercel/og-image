import { CHAIN_IDS } from './constants';

export const DEFAULT_CHAIN_ID = CHAIN_IDS.MAINNET;

export const WEB3_APP_DISPLAY_NAME = 'matcha.xyz';
export const PRODUCTION_ROOT_URL = 'matcha.xyz';
export const PRODUCTION_ROOT_URLS = [PRODUCTION_ROOT_URL];

export const DEFAULT_BITSKI_REDIRECT_PATH = '/bitski-redirect';

export const BITSKI_CLIENT_ID = 'd751498d-984d-490a-8c99-70073d7c7215';

export const USERSNAP_PUBLIC_API_KEY = 'b78ecf87-d621-4802-a45c-83afc4fea58f';

export const COVALENT_API_KEY = 'ckey_44bb30a2a6b8496d893fecb142f';

export const JSON_RPC_URL_MATIC_HTTP =
  'https://polygon-mainnet.g.alchemy.com/v2/KE89Fge7plgW2wywX38FmX33lx73MrzY';

// TODO(johnrjj) - FIX 0x Matcha Proxy for RFQM so we can add this at the ingest and not the frontend layer
export const MATCHA_ZERO_EX_API_KEY = 'a7cbec71-2062-4321-9091-b40ccbbb3532';

export const JSON_RPC_URL_ROPSTEN_HTTP =
  'https://eth-ropsten.alchemyapi.io/v2/36Mh0KAHXg5zAAzoAFOvlwmVSXDWDTJY';
export const JSON_RPC_URL_BSC_HTTP = 'https://bsc-dataseed.binance.org'; //`https://bsc-dataseed.binance.org/`;

const ALCHEMY_RPC_KEY_MAINNET = 'G5l6nxjTF3p3YtQ4lRRV8_Hg3PFpAyxD';
const ALCHEMY_RPC_URL_MAINNET_HTTP = `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_RPC_KEY_MAINNET}`;

const ALCHEMY_RPC_KEY_KOVAN = 'sBEdZ8tddp4vmfGPTLkXPkVVg8uIfDbB';
const ALCHEMY_RPC_URL_KOVAN_HTTP = `https://eth-kovan.alchemyapi.io/v2/${ALCHEMY_RPC_KEY_KOVAN}`;

const ZEROEX_API_PRODUCTION_ROOT_URL_MAINNET = 'https://api.matcha.0x.org';
const ZEROEX_API_PRODUCTION_ROOT_URL_KOVAN = 'https://kovan.api.0x.org';
const ZEROEX_API_PRODUCTION_ROOT_URL_BSC = 'https://bsc-api.matcha.0x.org';
const ZEROEX_API_PRODUCTION_ROOT_URL_ROPSTEN = 'https://ropsten.api.0x.org';
const ZEROEX_API_PRODUCTION_ROOT_URL_MATIC =
  ' https://polygon-api.matcha.0x.org';

const ZEROEX_API_PRODUCTION_ROOT_URL_MAINNET_CACHE =
  'https://cached-api.matcha.0x.org';
const ZEROEX_API_PRODUCTION_ROOT_URL_BSC_CACHE =
  'https://bsc-cached-api.matcha.0x.org';
const ZEROEX_API_PRODUCTION_ROOT_URL_MATIC_CACHE =
  'https://polygon-cached-api.matcha.0x.org';

// TODO(kimpers): Update this with HTTPS once SSL cert is fixed for the FAQ page
export const FAQ_SLIPPAGE_EXPLANATION_URL =
  'http://help.matcha.xyz/en/articles/3983355-what-is-price-slippage';

export const FAQ_EXCHANGE_PROXY_ALLOWANCE_TARGET_REAPPROVAL_URL =
  'http://help.matcha.xyz/en/articles/4299650-i-ve-already-approved-a-token-for-trading-why-am-i-being-asked-to-re-approve-it';

export const FAQ_EXCHANGE_PROXY_ALLOWANCE_TARGET_URL =
  'http://help.matcha.xyz/en/articles/4285134-why-do-i-need-to-approve-my-tokens-before-i-can-trade-them';

export const MATCHA_HELP_HOME_URL = 'http://help.matcha.xyz/';
export const MATCHA_HELP_FAQ_URL =
  'http://help.matcha.xyz/en/collections/2207940-faq';
export const MATCHA_HELP_GETTING_STARTED_URL =
  'http://help.matcha.xyz/en/collections/2290272-getting-started';
export const MATCHA_HELP_TOKENS_URL =
  'http://help.matcha.xyz/en/collections/2293766-tokens';
export const MATCHA_HELP_WALLETS_URL =
  'http://help.matcha.xyz/en/collections/2438298-browsers-and-wallets';
// TODO(dave4506) update to playlist for matcha tutorials
export const MATCHA_HELP_YOUTUBE_PLAYLIST =
  'https://www.youtube.com/channel/UCCZ-JZFOI5k81LH5h7SQS5w/videos';
export const TWITTER_URL = 'https://twitter.com/matchaxyz';
export const DISCORD_URL = 'https://link.0x.org/Discord';
export const TELEGRAM_URL = 'https://t.me/matchaxyz';

export const RPC_POLLING_INTERVAL = 8000;

export const BLOXY_API_PROXY_URL = 'https://bloxy.matcha.0x.org';

export const FEE_BUFFER_MULTIPLE = 1.15;

// Something probably has gone horribly wrong if gas goes above 1000 gwei.
export const MAX_GAS_PRICE_GWEI = 1000;
export const GAS_PROVIDER_TO_USE: 'eth_gas_station' | 'upvest' =
  'eth_gas_station';

// normally 'https://ethgasstation.api.0x.org/api/ethgasAPI.json' but not working right now
export const ETH_GAS_STATION_PROXY_URL =
  'https://gas.api.0x.org/source/median?output=eth_gas_station';

export const UPVEST_GAS_ESTIMATE_URL =
  'https://fees.upvest.co/estimate_eth_fees';

export const ZEROEX_API_PRICE_REFRESH_INTERVAL = 15000;

export const WEBSITE_0x_URL = 'https://0x.org';

export const ZEROEX_API_PRODUCTION_FALLBACK_ROOT_URL = 'https://api.0x.org';

export const ZEROEX_API_AFFILIATE_ADDRESS =
  '0x86003b044f70dac0abc80ac8957305b6370893ed';

export const CRYPTO_COMPARE_API_PROXY_ROOT_URL = 'https://cc.matcha.0x.org';

export const EXCHANGE_PROXY_GRAPHQL_URL =
  'https://api.thegraph.com/subgraphs/name/dekz/zeroex_exchangeproxy';

export const ARGENT_GAS_PRICE_API_ENDPOINT =
  'https://cloud.argent-api.com/v1/relay/gasPrice';

export const INTERCOM_APP_ID = 'mbera9g8';
export const MIXPANEL_PROJECT_TOKEN = '770c960611bf5ea7feefb71830f7d795';
export const GOOGLE_ANALYTICS_ID = 'UA-98720122-7';
export const LAUNCH_DARKLY_DEV_CLIENT_SIDE_KEY = '60cd03c19921390ddc9f76b1';
export const LAUNCH_DARKLY_PROD_CLIENT_SIDE_KEY = '60cd03c19921390ddc9f76b2';

export const DEFAULT_SCRIPT_LOAD_DEFER_TIME_IN_MS = 1200;

export const isProductionUrl = (): boolean => {
  const currentRootUrl = window.location.origin;
  const [isProductionUrl] = PRODUCTION_ROOT_URLS.map((url) =>
    currentRootUrl.includes(url),
  ).filter((x) => !!x);
  return isProductionUrl || false;
};

export const DEFER_MODULES_TIMINGS = {
  LIMIT_ORDER_WATCHER: 4000,
  LOG_EVENT_WATCHER: 20000,
};

export const SANITY_PRODUCTION_DATASET = 'production';
export const SANITY_PROJECT_ID = 'aq3x909b';

// MUSD is incorrectly aliased on CryptoCompare, points to some random scamcoin and doesn't have the real mUSD on the site
export const CRYPTOCOMPARE_BLACKLIST = ['MUSD', 'UNI', 'SETH', 'FOAM'];

// JSON-RPC Provider for Binance Chain
// See <https://docs.binance.org/smart-chain/developer/rpc.html>

export const SUPPORTED_CHAIN_IDS = [
  CHAIN_IDS.MAINNET,
  CHAIN_IDS.BSC,
  CHAIN_IDS.ROPSTEN,
  CHAIN_IDS.MATIC,
];

export const SUPPORTED_CHAIN_PRODUCTION = [
  CHAIN_IDS.MAINNET,
  CHAIN_IDS.BSC,
  CHAIN_IDS.MATIC,
];

export const SUPPORTED_CHAIN_TESTNET = [CHAIN_IDS.ROPSTEN];

export const SUPPORTED_CHAINS_DEPTH_CHART = [CHAIN_IDS.MAINNET];

export const SUPPORTED_CHAINS_LIMIT_ORDERS = [CHAIN_IDS.MAINNET];

export const getHttpRpcUrl = (chainId: number): string => {
  switch (chainId) {
    case undefined:
      return getHttpRpcUrl(DEFAULT_CHAIN_ID);
    case CHAIN_IDS.MAINNET:
      return ALCHEMY_RPC_URL_MAINNET_HTTP;
    case CHAIN_IDS.KOVAN:
      return ALCHEMY_RPC_URL_KOVAN_HTTP;
    case CHAIN_IDS.BSC:
      return JSON_RPC_URL_BSC_HTTP;
    case CHAIN_IDS.ROPSTEN:
      return JSON_RPC_URL_ROPSTEN_HTTP;
    case CHAIN_IDS.MATIC:
      return JSON_RPC_URL_MATIC_HTTP;
  }
  throw new Error(`unsupported chainId: ${chainId}`);
};

/**
 * @param chainId
 * @param useCacheIfAvailable When price accuracy doesn't matter and can afford to be lagging, use the cache instead (don't use for getting quotes for swaps, but good for display stuff around the app)
 * @returns 0x API root url fragment (e.g. api.matcha.0x.org)
 */
export const getZeroExApiRootUrl = (
  chainId: number,
  useCacheIfAvailable: boolean = false,
): string => {
  switch (chainId) {
    case CHAIN_IDS.MAINNET:
      if (useCacheIfAvailable) {
        return ZEROEX_API_PRODUCTION_ROOT_URL_MAINNET_CACHE;
      }
      return ZEROEX_API_PRODUCTION_ROOT_URL_MAINNET;
    case CHAIN_IDS.KOVAN:
      return ZEROEX_API_PRODUCTION_ROOT_URL_KOVAN;
    case CHAIN_IDS.BSC:
      if (useCacheIfAvailable) {
        return ZEROEX_API_PRODUCTION_ROOT_URL_BSC_CACHE;
      }
      return ZEROEX_API_PRODUCTION_ROOT_URL_BSC;
    case CHAIN_IDS.ROPSTEN:
      return ZEROEX_API_PRODUCTION_ROOT_URL_ROPSTEN;
    case CHAIN_IDS.MATIC:
      if (useCacheIfAvailable) {
        return ZEROEX_API_PRODUCTION_ROOT_URL_MATIC_CACHE;
      }
      return ZEROEX_API_PRODUCTION_ROOT_URL_MATIC;
  }
  throw new Error(`unsupported chainId: ${chainId}`);
};