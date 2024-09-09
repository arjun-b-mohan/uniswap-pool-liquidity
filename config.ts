import { Token } from '@uniswap/sdk-core';

export const WETH_TOKEN = new Token(
  1,
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  18,
  'WETH',
  'Wrapped Ether'
);

export const USDC_TOKEN = new Token(
  1,
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  6,
  'USDC',
  'USD//C'
);

export const CurrentConfig = {
  env: 'mainnet',
  rpc: {
    mainnet: 'https://mainnet.infura.io/v3/bfd636de7c454489aef0c1c57e9b3e9c',  // Replace with your Infura key
  },
  pool: {
    token0: USDC_TOKEN,
    token1: WETH_TOKEN,
    fee: 3000, // 0.3% fee tier
  },
};
