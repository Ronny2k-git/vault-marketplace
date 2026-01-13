import { Address, erc20Abi } from "viem";
import { sepolia } from "viem/chains";
import { useReadContract } from "wagmi";

export function useGetTokenDecimals(tokenAddress: Address) {
  return useReadContract({
    abi: erc20Abi,
    address: tokenAddress, // Token Address
    functionName: "decimals",
    chainId: sepolia.id,
    args: [],
  });
}
