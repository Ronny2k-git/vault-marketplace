import { erc20Abi, Hex, parseUnits } from "viem";
import { readContract, simulateContract, writeContract } from "wagmi/actions";
import { wagmiConfig } from "../Providers";
import { abi } from "@/utils/abiContract";
import { ContractParams } from "./vaultCardCreate";

export async function CreateVaultEvm(formValues: any, isConnected: boolean) {
  if (!isConnected) {
    alert("Please connect your wallet");
    return;
  }

  const getTokenDecimals = async (tokenAddress: Hex) => {
    const decimals = await readContract(wagmiConfig, {
      abi: erc20Abi,
      address: tokenAddress,
      functionName: "decimals",
    });
    return decimals;
  };

  async function getContract(address: Hex) {
    const name = await readContract(wagmiConfig, {
      abi: erc20Abi,
      address,
      functionName: "name",
    });
    const symbol = await readContract(wagmiConfig, {
      abi: erc20Abi,
      address,
      functionName: "symbol",
    });
    return { name, symbol };
  }

  const convertTimestamp = (date: Date | null) => {
    if (!date) return 0;
    return Math.floor(date.getTime() / 1000);
  };

  const tokenDecimals = await getTokenDecimals(formValues.assetToken);

  const adjustedMaxDeposit = parseUnits(
    formValues.maxDeposit.toString(),
    tokenDecimals
  );
  const adjustedMinDeposit = parseUnits(
    formValues.minDeposit.toString(),
    tokenDecimals
  );

  const configParams: ContractParams = {
    abi,
    address: "0x3f78066D1E2184f912F7815e30F9C0a02d3a87D3",
    functionName: "createVault",
    args: [
      formValues.assetToken,
      convertTimestamp(formValues.startDate),
      convertTimestamp(formValues.endDate),
      adjustedMinDeposit,
      adjustedMaxDeposit,
      formValues.salt,
    ],
  };

  const simulateVault = await simulateContract(wagmiConfig, configParams);

  if (!simulateVault.result) {
    alert("Simulation failed, Please check your parameters");
    return;
  }

  const vaultCreate = await writeContract(wagmiConfig, configParams);

  console.log("Vault creation result:", vaultCreate);

  const tokenData = await getContract(formValues.assetToken);
  const { name: assetTokenName, symbol: assetTokenSymbol } = tokenData;

  const response = await fetch("/api/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      address: simulateVault.result,
      vaultName: formValues.vaultName,
      vaultLogo: formValues.vaultLogo,
      bannerUrl: formValues.bannerUrl,
      startDate: formValues.startDate,
      endDate: formValues.endDate,
      chainId: 11155111,
      assetTokenDecimals: tokenDecimals,
      assetTokenName,
      assetTokenSymbol,
      assetTokenAddress: formValues.assetToken,
    }),
  });

  const data = await response.json();

  if (data.success) {
    alert("Vault successfully created on EVM!");
  } else {
    alert("Error saving vault data");
  }
}
