"use client";

import { Button } from "@/components/interface/button";
import Image from "next/image";
import { useConnect, useAccount, useDisconnect } from "wagmi";

export function EthereumConnectors() {
  const { connect, connectors } = useConnect();
  const { address, isConnected, connector } = useAccount();
  const { disconnect } = useDisconnect();

  const abreviateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 7)}...${address.slice(-5)}`.toLowerCase();
  };

  const connectorIcons: Record<string, string> = {
    metamasksdk: "/icons/metamask.png",
    walletconnect: "/icons/walletconnect.png",
    injected: "/icons/injected.webp",
    safe: "/icons/safe.jpeg",
    "app.phantom": "/icons/phantom.jpeg",
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex max-sm:flex-col gap-2 sm:gap-6 mb-2 justify-between sm:items-center">
        <h1 className="text-md">Ethereum Connectors</h1>
        <div className="text-sm flex items-center text-black bg-white rounded-full px-2">
          {!isConnected ? "Not connected" : `${abreviateAddress(address!)}`}
        </div>
      </div>
      {isConnected ? (
        <div className="flex justify-between bg-gray-glow rounded-2xl py-2 px-2">
          {connector && (
            <Image
              src={connectorIcons[connector.id.toLowerCase()]}
              width={26}
              height={20}
              alt={`${connector.name} icon`}
              className="rounded-full"
            />
          )}
          <button
            className="h-8 w-8 rounded-full text-sm text-black px-2 bg-gray-100"
            onClick={() => disconnect()}
          >
            disconnect
          </button>
        </div>
      ) : (
        connectors.map((connector) => (
          <Button
            className="flex"
            key={connector.id}
            size="medium"
            intent="neutral"
            onClick={() => connect({ connector })}
          >
            <Image
              width={24}
              height={24}
              alt="connector icon"
              className="rounded-full mr-1"
              src={
                connectorIcons[connector.id.toLowerCase()] ??
                "/icons/default.png"
              }
            />
            {connector.name}
          </Button>
        ))
      )}
    </div>
  );
}
