"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import {
  Connector,
  CreateConnectorFn,
  injected,
  State,
  useAccount,
  WagmiProvider,
} from "wagmi";
import { metaMask, safe, walletConnect } from "wagmi/connectors";
import { getConfig } from "../utils/configuracao";
import { WalletOptions } from "./connectButton";
import { Account } from "./account";

type Props = {
  children: ReactNode;
  initialState: State | undefined;
  connectors?: Connector<CreateConnectorFn>[];
};

export function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

// const connectors = [
//   injected(),
//   // walletConnect({ projectId: "My-project-id" }),
//   // metaMask(),
//   // safe(),
// ];

export function Providers({ children, initialState }: Props) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
