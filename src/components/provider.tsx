"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { WagmiProvider } from "wagmi";
import { getClientConfig } from "@/utils/configRainbow";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";

type Props = {
  children: ReactNode;
  initialState: any;
};

export function Providers({ children, initialState }: Props) {
  const [config] = useState(() => getClientConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="wide" theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// export function ConnectWallet() {
//   const { isConnected } = useAccount();
//   if (isConnected) return <Account />;
//   return <WalletOptions />;
// }

// export const YourApp = () => {
//   return <ConnectButton />;
// };
