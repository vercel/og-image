import {
  USDC_CONTRACT_MAINNET_ADDRESS,
  BUSD_CONTRACT_BSC_ADDRESS,
  NATIVE_CHAIN_TOKEN_FAKE_CONTRACT_ADDRESS,
  WETH_CONTRACT_MAINNET_ADDRESS,
  WBNB_CONTRACT_BSC_ADDRESS,
  CHAIN_IDS,
  USDC_CONTRACT_MATIC_POS_ADDRESS,
  WETH_CONTRACT_ROPSTEN_ADDRESS,
  USDC_CONTRACT_ROPSTEN_ADDRESS,
  WMATIC_CONTRACT_ADDRESS_MATIC,
} from './constants';

export const getStablecoinForChainId = (
  chainId: number,
): { address: string; decimals: number; symbol: string } => {
  if (chainId === CHAIN_IDS.MAINNET) {
    return {
      address: USDC_CONTRACT_MAINNET_ADDRESS,
      decimals: 6,
      symbol: 'USDC',
    };
  }
  if (chainId === CHAIN_IDS.BSC) {
    return {
      address: BUSD_CONTRACT_BSC_ADDRESS,
      decimals: 18,
      symbol: 'BUSD',
    };
  }
  if (chainId === CHAIN_IDS.MATIC) {
    return {
      address: USDC_CONTRACT_MATIC_POS_ADDRESS,
      decimals: 6,
      symbol: 'USDC',
    };
  }
  if (chainId === CHAIN_IDS.ROPSTEN) {
    return {
      address: USDC_CONTRACT_ROPSTEN_ADDRESS,
      decimals: 6,
      symbol: 'USDC',
    };
  }
  throw new Error(
    `Chain id ${chainId} does not have a USD reference token available`,
  );
};

export const getNativeCurrencyForChainId = (
  chainId: number,
): { address: string; decimals: number; symbol: string } => {
  if (chainId === CHAIN_IDS.MAINNET) {
    return {
      address: NATIVE_CHAIN_TOKEN_FAKE_CONTRACT_ADDRESS,
      decimals: 18,
      symbol: 'ETH',
    };
  }
  if (chainId === CHAIN_IDS.ROPSTEN) {
    return {
      address: NATIVE_CHAIN_TOKEN_FAKE_CONTRACT_ADDRESS,
      decimals: 18,
      symbol: 'ETH',
    };
  }
  if (chainId === CHAIN_IDS.BSC) {
    return {
      address: NATIVE_CHAIN_TOKEN_FAKE_CONTRACT_ADDRESS,
      decimals: 18,
      symbol: 'BNB',
    };
  }
  if (chainId === CHAIN_IDS.MATIC) {
    return {
      address: NATIVE_CHAIN_TOKEN_FAKE_CONTRACT_ADDRESS,
      decimals: 18,
      symbol: 'MATIC',
    };
  }
  throw new Error(
    `Chain id ${chainId} does not have a USD reference token available`,
  );
};

export const getWrappedNativeCurrencyForChainId = (
  chainId: number,
): { address: string; decimals: number; symbol: string } => {
  if (chainId === CHAIN_IDS.MAINNET) {
    return {
      address: WETH_CONTRACT_MAINNET_ADDRESS,
      decimals: 18,
      symbol: 'WETH',
    };
  }
  if (chainId === CHAIN_IDS.BSC) {
    return {
      address: WBNB_CONTRACT_BSC_ADDRESS,
      decimals: 18,
      symbol: 'WBNB',
    };
  }
  if (chainId === CHAIN_IDS.MATIC) {
    return {
      // TODO(JOHNRJJ) - NOT SURE, TODO
      address: WMATIC_CONTRACT_ADDRESS_MATIC,
      decimals: 18,
      symbol: 'WMATIC',
    };
  }
  if (chainId === CHAIN_IDS.ROPSTEN) {
    return {
      // TODO(JOHNRJJ) - NOT SURE, TODO
      address: WETH_CONTRACT_ROPSTEN_ADDRESS,
      decimals: 18,
      symbol: 'WETH',
    };
  }
  throw new Error(
    `Chain id ${chainId} does not have a USD reference token available`,
  );
};

export const getChainLabel = (chainId: number) => {
  let label = `Unknown (${chainId})`;
  let color = '#7578b5'
  if (chainId === CHAIN_IDS.MAINNET) {
    label = 'Ethereum';
  }
  if (chainId === CHAIN_IDS.BSC) {
    label = 'BSC';
    color = 'rgb(240, 186, 12)';
  }
  if (chainId === CHAIN_IDS.MATIC) {
    label = 'Polygon';
    color = 'rgb(130, 71, 229)';
  }
  if (chainId === CHAIN_IDS.ROPSTEN) {
    label = 'Testnet';
  }
  return {
    name: label,
    color: color,
  };
};

