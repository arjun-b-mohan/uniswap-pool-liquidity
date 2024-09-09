import { ethers } from 'ethers';
import { Pool } from '@uniswap/v3-sdk';
import { CurrentConfig } from './config';
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';

// Function to calculate price from sqrtPriceX96
function calculatePrice(sqrtPriceX96: bigint): bigint {
    return (sqrtPriceX96 * sqrtPriceX96) / (BigInt(2) ** BigInt(192));
  }  

async function fetchLiquidityAndPrice() {
  const provider = new ethers.providers.JsonRpcProvider(CurrentConfig.rpc.mainnet);
  const poolAddress = Pool.getAddress(CurrentConfig.pool.token0, CurrentConfig.pool.token1, CurrentConfig.pool.fee);

  const poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolABI.abi, provider);

  // Fetch pool liquidity and sqrtPriceX96 from the pool contract
  const [liquidity, slot0] = await Promise.all([
    poolContract.liquidity(),
    poolContract.slot0(),
  ]);

  // Extract sqrtPriceX96
  // const sqrtPriceX96 = BigInt(slot0.sqrtPriceX96.toString());
  class UniswapUtils {
    static unpackSqrtPrice(sqrtPriceX96: string): number {
      // Convert the hex string to a BigInt
      const sqrtPriceBigInt = BigInt(sqrtPriceX96);
  
      // Unpack the sqrtPrice by dividing by 2^96
      const unpackedPrice = Number(sqrtPriceBigInt) / (2 ** 96);
      
      return unpackedPrice;
    }
  }
  
  

  // Calculate the actual price
  const price = calculatePrice(sqrtPriceX96);

  // Display the liquidity and price
  console.log(`Liquidity: ${liquidity.toString()}`);
  console.log(`SQRTPrice (Token1/Token0): ${sqrtPriceX96.toString()}`);
  console.log(`Price (Token1/Token0): ${price.toString()}`);
}

// Execute the function
fetchLiquidityAndPrice().catch(console.error);
