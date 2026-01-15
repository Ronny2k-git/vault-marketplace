import { VaultFromDb } from "@/app/api/getTokenAddress/prisma";
import { wagmiConfig } from "@/components/Providers";
import { useApproveToken } from "@/global/hooks";
import { abiVault } from "@/utils";
import { Address, parseUnits } from "viem";
import { sepolia } from "viem/chains";
import { useAccount, useWriteContract } from "wagmi";
import { simulateContract, waitForTransactionReceipt } from "wagmi/actions";

export type useWithdrawProps = {
  message: (message: string) => void;
  amount: string;
  tokenDecimals: number;
  vault: VaultFromDb;
};

export function useWithdraw() {
  const { isConnected } = useAccount();
  const { approve } = useApproveToken();
  const { writeContractAsync } = useWriteContract();

  const withdraw = async ({
    message,
    amount,
    tokenDecimals,
    vault,
  }: useWithdrawProps) => {
    try {
      const configParams = {
        abi: abiVault,
        address: vault.address as Address,
        chainId: sepolia.id,
      };
      const parsedWithdrawAmount = parseUnits(amount, tokenDecimals);

      if (!isConnected) {
        message("Please connect your wallet");
        return;
      }

      // 1. Approving token to be Withdrawed in the vault contract
      message("Approving token...");
      const approveTxHash = await approve({
        amount: parsedWithdrawAmount,
        spenderAddress: vault.address as Address,
        tokenAddress: vault.assetTokenAddress as Address,
      });

      // 2. Waiting for approval
      message("Waiting for approval receipt...");
      await waitForTransactionReceipt(wagmiConfig, {
        hash: approveTxHash,
      });

      // 3. Simulate the transaction to avoid errors
      message("Simulating transaction...");
      const simulateWithdraw = await simulateContract(wagmiConfig, {
        ...configParams,
        functionName: "withdraw",
        args: [parsedWithdrawAmount],
      });

      // 4. Withdraw in the contract
      message("Withdrawing...");
      const withdrawTx = await writeContractAsync(simulateWithdraw.request);

      await waitForTransactionReceipt(wagmiConfig, {
        hash: withdrawTx,
        chainId: sepolia.id,
      });

      setTimeout(() => {
        message("");
      }, 1500);
      return { hash: withdrawTx };
    } catch (error) {
      message("");
      console.error("❌ Error withdrawing:", error);
    }
  };

  return { withdraw };
}
