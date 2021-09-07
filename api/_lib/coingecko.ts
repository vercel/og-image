import { COINGECKO_ASSET_PLATFORMS } from './coingecko-asset-platforms';
import { CHAIN_IDS } from './constants';
import {
  getContractAddressOfNativeTokenOnEthereum,
  getWrappedNativeCurrencyForChainId,
  isTokenAddressNativeAsset,
} from './multichain';

const MATIC_WETH_ADDRESS = '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619';

const EVM_COMATIBLE_PLATFORMS = COINGECKO_ASSET_PLATFORMS.filter(
  (x) => x.chain_identifier,
);

export const getCoingeckoPlatformIdFromChainId = (
  chainId: number,
): string | undefined => {
  const platform = EVM_COMATIBLE_PLATFORMS.find(
    (coingeckoPlatform) => coingeckoPlatform.chain_identifier == chainId,
  );
  if (!platform) {
    return undefined;
  }
  return platform.id;
};
// https://api.coingecko.com/api/v3/asset_platforms

const fetchCoingeckoTokenByContractAddress = async (
  tokenAddress: string,
  chainId: number,
): Promise<CoinGeckoTokenStatsByTokenAddressResponse | null> => {
  const isNativeToken = isTokenAddressNativeAsset(tokenAddress, chainId);

  let coingeckoPlatform = getCoingeckoPlatformIdFromChainId(chainId);
  let contractAddress = isNativeToken
    ? getWrappedNativeCurrencyForChainId(chainId).address
    : tokenAddress;

  // Special case generalized -- if we have a native token, try to use the version on ethereum for coingecko
  if (isNativeToken && chainId !== CHAIN_IDS.MAINNET) {
    const maybeNativeTokenAddressOnEthereum = getContractAddressOfNativeTokenOnEthereum(
      chainId,
    );
    if (maybeNativeTokenAddressOnEthereum) {
      const coingeckoPlatformForMainnetEthereum = getCoingeckoPlatformIdFromChainId(
        CHAIN_IDS.MAINNET,
      );
      coingeckoPlatform = coingeckoPlatformForMainnetEthereum;
      contractAddress = maybeNativeTokenAddressOnEthereum;
    }
  }

  let fetchUri = `https://api.coingecko.com/api/v3/coins/${coingeckoPlatform}/contract/${contractAddress}`;
  // Special case: ETH needs to be queried a certain way for coingecko
  if (isNativeToken && chainId === CHAIN_IDS.MAINNET) {
    fetchUri = `https://api.coingecko.com/api/v3/coins/${coingeckoPlatform}`;
  }
  if (isNativeToken && chainId === CHAIN_IDS.BSC) {
    const bnbCoingeckoId = 'binancecoin';
    fetchUri = `https://api.coingecko.com/api/v3/coins/${bnbCoingeckoId}`;
  }
  if (chainId === CHAIN_IDS.MATIC && tokenAddress === MATIC_WETH_ADDRESS) {
    const coingeckoPlatformForMainnetEthereum = getCoingeckoPlatformIdFromChainId(
      CHAIN_IDS.MAINNET,
    );
    fetchUri = `https://api.coingecko.com/api/v3/coins/${coingeckoPlatformForMainnetEthereum}`;
  }

  try {
    // Monkey-patch native token with wrapped token
    const res = await fetch(fetchUri);
    // Token not found
    if (res.status === 404) {
      // Token not found response body...
      // {
      //  "error": "Could not find coin with the given id"
      // }
      return null;
    }
    const body = await res.json();
    return body;
  } catch (e) {
    throw e;
  }
};

export interface Localization {
  en: string;
  de: string;
  es: string;
  fr: string;
  it: string;
  pl: string;
  ro: string;
  hu: string;
  nl: string;
  pt: string;
  sv: string;
  vi: string;
  tr: string;
  ru: string;
  ja: string;
  zh: string;
  ko: string;
  ar: string;
  th: string;
  id: string;
}

export interface Description {
  en: string;
  de: string;
  es: string;
  fr: string;
  it: string;
  pl: string;
  ro: string;
  hu: string;
  nl: string;
  pt: string;
  sv: string;
  vi: string;
  tr: string;
  ru: string;
  ja: string;
  zh: string;
  ko: string;
  ar: string;
  th: string;
  id: string;
}

export interface ReposUrl {
  github: string[];
  bitbucket: any[];
}

export interface Links {
  homepage: string[];
  blockchain_site: string[];
  official_forum_url: string[];
  chat_url: string[];
  announcement_url: string[];
  twitter_screen_name: string;
  facebook_username: string;
  bitcointalk_thread_identifier?: any;
  telegram_channel_identifier: string;
  subreddit_url?: any;
  repos_url: ReposUrl;
}

export interface Image {
  thumb: string;
  small: string;
  large: string;
}

export interface CurrentPrice {
  usd: number;
  eth: number;
  btc: number;
}

export interface Ath {
  usd: number;
  eth: number;
  btc: number;
}

export interface AthChangePercentage {
  usd: number;
  eth: number;
  btc: number;
}

export interface AthDate {
  usd: Date;
  eth: Date;
  btc: Date;
}

export interface Atl {
  usd: number;
  eth: number;
  btc: number;
}

export interface AtlChangePercentage {
  usd: number;
  eth: number;
  btc: number;
}

export interface AtlDate {
  usd: number;
  eth: number;
  btc: number;
}

export interface MarketCap {
  usd: number;
  eth: number;
  btc: number;
}

export interface FullyDilutedValuation {
  usd: number;
  eth: number;
  btc: number;
}

