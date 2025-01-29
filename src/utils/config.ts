import { http, createConfig } from "@wagmi/core";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "@wagmi/core/chains";

export const config = createConfig({
  chains: [mainnet, sepolia, base, polygon, optimism, arbitrum],
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
