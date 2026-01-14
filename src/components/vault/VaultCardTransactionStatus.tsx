import { Button } from "../interface/Button";

export type VaultCardTransactionStatusProps = {
  status: "Coming" | "Finished";
  title?: string;
  description?: string;
  handleWithdraw?: () => void;
};

export function VaultCardTransactionStatus({
  status,
  title,
  description,
  handleWithdraw,
}: VaultCardTransactionStatusProps) {
  return (
    <div className="flex flex-col max-lg:px-4 items-center justify-end h-full max-lg:gap-8 text-center px-4">
      <div className="flex flex-col gap-4 h-full w-full items-center justify-center">
        <div
          className={`text-2xl sm:text-3xl font-semibold max-lg:pt-4 ${
            status === "Coming" ? "text-live-accent" : "text-blue-400"
          }`}
        >
          {title}
        </div>

        <p className="text-sm sm:text-base max-w-[15rem]  text-gray-300">
          {description}
        </p>
      </div>

      {status === "Finished" && (
        <Button
          className=" w-full"
          onClick={handleWithdraw}
          intent={"glow"}
          size={"large"}
        >
          Redeem your tokens
        </Button>
      )}
    </div>
  );
}
