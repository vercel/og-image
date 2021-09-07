// import fetch from 'node-fetch'
import { stringify } from 'query-string';
import { ZEROEX_API_AFFILIATE_ADDRESS } from './config';

export const generateSraGetOrdersEndpoint = (options: any) => {
  const endpoint = `sra/v3/orders?${stringify({ perPage: 100, ...options })}`;
  return endpoint;
};

const SWAP_API_VERSION = 1;

export const generateSwapQuoteEndpoint = (
  options: any,
  mode='rfqt-enabled-price-only',
): string | undefined => {
  // NOTE(johnrjj) - Not sure if we should do this validation here?
  if (!options.sellToken) {
    return undefined;
  }
  if (!options.buyToken) {
    return undefined;
  }
  if (options.buyToken === options.sellToken) {
    console.warn(
      `buyToken ${options.buyToken} cannot equal sellToken  ${options.sellToken}`,
    );
    return undefined;
  }
  if (!options.buyAmount && !options.sellAmount) {
    return undefined;
  }
  if (options?.buyAmount?.equals(0) || options.sellAmount?.equals(0)) {
    return undefined;
  }
  if (mode === 'rfqt-enabled-firm-quote' && !options.takerAddress) {
    console.error('Taker address required for firm quotes');
    return undefined;
  }

  let allSwapQueryParams = {
    ...options,
    affiliateAddress: ZEROEX_API_AFFILIATE_ADDRESS,
  };
  // Add intentOnFilling to make firm quote with possible Market Makers
  if (mode === 'rfqt-enabled-firm-quote') {
    allSwapQueryParams.intentOnFilling = 'true';
  }

  // Derive the endpoint
  if (mode === 'rfqt-enabled-price-only') {
    return `swap/v${SWAP_API_VERSION}/price?${stringify(allSwapQueryParams, {
      arrayFormat: 'comma',
    })}`;
  } else {
    return `swap/v${SWAP_API_VERSION}/quote?${stringify(allSwapQueryParams, {
      arrayFormat: 'comma',
    })}`;
  }
};

// export const fetchSwapQuote = async (
//   rootUrl: string,
//   url: string,
// ): Promise<any> => {
//   if (!url) {
//     return undefined;
//   }
//   if (!rootUrl) {
//     return undefined;
//   }

//   const res = await fetch(`${rootUrl}/${url}`, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   const json = await res.json();
//   return json;
// };
