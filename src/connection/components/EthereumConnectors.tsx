"use client";

import { Button } from "@/components/interface/button";
import { abreviateAddress } from "@/global/utils";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function EthereumConnectors() {
  const { connect, connectors } = useConnect();
  const { address, isConnected, connector } = useAccount();
  const { disconnect } = useDisconnect();

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
        <div className="flex justify-between items-center bg-gray-glow rounded-2xl py-2 px-2">
          {connector && (
            <img
              src={connectorIcons[connector.id.toLowerCase()]}
              alt={`${connector.name} icon`}
              className="rounded-full size-8"
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
            <img
              alt="connector icon"
              className="rounded-full size-6"
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
