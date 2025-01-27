import {
  base,
  mainnet,
  polygon,
  optimism,
  sepolia,
  arbitrum,
} from "wagmi/chains";
import {
  cookieStorage,
  createConfig,
  CreateConnectorFn,
  createStorage,
  http,
} from "wagmi";

export function getConfig(test: CreateConnectorFn[] = []) {
  return createConfig({
    chains: [mainnet, sepolia, base],
    ssr: true,
    connectors: test,
    storage: createStorage({
      storage: cookieStorage,
    }),
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
}
