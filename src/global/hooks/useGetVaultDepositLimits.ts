import { abiVault } from "@/utils/abiVault";
import { Address } from "viem";
import { sepolia } from "viem/chains";
import { useReadContracts } from "wagmi";

export function useGetVaultDepositLimits(vaultAddress?: Address) {
  const { data, isLoading, error } = useReadContracts({
    contracts: vaultAddress
      ? [
          {
            abi: abiVault,
            address: vaultAddress,
            functionName: "minDeposit",
            chainId: sepolia.id,
          },
          {
            abi: abiVault,
            address: vaultAddress,
            functionName: "maxDepositPerWallet",
            chainId: sepolia.id,
          },
        ]
      : [],
  });

  return {
    minDeposit: data?.[0]?.result ?? 0n,
    maxDeposit: data?.[1]?.result ?? 0n,
    isLoading,
    error,
  };
}
