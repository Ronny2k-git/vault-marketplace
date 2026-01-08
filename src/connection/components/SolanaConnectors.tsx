import { Button } from "@/components/interface/button";
import { abreviateAddress } from "@/global/utils";
import { useWallet } from "@solana/wallet-adapter-react";

const connectorIcons: Record<string, string> = {
  Phantom: "/icons/phantom.jpeg",
  "Burner Wallet": "/icons/burnerwallet.png",
  MetaMask: "/icons/metamask.png",
};

export function SolanaConnectors() {
  const { wallets, wallet, select, publicKey, disconnect, connected } =
    useWallet();

  const address = publicKey?.toBase58() ?? "";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex max-sm:flex-col gap-2 sm:gap-6 mb-2 justify-between sm:items-center">
        <h1 className="text-md">Solana Connectors</h1>
        <div className="text-sm h-5 flex items-center text-black bg-white rounded-full px-2">
          {!connected ? "Not connected" : `${abreviateAddress(address!)}`}
        </div>
      </div>
      {connected ? (
        <div className="flex justify-between items-center bg-gray-800/50 rounded-2xl p-2">
          <img
            src={connectorIcons[wallet!.adapter.name]}
            alt="user icon"
            className="rounded-full size-8"
          />
          <Button
            className="h-5 rounded-full text-sm text-black px-4"
            onClick={() => disconnect()}
            intent={"primary"}
          >
            disconnect
          </Button>
        </div>
      ) : (
        wallets.map((walletAdapter, index) => {
          const isFirst = index === 0;
          const isLast = index === wallets.length - 1;

          return (
            <Button
              className={`${isFirst ? "!rounded-t-3xl" : ""} ${
                isLast ? "!rounded-b-3xl" : ""
              }`}
              key={walletAdapter.adapter.name}
              size="medium"
              intent="dark"
              onClick={() => select(walletAdapter.adapter.name)}
            >
              <img
                className="h-7 w-7 rounded-full mr-1"
                src={connectorIcons[walletAdapter.adapter.name]}
                alt="wallet icon"
              />
              <span className="text-[15px]">{walletAdapter.adapter.name}</span>
            </Button>
          );
        })
      )}
    </div>
  );
}
