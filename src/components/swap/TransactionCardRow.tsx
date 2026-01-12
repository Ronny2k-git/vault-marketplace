import { vaultAtom } from "@/utils/atom";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { useAtom } from "jotai";
import Link from "next/link";
import { formatUnits, Hex } from "viem";
import { Card } from "../interface/Card";

export type Swap = {
  amount: bigint;
  sender: Hex;
  dateTime: string;
  type: string;
  txHash: Hex;
};

export function TransactionCardRow({
  amount,
  dateTime,
  sender,
  txHash,
  type,
}: Swap) {
  const [vault] = useAtom(vaultAtom);

  const dateRelative = (dateTime: string) => {
    const data = new Date(dateTime);
    return formatDistanceToNow(data, {
      addSuffix: true,
      locale: enUS,
    });
  };

  return (
    <div>
      <Link href={`https://sepolia.etherscan.io/tx/${txHash}`}>
        <Card
          className="flex gap-2 text-white text-xs hover:bg-gray-600"
          intent={"primary"}
          size={"mediumLong"}
          title="Click to be redirected to the transaction on the blockchain"
        >
          <div className="w-20 ml-2 text-xs">
            {formatUnits(amount, vault.assetTokenDecimals)}
          </div>
          <div className="w-28 text-[10.5px]">{`${sender.slice(0, 6)}...${sender
            .slice(-4)
            .toLocaleLowerCase()}`}</div>
          <div className="w-32 text-xs">{dateRelative(dateTime)}</div>
          <div
            className={`${
              type === "deposit"
                ? "text-live-accent text-xs"
                : "text-red-600 font-semibold text-xs"
            }`}
          >
            {type}
          </div>
        </Card>
      </Link>
    </div>
  );
}
