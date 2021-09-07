import Decimal from 'decimal.js-light';
import axios from 'axios';
import {
  generateSwapQuoteEndpoint,
} from './0x-api';
import { getZeroExApiRootUrl } from './config';
import {
  getNativeCurrencyForChainId,
  getStablecoinForChainId,
  getWrappedNativeCurrencyForChainId,
} from './multichain';

const toNearestBaseUnitAmount = (
  amount: Decimal,
  decimals: number,
): Decimal => {
  const unit = new Decimal(10).pow(decimals);
  const baseUnitAmount = unit.times(amount);
  const nearestBaseUnitAmount = baseUnitAmount.toDecimalPlaces(0);
  return nearestBaseUnitAmount;
};

const fetchSwapQuote = async (
  rootUrl: string,
  url: string,
): Promise<any> => {
  if (!url) {
    return undefined;
  }
  if (!rootUrl) {
    return undefined;
  }
  let res;
  try {
    res = await axios.get(`${rootUrl}/${url}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (e: any) {
    console.error(e.toJSON());
  }
  return res?.data;
};


const AMOUNT_TO_SELL_OR_BUY_IN_USD = 20.0;
// Here, we basically buy andn sell ETH for USDC in the smallest amount possible to derive the USD price of ETH.
// From there, all of our other assets get priced in terms of ETH (due to ETH/WETH being the main pairing/most liquid for most tokens) and we can always derive the USD price
const fetchNativeTokenPriceInUsd = async (chainId: number) => {
  const stablecoinReference = getStablecoinForChainId(chainId);
  const wrappedNativeCurrency = getWrappedNativeCurrencyForChainId(chainId);

  const dollarAmountInUsdTokenBaseUnitAmount = toNearestBaseUnitAmount(
    new Decimal(AMOUNT_TO_SELL_OR_BUY_IN_USD),
    stablecoinReference.decimals,
  );

  const buyEndpoint = generateSwapQuoteEndpoint({
    sellToken: wrappedNativeCurrency.address,
    buyToken: stablecoinReference.address,
    // Buy one penny worth of ETH to get price
    buyAmount: dollarAmountInUsdTokenBaseUnitAmount,
    skipValidation: true,
    includePriceComparisons: false,
  });

  const sellEndpoint = generateSwapQuoteEndpoint({
    buyToken: wrappedNativeCurrency.address,
    sellToken: stablecoinReference.address,
    // Sell one penny worth of ETH to get price
    sellAmount: dollarAmountInUsdTokenBaseUnitAmount,
    skipValidation: true,
    includePriceComparisons: false,
  });

  const buyQuoteResponse = await fetchSwapQuote(
    getZeroExApiRootUrl(chainId, false),
    buyEndpoint ?? '',
  );
  const sellQuoteResponse = await fetchSwapQuote(
    getZeroExApiRootUrl(chainId, false),
    sellEndpoint ?? '',
  );

  const buyPrice = buyQuoteResponse?.price;
  const sellPrice = sellQuoteResponse?.price;

  const buyPriceDecimal = (new Decimal(buyPrice))?.pow(-1);
  const sellPriceDecimal = (new Decimal(sellPrice))?.pow(-1);
  if (!buyPriceDecimal) {
    return null;
  }
  if (!sellPriceDecimal) {
    return null;
  }
  return buyPriceDecimal?.plus(sellPriceDecimal).div(2);
};

let chainNativeCurrencyPriceLookupByChain: {
  [a: number]: Decimal | undefined | null;
} = {};


// Hold the eth price here so it is accessible within this file without hooks (that way we can reference this in an SWR hook without dealing with refreshing keys)
const useNativeTokenPriceInUsd = async (chainId: number) => {
  const ethPriceSwrResponse: any = await fetchNativeTokenPriceInUsd(chainId);
  chainNativeCurrencyPriceLookupByChain[chainId] = ethPriceSwrResponse;
  return ethPriceSwrResponse;
};

// We curry this w/ the eth price so that we can use _only_ the token address as an SWR key (rather than [tokenAddress, ethPrice]
// (otherwise any time the ethprice changes to something new (that isn't in the cache), hook will go null -> load))
const fetchAssetPriceInUsdc = async (
  tokenContractAddress: string | undefined,
  chainId: number,
) => {
  if (!chainNativeCurrencyPriceLookupByChain[chainId]) {
    return undefined;
  }
  if (!tokenContractAddress) {
    return undefined;
  }
  if (!chainId) {
    return undefined;
  }

  const wrappedNativeCurrency = getWrappedNativeCurrencyForChainId(chainId);
  const nativeCurrency = getNativeCurrencyForChainId(chainId);

  if (tokenContractAddress === wrappedNativeCurrency.address) {
    return chainNativeCurrencyPriceLookupByChain[chainId];
  }
  if (tokenContractAddress === nativeCurrency.address) {
    return chainNativeCurrencyPriceLookupByChain[chainId];
  }

  // 1 dollar worth of ETH (usually like ~0.002ish ETH )
  const dollarOfEthInTermsOfEth = chainNativeCurrencyPriceLookupByChain?.[
    chainId
  ]
    ?.div(100)
    ?.pow(-1)
    .mul(AMOUNT_TO_SELL_OR_BUY_IN_USD);
  if (!dollarOfEthInTermsOfEth) {
    return undefined;
  }
  const buyEthEndpoint = generateSwapQuoteEndpoint({
    sellToken: tokenContractAddress,
    buyToken: wrappedNativeCurrency.address,
    // Buy $1 worth of WETH
    buyAmount: toNearestBaseUnitAmount(
      dollarOfEthInTermsOfEth,
      wrappedNativeCurrency.decimals,
    ),
    excludedSources: ['0x'],
    skipValidation: true,
    includePriceComparisons: false,
  });

  const sellEthEndpoint = generateSwapQuoteEndpoint({
    buyToken: tokenContractAddress,
    sellToken: wrappedNativeCurrency.address,
    // Sell $1 worth of WETH
    sellAmount: toNearestBaseUnitAmount(
      dollarOfEthInTermsOfEth,
      wrappedNativeCurrency.decimals,
    ),
    excludedSources: ['0x'],
    skipValidation: true,
    includePriceComparisons: false,
  });

  const buyEthQuoteResponse = await fetchSwapQuote(
    getZeroExApiRootUrl(chainId, false),
    buyEthEndpoint ?? '',
  );
  const sellEthQuoteResponse = await fetchSwapQuote(
    getZeroExApiRootUrl(chainId, false),
    sellEthEndpoint ?? '',
  );

  const buyPriceDecimal = (new Decimal(buyEthQuoteResponse?.price))?.pow(-1);
  if (!buyPriceDecimal) {
    return null;
  }
  const sellPriceDecimal = (new Decimal(sellEthQuoteResponse?.price))?.pow(-1);
  if (!sellPriceDecimal) {
    return null;
  }

  const priceOfUsdInNativeToken = buyPriceDecimal.plus(sellPriceDecimal).div(2);

  const priceOfNativeToken = chainNativeCurrencyPriceLookupByChain[chainId];
  if (!priceOfNativeToken) {
    return null;
  }
  const priceInUsd = priceOfUsdInNativeToken.mul(priceOfNativeToken);

  return priceInUsd;
};

// Essentialy, grab the ETH price in USD, then query the token in terms of ETH. From there, we can derive the USD price (and we also have the ETH-based price too)
// We do this because X / ETH pools are the most liquid (rather than querying X / USDC directly)
const useAssetPriceInUsdc = async (
  tokenContractAddress: string | undefined,
  chainId: number,
) => {
  await useNativeTokenPriceInUsd(chainId);
  const assetPriceInUsd = await fetchAssetPriceInUsdc(
    tokenContractAddress?.toLowerCase(),
    chainId,
  )
  return assetPriceInUsd;
};

export { useAssetPriceInUsdc };
