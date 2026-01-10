import { Abi } from "viem";

export type ContractParams = {
  abi: Abi;
  address: `0x${string}`;
  functionName: string;
  args: [
    assetToken: string,
    startDate: number,
    endDate: number,
    minDeposit: bigint,
    maxDeposit: bigint,
    salt: bigint
  ];
};

export type FormValues = {
  network: string;
  vaultName: string;
  vaultLogo: string;
  bannerUrl: string;
  assetToken: `0x${string}`;
  salt: bigint;
  minDeposit: bigint;
  maxDeposit: bigint;
  startDate: Date | null;
  endDate: Date | null;
};
