import { Address, erc20Abi } from "viem";
import { sepolia } from "viem/chains";
import { useAccount, useReadContract } from "wagmi";

export function useGetTokenBalance(tokenAddress: Address) {
  const { address } = useAccount();

  return useReadContract({
    abi: erc20Abi,
    address: tokenAddress, // Token Address
    functionName: "balanceOf",
    chainId: sepolia.id,
    args: [address!], // User Wallet Address
  });
}
