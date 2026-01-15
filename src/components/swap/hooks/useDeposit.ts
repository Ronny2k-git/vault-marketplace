import { VaultFromDb } from "@/app/api/getTokenAddress/prisma";
import { wagmiConfig } from "@/components/Providers";
import { useApproveToken } from "@/global/hooks";
import { abiVault } from "@/utils";
import { Address, parseUnits } from "viem";
import { sepolia } from "viem/chains";
import { useAccount, useWriteContract } from "wagmi";
import { simulateContract, waitForTransactionReceipt } from "wagmi/actions";

export type useDepositProps = {
  message: (message: string) => void;
  amount: string;
  tokenDecimals: number;
  vault: VaultFromDb;
};

export function useDeposit() {
  const { isConnected } = useAccount();
  const { approve } = useApproveToken();
  const { writeContractAsync } = useWriteContract();

  const deposit = async ({
    message,
    amount,
    tokenDecimals,
    vault,
  }: useDepositProps) => {
    try {
      const configParams = {
        abi: abiVault,
        address: vault.address as Address,
        chainId: sepolia.id,
      };
      const parsedDepositAmount = parseUnits(amount, tokenDecimals);

      if (!isConnected) {
        message("Please connect your wallet");
        return;
      }

      // 1. Approving token to be deposited in the vault contract
      message("Approving token...");
      const approveTxHash = await approve({
        amount: parsedDepositAmount,
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
      const simulateDeposit = await simulateContract(wagmiConfig, {
        ...configParams,
        functionName: "deposit",
        args: [parsedDepositAmount],
      });

      // 4. Deposit in the contract
      message("Depositing...");
      const depositTx = await writeContractAsync(simulateDeposit.request);

      await waitForTransactionReceipt(wagmiConfig, {
        hash: depositTx,
        chainId: sepolia.id,
      });

      setTimeout(() => {
        message("");
      }, 1500);
      return { hash: depositTx };
    } catch (error) {
      message("");
      console.error("❌ Error Depositing:", error);
    }
  };

  return { deposit };
}
