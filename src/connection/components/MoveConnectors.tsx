import { Button } from "@/components/interface/Button";
import { abreviateAddress } from "@/global/utils";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export function MoveConnectors() {
  const { account, wallets, connect, disconnect, connected } = useWallet();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between max-sm:flex-col gap-2 mb-2">
        <h1>Move Connectors</h1>
        <div className="flex text-sm h-5 px-2 justify-center text-black bg-white rounded-full">
          {!connected
            ? "Not connected"
            : `${abreviateAddress(account?.address?.toString())}`}
        </div>
      </div>
      {connected ? (
        <div className="flex justify-between items-center bg-gray-800/50 rounded-2xl p-2">
          <img
            src={wallets[0].icon}
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
        wallets?.map((connector, index) => {
          const isFirst = index === 0;
          const isLast = index === wallets.length - 1;

          return (
            <Button
              className={`${isFirst ? "!rounded-t-3xl" : ""} ${
                isLast ? "!rounded-b-3xl" : ""
              }`}
              key={connector.name}
              size="medium"
              intent="dark"
              onClick={() => connect(connector.name)}
            >
              <img
                alt="connector icon"
                className="h-7 w-7 rounded-full"
                src={connector.icon}
              />
              <span className="text-[15px]">{connector.name}</span>
            </Button>
          );
        })
      )}
    </div>
  );
}
