import { FaWallet } from "react-icons/fa";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

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
    <div className="flex">
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && (
        <div className="ml-[1155px] flex justify-center items-center h-10 w-44 bg-accent hover:bg-purple-600 rounded-xl">
          <FaWallet className="mr-1.5 -mt-0.5" />
          {ensName
            ? `${ensName} (${abbreviateAddress(address)})`
            : abbreviateAddress(address)}
        </div>
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
