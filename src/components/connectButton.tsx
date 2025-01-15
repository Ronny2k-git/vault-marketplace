import * as React from "react";
import { FaWallet } from "react-icons/fa";
// import { IoWallet } from "react-icons/io5";
import { Connector, useConnect } from "wagmi";
import { Button } from "./button";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector })}
      intent="primary"
      size="large"
    />
  ));
}

function WalletOption({
  connector,
  onClick,
  intent,
  size,
}: {
  connector: Connector;
  onClick: () => void;
  intent: "primary" | "secondary";
  size: "small" | "medium" | "mediumLarge" | "large";
}) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <div className="flex items-center ml-auto mr-4">
      <Button intent={intent} size={size} onClick={onClick}>
        {/* {connector.name} */}
        <p>
          <FaWallet />
        </p>
        Connect Wallet
      </Button>
    </div>
  );
}
