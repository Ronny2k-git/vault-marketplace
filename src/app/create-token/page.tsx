import { CreateErc20Token } from "@/components/createErc20Token";

export default function MarketCapPage() {
  return (
    <div className="min-h-screen min-w-screen flex justify-center bg-background px-12">
      <div className="h-full w-full max-w-screen-2xl flex flex-col">
        <h1 className="text-white mt-10 text-3xl">ERC-20 Token Creator</h1>
        <div className="line h-1 bg-blue-500 mb-5 mt-6" />
        <h2 className="max-w-lg text-text-foreground mb-10">
          Create your own ERC-20 token easily with our user-friendly interface.
          Customize your token name, symbol, total supply, and decimals. Deploy
          to the Ethereum blockchain in just a few clicks. No coding required —
          we handle the smart contract generation. Start building your crypto
          project today with full control and security.
        </h2>
        <CreateErc20Token />
        <div className="line h-1 bg-gray-500 my-10" />
      </div>
    </div>
  );
}
