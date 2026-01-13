import { abiVault } from "@/utils";
import { Address } from "viem";
import { sepolia } from "viem/chains";
import { useAccount, useReadContract } from "wagmi";

export function useGetVaultBalance(vaultAddress: Address) {
  const { address } = useAccount();

  return useReadContract({
    abi: abiVault,
    address: vaultAddress, // Vault Address
    functionName: "deposited",
    chainId: sepolia.id,
    args: [address!], // User Wallet Address
  });
}
