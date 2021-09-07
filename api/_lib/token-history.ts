import Decimal from 'decimal.js-light';
import axios from 'axios';
import range from 'lodash/range';
import keyBy from 'lodash/keyBy';
import uniqBy from 'lodash/uniqBy';
import getUnixTime from 'date-fns/getUnixTime';
import startOfSecond from 'date-fns/startOfSecond';
import sub from 'date-fns/sub';
import { getCoingeckoPlatformIdFromChainId } from './coingecko';
import {
  getWrappedNativeCurrencyForChainId,
  isTokenAddressNativeAsset,
  isWrapMarketByAssetAddress,
} from './multichain';
import { CHAIN_IDS } from './constants';

const MATIC_WETH_ADDRESS = '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619';

export enum MATCHA_TRADING_HISTORY_WINDOWS {
  TWENTY_FOUR_HOURS = 'TWENTY_FOUR_HOURS',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
}

const AGGREGATE_24HOURS = 15; // when getting the 24hour chart, group the minutes by 15 minute groups
const AGGREGATE_MONTH = 4; // when getting month chart, group the hours by chunks of 4

const AmountOfResultsToRequest: {
  [key in MATCHA_TRADING_HISTORY_WINDOWS]: number;
} = {
  [MATCHA_TRADING_HISTORY_WINDOWS.TWENTY_FOUR_HOURS]: new Decimal(
    (24 * 60) / AGGREGATE_24HOURS,
  )
    .toInteger()
    .toNumber(), // Every minute for 24 hours (24 * 60) / 30 minute aggregated intervals
  [MATCHA_TRADING_HISTORY_WINDOWS.WEEK]: new Decimal(24 * 7)
    .toInteger()
    .toNumber(), // 24 hours * 7 days = 168 (data point every hour for 7 days)
  [MATCHA_TRADING_HISTORY_WINDOWS.MONTH]: new Decimal(
    (30 * 24) / AGGREGATE_MONTH,
  )
    .toInteger()
    .toNumber(), // only need to request 30 because we switch to daily candles
};

export interface CryptoCompareCandle {
  time: number;
  close: number;
}

export interface CryptoCompareResponse {
  Response: string;
  Message: string;
  HasWarning: boolean;
  Type: number;
  RateLimit: {};
  Data: {
    Aggregated: boolean;
    TimeFrom: number;
    TimeTo: number;
    Data: Array<CryptoCompareCandle>;
  };
}

// HACK: until ETH/WETH is supporting more elegantly in Matcha (via atomic behavior), create "fake" market data to reflect price is 1:1
const generateHistoryForWrappingPair = (
  increment: MATCHA_TRADING_HISTORY_WINDOWS,
): CryptoCompareCandle[] => {
  const resultsAmount = AmountOfResultsToRequest[increment];
  const currentTime = getUnixTime(new Date()); // get unix time
  let incrementInSeconds: number;
  if (increment === MATCHA_TRADING_HISTORY_WINDOWS.TWENTY_FOUR_HOURS) {
    incrementInSeconds = AGGREGATE_24HOURS * 60;
  }
  if (increment === MATCHA_TRADING_HISTORY_WINDOWS.WEEK) {
    incrementInSeconds = 60 * 60;
  }
  if (increment === MATCHA_TRADING_HISTORY_WINDOWS.MONTH) {
    incrementInSeconds = 4 * 60 * 60;
  }
  return range(resultsAmount).map((index: number) => {
    return {
      time: currentTime - (resultsAmount - index) * incrementInSeconds,
      high: 1,
      low: 1,
      volumeFrom: 1,
      volumeTo: 1,
      close: 1,
      open: 1,
    };
  });
};

export type TimestampKeyValueTuple = [number, number];

export interface CoinGeckoChartData {
  prices: Array<TimestampKeyValueTuple>;
  market_caps: Array<TimestampKeyValueTuple>;
  total_volumes: Array<TimestampKeyValueTuple>;
}

