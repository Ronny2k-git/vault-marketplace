import * as React from "react";
import { FaWallet } from "react-icons/fa";
// import { IoWallet } from "react-icons/io5";
import { Connector, useConnect } from "wagmi";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector })}
    />
  ));
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <div className="flex items-center ml-auto">
      <button
        className="text-white h-10 w-44 flex justify-center items-center rounded-xl bg-button-bg-primary
         hover:bg-gray-600"
        disabled={!ready}
        onClick={onClick}
      >
        {/* {connector.name} */}
        <p className="pr-1.5">
          <FaWallet />
        </p>
        Connect Wallet
      </button>
    </div>
  );
}
