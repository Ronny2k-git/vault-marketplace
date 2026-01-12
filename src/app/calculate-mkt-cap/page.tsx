import { MktCapCalculator } from "@/components/mktCapCalculator";

export default function MarketCapPage() {
  return (
    <div className="min-h-screen min-w-screen flex justify-center py-20 bg-background px-12">
      <div className="h-full w-full max-w-3xl flex flex-col">
        <h1 className="text-white text-3xl">Market Cap Calculator</h1>

        {/* Divider */}
        <div className="line h-px w-full bg-gray-500 my-10" />

        <h2 className="max-w-lg text-text-foreground mb-10">
          Market Cap in short means Market Capitalization. It is a record of
          capital being invested in a crypto and is used to estimate the total
          value of the cryptocurrency. The below market cap calculator tool
          helps you to quickly calculate the market capitalization of a
          particular crypto asset.
        </h2>

        {/* Calculator Card */}
        <MktCapCalculator />

        {/* Divider */}
        <div className="line h-px w-full bg-gray-500 my-10" />

        <h1 className="text-white text-3xl mb-5">
          How To Calculate Cryptocurrency Market Cap?
        </h1>

        <h2 className="max-w-lg text-text-foreground mb-4">
          To calculate market cap you need to know the circulating supply of
          coin/token and its current Fiat value.You will multiply the current
          price of the coin/token by its circulating supply. Example: a token
          with a current pric of $100 and a total supply of 500,000,000.
        </h2>

        {/* Result of the calculation */}
        <div className="flex max-sm:flex-col gap-2 text-white">
          <h3 className="text-white">500,000,000 * $100 = </h3>
          <div className="text-green-500 flex gap-2">
            $ 50,000,000,000
            <div className="text-white mb-20">is this the market cap.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
