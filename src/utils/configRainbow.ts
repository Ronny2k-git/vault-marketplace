"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "wagmi/chains";

// A configuração do RainbowKit deve ser feita no lado do cliente
export const getClientConfig = () => {
  return getDefaultConfig({
    appName: "My RainbowKit App",
    projectId: "Project ID",
    chains: [mainnet, polygon, sepolia, optimism, arbitrum, base],
    ssr: false,
    transports: {
      [mainnet.id]: http(
        "https://eth-mainnet.g.alchemy.com/v2/tjpt7a_-Hkd4t7MG-0SuM542HkoIGvfg"
      ),
      [sepolia.id]: http(
        "https://eth-sepolia.g.alchemy.com/v2/tjpt7a_-Hkd4t7MG-0SuM542HkoIGvfg"
      ),
      [base.id]: http(
        "https://base-mainnet.g.alchemy.com/v2/tjpt7a_-Hkd4t7MG-0SuM542HkoIGvfg"
      ),
      [polygon.id]: http(
        "https://polygon-mainnet.g.alchemy.com/v2/tjpt7a_-Hkd4t7MG-0SuM542HkoIGvfg"
      ),
      [optimism.id]: http(
        "https://opitimis-mainnet.g.alchemy.com/v2/tjpt7a_-Hkd4t7MG-0SuM542HkoIGvfg"
      ),
      [arbitrum.id]: http(
        "https://arbitrum-mainnet.g.alchemy.com/v2/tjpt7a_-Hkd4t7MG-0SuM542HkoIGvfg"
      ),
    },
  });
};
