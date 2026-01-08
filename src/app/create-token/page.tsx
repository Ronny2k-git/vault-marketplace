import { CreateErc20TokenForm } from "@/components/createErc20Token";

export default function CreateTokenPage() {
  return (
    <div className="min-h-screen min-w-screen flex justify-center bg-background p-4">
      <div className="h-full w-full max-w-3xl flex flex-col">
        <h1 className="text-white mt-10 text-3xl">ERC-20 Token Creator</h1>

        {/* Divider */}
        <div className="line h-px bg-gray-500 mb-5 mt-6" />

        <h2 className="max-w-lg text-text-foreground mb-10">
          Create your own ERC-20 token easily with our user-friendly interface.
          Customize your token name, symbol, total supply, and decimals. Deploy
          to the Ethereum blockchain in just a few clicks. No coding required —
          we handle the smart contract generation. Start building your crypto
          project today with full control and security.
        </h2>

        {/* Card Creation */}
        <CreateErc20TokenForm />

        <div className="line h-px bg-gray-500 my-10" />
        <h2 className="text-white text-2xl mb-4">How to Use</h2>

        <p className="text-text-foreground mb-6">
          1. Fill in the token details: name, symbol, total supply, and
          decimals.
          <br />
          2. Select the network (Mainnet or Sepolia).
          <br />
          3. Click (Create Token) to generate your ERC-20 token.
          <br />
          4. Review the transaction details and confirm the deployment.
          <br />
          5. Your token will be created and deployed to the selected network.
        </p>
      </div>
    </div>
  );
}
