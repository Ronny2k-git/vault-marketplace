import { Button } from "../interface/Button";

export type VaultCardTransactionStatusProps = {
  status: "Coming" | "Finished";
  title?: string;
  description?: string;
};

export function VaultCardTransactionStatus({
  status,
  title,
  description,
}: VaultCardTransactionStatusProps) {
  return (
    <div className="flex flex-col max-lg:p-8 items-center justify-center h-full gap-4 text-center px-4">
      <div
        className={`text-2xl font-semibold ${
          status === "Coming" ? "text-live-accent" : "text-blue-400"
        }`}
      >
        {title}
      </div>

      <p className="text-sm max-w-[15rem] text-gray-300">{description}</p>

      {status === "Finished" && (
        <Button intent={"glow"} size={"large"}>
          Redeem your tokens
        </Button>
      )}
    </div>
  );
}
