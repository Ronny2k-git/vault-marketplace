import { VaultFromDb } from "@/app/api/getTokenAddress/prisma";
import { getStatus } from "@/global/utils";
import { statusClasses } from "./VaultCardTransaction";

export type VaultCardTransactionStatusProps = {
  status: "Coming" | "Finished";
  title?: string;
  description?: string;
  handleWithdraw?: React.ReactNode;
  vaultBalance: string;
  vault: VaultFromDb;
};

export function VaultCardTransactionStatus({
  status,
  title,
  description,
  handleWithdraw,
  vaultBalance,
  vault,
}: VaultCardTransactionStatusProps) {
  const statusClass = statusClasses[getStatus(vault)] ?? "text-gray-400 ml-1";

  return (
    <div className="flex flex-col max-lg:px-4 items-center justify-end h-full max-lg:gap-8 text-center px-4">
      <div className="flex flex-col gap-4 h-full w-full items-center justify-center">
        <div className={`text-2xl sm:text-3xl max-lg:pt-4 ${statusClass}`}>
          {title}
        </div>

        <p className="text-sm sm:text-base max-w-[15rem]  text-gray-300">
          {description}
        </p>
      </div>

      {/* Withdraw all functionality  */}
      {status === "Finished" && (
        <div className="flex flex-col w-full gap-4">
          <div className="flex items-center justify-center gap-4">
            <span className="text-live-accent text-base font-semibold">
              Deposited:
            </span>

            <p className="px-4 py-1 text-base rounded-full font-semibold text-live-accent shadow-[0_0_30px_rgba(168,85,247,1)]">
              {vaultBalance ?? 0}
            </p>
          </div>

          {handleWithdraw}
        </div>
      )}
    </div>
  );
}
