import { Button } from "@/components/interface/button";
import { abreviateAddress } from "@/global/utils";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export function MoveConnectors() {
  const { account, wallets, connect, disconnect, connected } = useWallet();

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
      {connected ? (
        <div className="flex justify-between items-center bg-gray-glow rounded-2xl py-2 px-2">
          <img
            src={wallets[0].icon}
            alt="user icon"
            className="rounded-full size-8"
          />
          <button
            className="h-8 w-8 rounded-full text-sm text-black px-2 bg-gray-100"
            onClick={() => disconnect()}
          >
            disconnect
          </button>
        </div>
      ) : (
        wallets?.map((connector) => (
          <Button
            className="flex"
            key={connector.name}
            size="medium"
            intent="neutral"
            onClick={() => connect(connector.name)}
          >
            <img
              alt="connector icon"
              className="rounded-full size-6"
              src={connector.icon}
            />
            {connector.name}
          </Button>
        ))
      )}
    </div>
  );
}