export const getChainLabelShort = (chainId: number) => {
  let label = `Chain ${chainId})`;
  if (chainId === CHAIN_IDS.MAINNET) {
    label = 'Ethereum';
  }
  if (chainId === CHAIN_IDS.BSC) {
    label = 'BSC';
  }
  if (chainId === CHAIN_IDS.MATIC) {
    label = 'Polygon';
  }
  if (chainId === CHAIN_IDS.ROPSTEN) {
    label = 'Ropsten';
  }
  return label;
};


export const isTokenAddressWrappedNativeAsset = (
  tokenAddress: string | undefined,
  chainId: number | undefined | null,
): boolean | undefined => {
  if (!tokenAddress) {
    return undefined;
  }
  if (!chainId) {
    return undefined;
  }

  // if wrapped weth mainnet
  if (
    chainId === CHAIN_IDS.MAINNET &&
    tokenAddress === WETH_CONTRACT_MAINNET_ADDRESS
  ) {
    return true;
  }
  // if wrapped bnb bsc
  if (chainId === CHAIN_IDS.BSC && tokenAddress === WBNB_CONTRACT_BSC_ADDRESS) {
    return true;
  }
  // if wrapped matic poly
  if (
    chainId === CHAIN_IDS.MATIC &&
    tokenAddress === WMATIC_CONTRACT_ADDRESS_MATIC
  ) {
    return true;
  }
  // if wrapped weth ropsten / kovan
  if (
    chainId === CHAIN_IDS.ROPSTEN &&
    tokenAddress === WETH_CONTRACT_ROPSTEN_ADDRESS
  ) {
    return true;
  }
  // TODO(johnrjj finish this)
  return undefined;
};

export const isTokenAddressEth = (tokenAddress: string | undefined) => {
  if (!tokenAddress) {
    return undefined;
  }
  return (
    tokenAddress.toLowerCase() ===
    NATIVE_CHAIN_TOKEN_FAKE_CONTRACT_ADDRESS.toLowerCase()
  );
};

const isTokenAddressBnb = (tokenAddress: string | undefined) => {
  if (!tokenAddress) {
    return undefined;
  }
  return (
    tokenAddress.toLowerCase() ===
    NATIVE_CHAIN_TOKEN_FAKE_CONTRACT_ADDRESS.toLowerCase()
  );
};

const isTokenAddressMatic = (tokenAddress: string | undefined) => {
  if (!tokenAddress) {
    return undefined;
  }
  return (
    tokenAddress.toLowerCase() ===
    NATIVE_CHAIN_TOKEN_FAKE_CONTRACT_ADDRESS.toLowerCase()
  );
};

export const isTokenAddressNativeAsset = (
  tokenAddress: string | undefined,
  chainId: number | undefined | null,
) => {
  if (!tokenAddress) {
    return undefined;
  }
  if (!chainId) {
    return undefined;
  }

  if (chainId === CHAIN_IDS.BSC) {
    return isTokenAddressBnb(tokenAddress);
  }
  if (chainId === CHAIN_IDS.MATIC) {
    return isTokenAddressMatic(tokenAddress);
  }
  if (
    chainId === CHAIN_IDS.MAINNET ||
    chainId === CHAIN_IDS.KOVAN ||
    chainId === CHAIN_IDS.RINKEBY
  ) {
    return isTokenAddressEth(tokenAddress);
  }
  return undefined;
};

export const isWrapMarketByAssetAddress = (
  baseAssetAddress: string | undefined,
  quoteAssetAddress: string | undefined,
  chainId: number | undefined | null,
): boolean | undefined => {
  if (!chainId) {
    return undefined;
  }
  if (
    isTokenAddressWrappedNativeAsset(baseAssetAddress, chainId) &&
    isTokenAddressNativeAsset(quoteAssetAddress, chainId)
  ) {
    return true;
  }

  if (
    isTokenAddressNativeAsset(baseAssetAddress, chainId) &&
    isTokenAddressWrappedNativeAsset(quoteAssetAddress, chainId)
  ) {
    return true;
  }
  return false;
};

export const getContractAddressOfNativeTokenOnEthereum = (chainId: number) => {
  if (chainId === CHAIN_IDS.BSC) {
    // Not working for some reason
    // return '0xB8c77482e45F1F44dE1745F52C74426C631bDD52'.toLowerCase();
    return undefined;
  } else if (chainId === CHAIN_IDS.MATIC) {
    return '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0'.toLowerCase();
  }
  return undefined;
};

