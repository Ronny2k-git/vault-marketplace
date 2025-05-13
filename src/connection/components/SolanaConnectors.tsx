import { Button } from "@/components/interface/button";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";

const connectorIcons: Record<string, string> = {
  Phantom: "/icons/phantom.jpeg",
  "Burner Wallet": "/icons/burnerwallet.png",
};

export function SolanaConnectors() {
  const {
    wallets,
    wallet,
    select,
    publicKey,
    disconnect,
    connected,
    connecting,
  } = useWallet();

  const abreviateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 7)}...${address.slice(-5)}`.toLowerCase();
  };

  const address = publicKey?.toBase58() ?? "";

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex max-sm:flex-col gap-2 sm:gap-6 mb-2 justify-between sm:items-center">
        <h1 className="text-md">Solana Connectors</h1>
        <div className="text-sm flex items-center text-black bg-white rounded-full px-2">
          {!connected ? "Not connected" : `${abreviateAddress(address!)}`}
        </div>
      </div>
      {connected ? (
        <div className="flex justify-between bg-gray-glow rounded-2xl py-2 px-2">
          <Image
            src={connectorIcons[wallet!.adapter.name]}
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
        wallets.map((walletAdapter) => (
          <Button
            className="flex"
            key={walletAdapter.adapter.name}
            size="medium"
            intent="neutral"
            onClick={() => select(walletAdapter.adapter.name)}
          >
            <Image
              width={24}
              height={24}
              className="rounded-full mr-1"
              src={connectorIcons[walletAdapter.adapter.name]}
              alt="wallet icon"
            />
            {walletAdapter.adapter.name}
            {connecting && wallet?.adapter.name === walletAdapter.adapter.name
              ? `${connecting}`
              : ""}
          </Button>
        ))
      )}
    </div>
  );
}
