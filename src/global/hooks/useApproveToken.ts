import { wagmiConfig } from "@/components/Providers";
import { Address, erc20Abi } from "viem";
import { sepolia } from "viem/chains";
import { writeContract } from "wagmi/actions";

type useApproveTokenProps = {
  amount: bigint;
  tokenAddress: Address;
  spenderAddress: Address;
};

export function useApproveToken() {
  const approve = async ({
    amount,
    spenderAddress,
    tokenAddress,
  }: useApproveTokenProps) => {
    try {
      const tx = await writeContract(wagmiConfig, {
        abi: erc20Abi,
        address: tokenAddress,
        functionName: "approve",
        chainId: sepolia.id,
        args: [spenderAddress, amount],
      });

      return tx;
    } catch (error) {
      console.error("Error approving token:", error);
      throw error;
    }
  };

  return { approve };
}
