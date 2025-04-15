"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { Config, WagmiProvider } from "wagmi";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css"; /*This fucked me up*/
import { getConfig } from "@/utils/configWagmi";
import SolanaProvider from "./SolanaProvider";

type Props = {
  children: ReactNode;
  initialState: any;
};

export let wagmiConfig: Config;

export function Providers({ children, initialState }: Props) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    wagmiConfig = config;
  }, [config]);

  return (
    <SolanaProvider>
      <WagmiProvider config={config} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider modalSize="wide" theme={darkTheme()}>
            <Theme>{children}</Theme>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </SolanaProvider>
  );
}
