import { Button } from "@/components/interface/button";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function MoveConnectors() {
  const { connect, connectors, status } = useConnect();
  const { address, isConnected } = useAccount();
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

  console.log();

  return (
    <div className="flex flex-col gap-2.5">
      <h1 className="mb-2 text-md">Move Connectors</h1>
      {isConnected ? (
        <div className="flex justify-between gap-4 mt-4 bg-gray-500 rounded-2xl py-2 px-2">
          <p className="text-white">
            {abreviateAddress(address ? address : "")}
          </p>
          <button
            className="h-8 w-8 max-screen- rounded-full text-sm text-black py-1 px-2 bg-gray-100"
            onClick={() => disconnect()}
          >
            Get out
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
              className="h-6 w-6 rounded-full mr-1"
              src={connectorIcons[connector.id.toLocaleLowerCase()]}
            />
            {connector.name}
            {status === "pending" ? " (connecting)" : ""}
          </Button>
        ))
      )}
    </div>
  );
}
