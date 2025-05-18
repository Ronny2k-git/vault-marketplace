"use client";

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { ReactNode, useMemo } from "react";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";

type Props = {
  children: ReactNode;
};

export default function MoveProvider({ children }: Props) {
  const wallets = useMemo(() => [new PetraWallet(), new MartianWallet()], []);

  return (
    <AptosWalletAdapterProvider autoConnect={true}>
      {children}
    </AptosWalletAdapterProvider>
  );
}
