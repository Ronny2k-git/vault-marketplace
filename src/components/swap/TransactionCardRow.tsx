import { VaultFromDb } from "@/app/api/getTokenAddress/prisma";
import { swap } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import Link from "next/link";
import { formatUnits } from "viem";
import { Card } from "../interface/Card";

interface TransactionCardRowParams extends Omit<swap, "id" | "vaultId"> {
  vault: VaultFromDb;
}

export function TransactionCardRow({
  amount,
  dateTime,
  sender,
  txHash,
  type,
  vault,
}: TransactionCardRowParams) {
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
          className="flex gap-2 px-4 min-w-[32rem] rounded-lg text-white text-sm hover:bg-gray-600"
          intent={"primary"}
          size={"mediumLong"}
          title="Click to be redirected to the transaction on the blockchain"
        >
          <div className="flex-1 text-sm">
            {formatUnits(BigInt(amount), vault.assetTokenDecimals)}
          </div>
          <div className="flex-1 text-sm">{`${sender.slice(0, 6)}...${sender
            .slice(-4)
            .toLocaleLowerCase()}`}</div>
          <div className="flex-1 text-sm">{dateRelative(String(dateTime))}</div>
          <div
            className={`${
              type === "deposit"
                ? "text-live-accent text-sm"
                : "text-red-600 font-semibold text-sm"
            }`}
          >
            {type}
          </div>
        </Card>
      </Link>
    </div>
  );
}
