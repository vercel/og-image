import Decimal from 'decimal.js-light'
import { useAssetPriceInUsdc } from './usePricing'
import { formatTokenAutomatic } from './format-number'
import { 
  getStablecoinForChainId, 
  isWrapMarketByAssetAddress,
} from './multichain'

const getTokenSwapPrice = async (chainId: number, baseTokenAddr: string, quoteTokenAddr?: string) => {
  const baseAssetPriceInUsdResponse: any = await useAssetPriceInUsdc(
    baseTokenAddr,
    chainId,
  );

  const stablecoinForChainId = chainId
    ? getStablecoinForChainId(chainId)
    : undefined;

  const quoteAssetPriceInUsdResponse: any = await useAssetPriceInUsdc(
    quoteTokenAddr ?? stablecoinForChainId?.address, // Fallback to USDC if no quote token is provided
    chainId,
  );

  if (
    isWrapMarketByAssetAddress(
      baseTokenAddr,
      quoteTokenAddr,
      chainId,
    )
  ) {
    return {
      data: new Decimal(1),
    };
  }

  let price: Decimal | undefined = undefined;
  // NOTE(johnrjj) - Add this back to the master branch i think this is a bug
  // If we're only given the base asset (no quote asset) just return the base asset price
  if (baseAssetPriceInUsdResponse && !quoteTokenAddr) {
    price = baseAssetPriceInUsdResponse;
  } else if (
    baseAssetPriceInUsdResponse &&
    quoteAssetPriceInUsdResponse
  ) {
    price = baseAssetPriceInUsdResponse.div(
      quoteAssetPriceInUsdResponse,
    );
  }

  if (price) {
    const formatTokenObj = formatTokenAutomatic(price!, {});
  
    return {
      data: formatTokenObj.formatted,
    };
  }

  return {
    data: price
  }
  
  // let reqUrl = `${CHAIN_ID_URLS[chainId]}/swap/v1/price?buyToken=${buyToken}&sellAmount=${sellAmount}`;
  // if (sellToken) {
  //   reqUrl = `${reqUrl}&sellToken=${sellToken}`;
  // };
  // return await fetch(reqUrl).then(x => x.json());
};

// const getTokenPriceInUsd = async (chainId: number, buyToken: string, sellAmount: number, sellToken?: string) => {
//   let buyUrl = `${CHAIN_ID_URLS[chainId]}/swap/v1/price?buyToken=${buyToken}&sellAmount=${sellAmount}`;
//   let sellUrl = `${CHAIN_ID_URLS[chainId]}/swap/v1/price?buyToken=${buyToken}&sellAmount=${sellAmount}`;
//   return await fetch(buyUrl).then(x => x.json());
// };

export {
  getTokenSwapPrice,
}