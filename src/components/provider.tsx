"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { Config, WagmiProvider } from "wagmi";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css"; /*This fucked me up*/
import { getConfig } from "@/utils/configWagmi";

type Props = {
  children: ReactNode;
  initialState: any;
};

export let wagmiConfig: Config;

// const { connectors } = getDefaultWallets({
//   appName: "My RainbowKit App",
//   projectId: "My app",
// });

export function Providers({ children, initialState }: Props) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    wagmiConfig = config;
  }, [config]);

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="wide" theme={darkTheme()}>
          <Theme>{children}</Theme>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