const fetchHistoryForTokenPairFromCoinGecko = async (
  increment: MATCHA_TRADING_HISTORY_WINDOWS,
  baseAssetTokenAddress: string | undefined,
  quoteAssetTokenAddress: string | undefined,
  chainId: number | undefined,
) => {
  if (!baseAssetTokenAddress) {
    return undefined;
  }
  if (!quoteAssetTokenAddress) {
    return undefined;
  }
  if (!chainId) {
    return undefined;
  }

  const now = new Date();

  // figure out how much time we need to subtract
  let duration: Duration = {};
  switch (increment) {
    case MATCHA_TRADING_HISTORY_WINDOWS.TWENTY_FOUR_HOURS: {
      duration.days = 1;
      break;
    }
    case MATCHA_TRADING_HISTORY_WINDOWS.WEEK: {
      duration.weeks = 1;
      break;
    }
    case MATCHA_TRADING_HISTORY_WINDOWS.MONTH: {
      duration.months = 1;
      break;
    }
    default: {
      duration.days = 1;
      break;
    }
  }

  const desiredStartUnixTime = getUnixTime(sub(now, duration));
  const desiredEndUnixTime = getUnixTime(now);

  const platformId = getCoingeckoPlatformIdFromChainId(chainId);

  let baseTokenPlatformId = platformId;
  let quoteTokenPlatformId = platformId;
  // Monkeypatch ETH -> WETH
  let baseTokenAddressForCoinGecko = isTokenAddressNativeAsset(
    baseAssetTokenAddress,
    chainId,
  )
    ? getWrappedNativeCurrencyForChainId(chainId).address
    : baseAssetTokenAddress;

  let quoteTokenAddressForCoinGecko = isTokenAddressNativeAsset(
    quoteAssetTokenAddress,
    chainId,
  )
    ? getWrappedNativeCurrencyForChainId(chainId).address
    : quoteAssetTokenAddress;

  // HACK(johnrjj) - Hardcode ETH on polygon to look up chart for ETH on ethereum
  if (
    chainId === CHAIN_IDS.MATIC &&
    baseAssetTokenAddress === MATIC_WETH_ADDRESS
  ) {
    baseTokenPlatformId = getCoingeckoPlatformIdFromChainId(CHAIN_IDS.MAINNET);
    baseTokenAddressForCoinGecko = getWrappedNativeCurrencyForChainId(
      CHAIN_IDS.MAINNET,
    ).address;
  }
  // HACK(johnrjj) - Hardcode ETH on polygon to look up chart for ETH on ethereum

  if (
    chainId === CHAIN_IDS.MATIC &&
    quoteAssetTokenAddress === MATIC_WETH_ADDRESS
  ) {
    quoteTokenPlatformId = getCoingeckoPlatformIdFromChainId(CHAIN_IDS.MAINNET);
    quoteTokenAddressForCoinGecko = getWrappedNativeCurrencyForChainId(
      CHAIN_IDS.MAINNET,
    ).address;
  }
  // https://www.coingecko.com/api/documentations/v3#/contract/get_coins__id__contract__contract_address__market_chart_range
  const baseChartDataInUsdPayloadPromise = axios.get(
    `https://api.coingecko.com/api/v3/coins/${baseTokenPlatformId}/contract/${baseTokenAddressForCoinGecko}/market_chart/range?vs_currency=usd&from=${desiredStartUnixTime}&to=${desiredEndUnixTime}`,
  );
  const quoteChartDataInUsdPayloadPromise = axios.get(
    `https://api.coingecko.com/api/v3/coins/${quoteTokenPlatformId}/contract/${quoteTokenAddressForCoinGecko}/market_chart/range?vs_currency=usd&from=${desiredStartUnixTime}&to=${desiredEndUnixTime}`,
  );

  const baseChartDataInUsdPayload = await baseChartDataInUsdPayloadPromise;
  const quoteChartDataInUsdPayload = await quoteChartDataInUsdPayloadPromise;

  const baseChartDataInUsd: CoinGeckoChartData = baseChartDataInUsdPayload.data;
  const quoteChartDataInUsd: CoinGeckoChartData = quoteChartDataInUsdPayload.data;

  const basePriceChartDataInUsd = baseChartDataInUsd.prices.map((tuple) => {
    // here we format the unix timestamp to be to the closest second, so that baseChartDataInUsd unix timestamps and quoteChartDataInUsd unix timestamps line up
    // (they can be off from each other just by a little bit, even if you request the same ranges)
    tuple[0] = startOfSecond(getUnixTime(tuple[0])).getTime();
    return tuple;
  });

  const quotePriceChartDataInUsd = quoteChartDataInUsd.prices.map((tuple) => {
    tuple[0] = startOfSecond(getUnixTime(tuple[0])).getTime();
    return tuple;
  });
  const quotePriceChartDataInUsdMap = keyBy(
    quotePriceChartDataInUsd,
    (timestampTuple) => timestampTuple[0],
  );

  let derivedPriceArray: Array<TimestampKeyValueTuple> = [];
  basePriceChartDataInUsd.forEach((basePriceChartTuple) => {
    const [baseTimestamp, basePriceAtTimestamp] = basePriceChartTuple;
    const maybeQuoteTuple:
      | TimestampKeyValueTuple
      | [undefined, undefined] = quotePriceChartDataInUsdMap[baseTimestamp] ?? [
      undefined,
      undefined,
    ];
    const [maybeQuoteTimestamp, maybeQuotePriceAtTimestamp] = maybeQuoteTuple;

    // if timestamps missing dont add
    if (!baseTimestamp || !maybeQuoteTimestamp) {
      return;
    }
    // if price values missing dont add
    if (!basePriceAtTimestamp || !maybeQuotePriceAtTimestamp) {
      return;
    }

    const basePriceDecimal = new Decimal(basePriceAtTimestamp);
    // make sure we don't divide by zero later, if we have a price of zero (assuming zero is a legit price and response isn't bugged), let's just make it very small
    const quotePriceDecimal = new Decimal(
      maybeQuotePriceAtTimestamp === 0 ? 0.0000001 : maybeQuotePriceAtTimestamp,
    );

    // (x/z) / (y/z) = x/y, where z = usd
    // e.g. (zrx/usd) / (eth/usd) = zrx/eth
    const derivedPrice = basePriceDecimal.div(quotePriceDecimal).toNumber();
    const timestampToUse = baseTimestamp;
    const derivedTupleWithPriceInQuoteAsset: TimestampKeyValueTuple = [
      timestampToUse,
      derivedPrice,
    ];
    derivedPriceArray.push(derivedTupleWithPriceInQuoteAsset);
  });

  // Last, filter out any repeated timestamps (this can happen when we're flattening out the unix timestamps to the nearest second)
  return uniqBy(derivedPriceArray, (tuple) => tuple[0]);
};

