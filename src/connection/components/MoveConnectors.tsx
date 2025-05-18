import { Button } from "@/components/interface/button";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Image from "next/image";

export function MoveConnectors() {
  const { account, wallets, connect, disconnect, connected, isLoading } =
    useWallet();

  const abreviateAddress = (address?: string) => {
    if (!address) return "";
    return `${address.slice(0, 7)}...${address.slice(-5)}`.toLowerCase();
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex justify-between gap-6 mb-2">
        <h1>Move Connectors</h1>
        <div className="text-sm flex items-center text-black bg-white rounded-full px-2">
          {!connected
            ? "Not connected"
            : `${abreviateAddress(account?.address?.toString())}`}
        </div>
      </div>
      {/* <div className="text-sm flex w-12 items-center text-black bg-white rounded-full px-2">
        {isLoading ? "Loading..." : "Ready"}
      </div> */}
      {connected ? (
        <div className="flex justify-between bg-gray-glow rounded-2xl py-2 px-2">
          <Image
            src="/connectorIcons[wallet!.adapter.name]"
            width={26}
            height={20}
            alt="user icon"
            className="rounded-full"
          />
          <button
            className="h-8 w-8 rounded-full text-sm text-black px-2 bg-gray-100"
            onClick={() => disconnect()}
          >
            disconnect
          </button>
        </div>
      ) : (
        wallets.map((connector) => (
          <Button
            className="flex"
            key={connector.name}
            size="medium"
            intent="neutral"
            onClick={() => connect(connector.name)}
          >
            <Image
              width={24}
              height={24}
              alt="connector icon"
              className="rounded-full mr-1"
              src="/usdc.png"
            />
            {connector.name}
          </Button>
        ))
      )}
    </div>
  );
}
