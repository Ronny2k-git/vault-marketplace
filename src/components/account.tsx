import { FaWallet } from "react-icons/fa";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { Button } from "./button";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const abbreviateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 7)}...${address.slice(-5)}`;
  };

  return (
    <div className="flex ml-auto mr-4">
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && (
        <Button intent={"secondary"} size={"large"}>
          <FaWallet />
          {ensName
            ? `${ensName} (${abbreviateAddress(address)})`
            : abbreviateAddress(address)}
        </Button>
      )}
      <button
        className="absolute size-6 right-0 rounded-full mt-10 bg-purple-600"
        onClick={() => disconnect()}
      >
        x
      </button>
    </div>
  );
}
