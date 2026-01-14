import { FormValues } from "@/global/types";
import { atom } from "jotai";

//Creation Page
export const createVaultAtom = atom<Partial<FormValues>>({
  network: "",
  vaultName: "",
  vaultLogo: "",
  bannerUrl: "",
  assetToken: "" as `0x${string}`,
  salt: BigInt(0),
  minDeposit: BigInt(0),
  maxDeposit: BigInt(0),
  startDate: null,
  endDate: null,
});
