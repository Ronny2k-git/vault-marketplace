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
      <h1 className="mb-2 text-md">Ethereum Connectors</h1>
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
          <p className="text-black">{abreviateAddress(address!)}</p>
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
