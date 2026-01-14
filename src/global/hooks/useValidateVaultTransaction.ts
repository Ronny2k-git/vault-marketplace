import { useMemo } from "react";
import { parseUnits } from "viem";

export type useValidateVaultTransactionParams = {
  mode: "deposit" | "withdraw";
  amount: string;
  tokenDecimals?: number;
  userTokenBalance?: bigint;
  vaultBalance?: bigint;
  minDeposit?: bigint;
  maxDeposit?: bigint;
};

export function useValidateVaultTransaction({
  mode,
  amount,
  tokenDecimals,
  userTokenBalance,
  vaultBalance,
  minDeposit,
  maxDeposit,
}: useValidateVaultTransactionParams) {
  return useMemo(() => {
    if (!amount) {
      return { isButtonDisabled: true, message: "" };
    }

    const parsedAmount = parseUnits(amount, tokenDecimals ?? 0);
    const balance = vaultBalance ?? 0n;
    const userBalance = userTokenBalance ?? 0n;

    // ---------- COMMON ----------
    if (parsedAmount === 0n) {
      return { isButtonDisabled: true, message: "Please enter a value" };
    }

    // ---------- WITHDRAW ----------
    if (mode === "withdraw") {
      if (balance === 0n) {
        return { isButtonDisabled: true, message: "No amount deposited" };
      }

      if (parsedAmount > balance) {
        return { isButtonDisabled: true, message: "Insufficient balance" };
      }

      return { isButtonDisabled: false, message: "" };
    }

    // ---------- DEPOSIT ----------
    if (mode === "deposit") {
      if (parsedAmount > userBalance) {
        return { isButtonDisabled: true, message: "Insufficient balance" };
      }

      if (minDeposit != undefined && parsedAmount < minDeposit) {
        return {
          isButtonDisabled: true,
          message: "The minimum deposit has not been reached",
        };
      }

      if (
        maxDeposit != undefined &&
        (parsedAmount > maxDeposit || parsedAmount + balance > maxDeposit)
      ) {
        return {
          isButtonDisabled: true,
          message: "The maximum deposit has been exceeded",
        };
      }

      return { isButtonDisabled: false, message: "" };
    }

    return { isButtonDisabled: true, message: "" };
  }, [
    mode,
    amount,
    userTokenBalance,
    vaultBalance,
    tokenDecimals,
    minDeposit,
    maxDeposit,
  ]);
}