export interface TotalVolume {
  usd: number;
  eth: number;
  btc: number;
}

export interface High24h {
  usd: number;
  eth: number;
  btc: number;
}

export interface Low24h {
  usd: number;
  eth: number;
  btc: number;
}

export interface PriceChange24hInCurrency {
  usd: number;
  eth: number;
  btc: number;
}

export interface PriceChangePercentage1hInCurrency {
  usd: number;
  eth: number;
  btc: number;
}

export interface PriceChangePercentage24hInCurrency {
  usd: number;
  eth: number;
  btc: number;
}

export interface PriceChangePercentage7dInCurrency {
  usd: number;
  eth: number;
  btc: number;
}

export interface PriceChangePercentage14dInCurrency {
  usd: number;
  eth: number;
  btc: number;
}

export interface PriceChangePercentage30dInCurrency {
  usd: number;
  eth: number;
  btc: number;
}

export interface PriceChangePercentage60dInCurrency {}

export interface PriceChangePercentage200dInCurrency {}

export interface PriceChangePercentage1yInCurrency {}

export interface MarketCapChange24hInCurrency {
  usd: number;
  eth: number;
  btc: number;
}

export interface MarketCapChangePercentage24hInCurrency {
  usd: number;
  eth: number;
  btc: number;
}

export interface MarketData {
  current_price: CurrentPrice;
  roi: {
    currency: 'usd';
    percentage: number;
    times: number;
  };
  ath: Ath;
  ath_change_percentage: AthChangePercentage;
  ath_date: AthDate;
  atl: Atl;
  atl_change_percentage: AtlChangePercentage;
  atl_date: AtlDate;
  market_cap: MarketCap;
  market_cap_rank: number;
  fully_diluted_valuation: FullyDilutedValuation;
  total_volume: TotalVolume;
  high_24h: High24h;
  low_24h: Low24h;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_60d: number;
  price_change_percentage_200d: number;
  price_change_percentage_1y: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  price_change_24h_in_currency: PriceChange24hInCurrency;
  price_change_percentage_1h_in_currency: PriceChangePercentage1hInCurrency;
  price_change_percentage_24h_in_currency: PriceChangePercentage24hInCurrency;
  price_change_percentage_7d_in_currency: PriceChangePercentage7dInCurrency;
  price_change_percentage_14d_in_currency: PriceChangePercentage14dInCurrency;
  price_change_percentage_30d_in_currency: PriceChangePercentage30dInCurrency;
  price_change_percentage_60d_in_currency: PriceChangePercentage60dInCurrency;
  price_change_percentage_200d_in_currency: PriceChangePercentage200dInCurrency;
  price_change_percentage_1y_in_currency: PriceChangePercentage1yInCurrency;
  market_cap_change_24h_in_currency: MarketCapChange24hInCurrency;
  market_cap_change_percentage_24h_in_currency: MarketCapChangePercentage24hInCurrency;
  total_supply: number;
  max_supply: number;
  circulating_supply: number;
  last_updated: Date;
}

export interface CommunityData {
  facebook_likes?: any;
  twitter_followers: number;
  reddit_average_posts_48h: number;
  reddit_average_comments_48h: number;
  reddit_subscribers: number;
  reddit_accounts_active_48h: number;
  telegram_channel_user_count?: any;
}

export interface CodeAdditionsDeletions4Weeks {
  additions?: any;
  deletions?: any;
}

export interface DeveloperData {
  forks: number;
  stars: number;
  subscribers: number;
  total_issues: number;
  closed_issues: number;
  pull_requests_merged: number;
  pull_request_contributors: number;
  code_additions_deletions_4_weeks: CodeAdditionsDeletions4Weeks;
  commit_count_4_weeks: number;
  last_4_weeks_commit_activity_series: any[];
}

export interface PublicInterestStats {
  alexa_rank: number;
  bing_matches?: any;
}

export interface Market {
  name: string;
  identifier: string;
  has_trading_incentive: boolean;
}

export interface ConvertedLast {
  btc: number;
  eth: number;
  usd: number;
}

export interface ConvertedVolume {
  btc: number;
  eth: number;
  usd: number;
}

export interface Ticker {
  base: string;
  target: string;
  market: Market;
  last: number;
  volume: number;
  converted_last: ConvertedLast;
  converted_volume: ConvertedVolume;
  trust_score: string;
  bid_ask_spread_percentage: number;
  timestamp: Date;
  last_traded_at: Date;
  last_fetch_at: Date;
  is_anomaly: boolean;
  is_stale: boolean;
  trade_url: string;
  token_info_url: string;
  coin_id: string;
  target_coin_id: string;
}

export interface CoinGeckoTokenStatsByTokenAddressResponse {
  id: string;
  symbol: string;
  name: string;
  asset_platform_id: string;
  block_time_in_minutes: number;
  hashing_algorithm?: any;
  categories: string[];
  public_notice?: any;
  localization: Localization;
  description: Description;
  links: Links;
  image: Image;
  country_origin: string;
  genesis_date?: any;
  contract_address: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  market_cap_rank: number;
  coingecko_rank: number;
  coingecko_score: number;
  developer_score: number;
  community_score: number;
  liquidity_score: number;
  public_interest_score: number;
  market_data: MarketData;
  community_data: CommunityData;
  developer_data: DeveloperData;
  public_interest_stats: PublicInterestStats;
  status_updates: any[];
  last_updated: Date;
  tickers: Ticker[];
}

export { fetchCoingeckoTokenByContractAddress };
