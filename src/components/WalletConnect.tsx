import { ECOSYSTEM } from "@/global/constants";
import { Card } from "./interface/card";
import * as Tabs from "@radix-ui/react-tabs";
import { Button } from "./interface/button";
import { EthereumConnectors } from "@/connection/components/EthereumConnectors";
import { SolanaConnectors } from "@/connection/components/SolanaConnectors";
import { MoveConnectors } from "@/connection/components/MoveConnectors";

export default function WalletConnect() {
  return (
    <div>
      <Card className="flex flex-col gap-4" size="high" intent="primary">
        <div className="flex justify-between">
          <h1>Ecosystem</h1>
          <button className="bg-gray-glow text-xs rounded-full h-4 w-4 flex items-center justify-center text-black font-semibold hover:bg-gray-200">
            x
          </button>
        </div>
        <Tabs.Root>
          <Tabs.List className="flex gap-4">
            {ECOSYSTEM.map((ecosystem, index) => (
              <Tabs.Trigger key={index} value={ecosystem}>
                <Button key={index} size="medium" intent="primary">
                  {ecosystem}
                </Button>
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <div className="flex items-center gap-4 py-4">
            <div className="w-1/2 h-px bg-gray-100"></div>
            Wallets
            <div className="w-1/2 h-px  bg-gray-100"></div>
          </div>
          <Tabs.Content value="ethereum">
            <EthereumConnectors />
          </Tabs.Content>
          <Tabs.Content value="solana">
            <SolanaConnectors />
          </Tabs.Content>
          <Tabs.Content value="move">
            <MoveConnectors />
          </Tabs.Content>
        </Tabs.Root>
      </Card>
    </div>
  );
}
