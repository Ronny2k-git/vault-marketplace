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
    walletconnect: "/icons/walletConnect.png",
    injected: "/icons/injected.webp",
    safe: "/icons/safe.jpeg",
    "app.phantom": "/icons/phantom.jpeg",
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex max-sm:flex-col gap-2 sm:gap-6 mb-2 justify-between sm:items-center">
        <h1 className="text-base">Ethereum Connectors</h1>
        <div className="text-sm flex items-center justify-center text-black bg-white rounded-full px-2">
          {!isConnected ? "Not connected" : `${abreviateAddress(address!)}`}
        </div>
      </div>
      {isConnected ? (
        <div className="flex justify-between items-center bg-gray-800/50 rounded-2xl p-2">
          {connector && (
            <img
              src={connectorIcons[connector.id.toLowerCase()]}
              alt={`${connector.name} icon`}
              className="rounded-full size-8"
            />
          )}
          <Button
            className="h-5 rounded-full text-sm text-black text-semibold px-4"
            onClick={() => disconnect()}
            intent={"primary"}
          >
            disconnect
          </Button>
        </div>
      ) : (
        connectors?.map((connector, index) => {
          const isFirst = index === 0;
          const isLast = index === connectors.length - 1;

          return (
            <Button
              className={`${isFirst ? "!rounded-t-3xl" : ""} ${
                isLast ? "!rounded-b-3xl" : ""
              }`}
              key={connector.name}
              size="medium"
              intent="dark"
              onClick={() => connect({ connector })}
            >
              <img
                alt="connector icon"
                className="h-7 w-7 rounded-full"
                src={
                  connectorIcons[connector.id.toLowerCase()] ??
                  "/icons/default.png"
                }
              />
              <span className="text-[15px]">{connector.name}</span>
            </Button>
          );
        })
      )}
    </div>
  );
}
