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
};

export {
  getTokenSwapPrice,
}