// Three sample requests
// [24 hours] https://min-api.cryptocompare.com/data/v2/histohour?fsym=ETH&tsym=USD&limit=24
// [Week] https://min-api.cryptocompare.com/data/v2/histohour?fsym=ETH&tsym=USD&limit=720
// [Monthly] https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USD&limit=30

const fetchHistoryForTokenPair = async (
  increment: MATCHA_TRADING_HISTORY_WINDOWS,
  chainId: number,
  baseAssetTokenAddress: string | undefined,
  quoteAssetTokenAddress: string | undefined,
): Promise<Array<CryptoCompareCandle> | undefined> => {
  if (!baseAssetTokenAddress) {
    return undefined;
  }
  if (!quoteAssetTokenAddress) {
    return undefined;
  }

  // hack to provide histo for ETH/WETH
  if (
    isWrapMarketByAssetAddress(
      baseAssetTokenAddress,
      quoteAssetTokenAddress,
      chainId,
    )
  ) {
    return generateHistoryForWrappingPair(increment);
  }

  const coingeckoResponse = await fetchHistoryForTokenPairFromCoinGecko(
    increment,
    baseAssetTokenAddress,
    quoteAssetTokenAddress,
    chainId,
  );

  const coingeckoFormattedResponse: Array<CryptoCompareCandle> =
    coingeckoResponse?.map((x) => {
      return {
        // x[0] is unix timestamp
        time: x[0],
        // x[1] is price as number type
        close: x[1],
      };
    }) ?? [];

  return coingeckoFormattedResponse;
};

export { fetchHistoryForTokenPair };
