"use client";

import { Card } from "@/components/interface/card";
import { TransactionTokens } from "@/components/vault/vaultCardTokens";
import { CardTransaction } from "@/components/vault/vaultCardTransaction";

import {
  maxDepositAtom,
  minDepositAtom,
  swapAtom,
  tokenDecimals,
  vaultAtom,
} from "@/utils/atom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { formatUnits, Hex } from "viem";

export type vault = {
  id: number;
  address: Hex;
  name: string;
  startsAt: string;
  endsAt: string;
  banner: string;
  logo: string;
  assetTokenName: string;
  assetTokenAddress: Hex;
};

export default function TokenAddress() {
  const [vaultData, setVaultData] = useAtom<vault | null>(vaultAtom);
  const [minDeposit] = useAtom(minDepositAtom);
  const [maxDeposit] = useAtom(maxDepositAtom);
  const [decimals] = useAtom(tokenDecimals);
  const [currentPage, setCurrentPage] = useState(1);
  const [swaps, setSwaps] = useAtom(swapAtom);

  async function fetchVaultData() {
    const response = await fetch("/api/getTokenAddress", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (data.success) {
      setVaultData(data.vault[2]);
    }

    console.log(data);
  }

  async function fetchSwapData(page: number = 1) {
    const response = await fetch(`/api/getSwaps?page=${page}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (data.success) {
      setSwaps(data.swaps);
    } else {
      console.error("Error getting in the database", data.message);
    }
  }

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
    fetchSwapData(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    fetchSwapData(currentPage - 1);
  };

  useEffect(() => {
    fetchVaultData();
    fetchSwapData();
  }, []);

  if (!vaultData) {
    return (
      <div
        className="text-red-500 text-xl flex h-screen w-screen justify-center items-center
       bg-background"
      >
        Loading...
      </div>
    );
  }

  const formatStartDate = new Date(vaultData.startsAt).toLocaleDateString(
    "en-US"
  );
  const formatEndDate = new Date(vaultData.endsAt).toLocaleDateString("en-US");

  return (
    <div className="h-screen w-[calc(screen-1px)] bg-background font-SpaceGrotesk">
      <div className="h-full w-full flex flex-col pt-12 items-center">
        <Card className="relative" intent={"primary"} size={"large"}>
          <img
            className="size-full object-cover rounded-2xl"
            src={vaultData.banner}
          />
          <div className="flex absolute bottom-3">
            <img className="size-11 ml-4 mr-1" src={vaultData.logo} />
            <div className="flex flex-col">
              <div className="text-2xl font-bold">{vaultData.name}</div>
              <div className="-mt-1 text-base">Sepolia</div>
            </div>
          </div>
        </Card>
        <div className="mt-4 flex gap-5 mr-56 mb-4">
          <div>
            <div className="text-sm text-white">Start date</div>
            <div className="text-xs text-text-foreground">
              {formatStartDate}
            </div>
          </div>
          <div>
            <div className="text-sm text-white">End date</div>
            <div className="text-xs text-text-foreground">{formatEndDate}</div>
          </div>
          <div>
            <div className="text-sm text-white">Max.deposite per wallet.</div>
            <div className="text-xs text-text-foreground">
              {formatUnits(maxDeposit, decimals)} {vaultData.name}
            </div>
          </div>
          <div>
            <div className="text-sm text-white">Min.deposit per wallet.</div>
            <div className="text-xs text-text-foreground">
              {formatUnits(minDeposit, decimals)} {vaultData.name}
            </div>
          </div>
        </div>
        <div className="flex gap-2.5">
          <div className="flex flex-col">
            <Card
              className="rounded-t-xl text-xs flex"
              intent={"primary"}
              size={"mediumLong"}
            >
              <div className="w-20 ml-2">AMOUNT</div>
              <div className="w-28">ACCOUNT</div>
              <div className="w-32">TIME</div>
              <div className="w-[70px]">TYPE</div>
            </Card>
            <TransactionTokens /> //Component Swaps
          </div>
          <CardTransaction />
        </div>
        <div className="text-white flex gap-2 text-[10px] mr-72">
          <button
            onClick={previousPage}
            className="h-5 w-5 bg-gray-600 hover:bg-gray-700 justify-center items-center flex rounded-lg"
          >
            {"<"}
          </button>
          <button className="h-5 w-5 bg-gray-600 hover:bg-gray-700 justify-center items-center flex rounded-lg">
            {currentPage}
          </button>
          <button
            onClick={nextPage}
            className="h-5 w-5 bg-gray-600 hover:bg-gray-700 justify-center items-center flex rounded-lg"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { Card } from "@/components/interface/card";
// import { TransactionTokens } from "@/components/vault/vaultCardTokens";
// import { CardTransaction } from "@/components/vault/vaultCardTransaction";
// import {
//   maxDepositAtom,
//   minDepositAtom,
//   swapAtom,
//   tokenDecimals,
//   vaultAtom,
// } from "@/utils/atom";
// import { useAtom } from "jotai";
// import { formatUnits, Hex } from "viem";

// export type vault = {
//   id: number;
//   address: Hex;
//   name: string;
//   startsAt: string;
//   endsAt: string;
//   banner: string;
//   logo: string;
//   assetTokenName: string;
//   assetTokenAddress: Hex;
// };

// export default function TokenAddress() {
//   const searchParams = useSearchParams();
//   const address = searchParams.get("address");

//   const [vaultData, setVaultData] = useAtom<vault | null>(vaultAtom);
//   const [minDeposit] = useAtom(minDepositAtom);
//   const [maxDeposit] = useAtom(maxDepositAtom);
//   const [decimals] = useAtom(tokenDecimals);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [swaps, setSwaps] = useAtom(swapAtom);

//   useEffect(() => {
//     if (address) {
//       fetchVaultData(address);
//       fetchSwapData();
//     }
//   }, [address]);

//   async function fetchVaultData(address: string) {
//     const response = await fetch(`/api/getTokenAddress/${address}`, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });

//     const data = await response.json();

//     if (data.success) {
//       setVaultData(data.vault);
//     } else {
//       console.error("Erro ao buscar dados do vault", data.message);
//     }
//   }

//   async function fetchSwapData(page: number = 1) {
//     const response = await fetch(`/api/getSwaps?page=${page}`, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });

//     const data = await response.json();

//     if (data.success) {
//       setSwaps(data.swaps);
//     } else {
//       console.error("Erro ao buscar dados dos swaps", data.message);
//     }
//   }

//   const nextPage = () => {
//     setCurrentPage((prev) => prev + 1);
//     fetchSwapData(currentPage + 1);
//   };

//   const previousPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//     fetchSwapData(currentPage - 1);
//   };

//   if (!vaultData) {
//     return (
//       <div className="text-red-500 text-xl flex h-screen w-screen justify-center items-center bg-background">
//         Loading...
//       </div>
//     );
//   }

//   const formatStartDate = new Date(vaultData.startsAt).toLocaleDateString(
//     "en-US"
//   );
//   const formatEndDate = new Date(vaultData.endsAt).toLocaleDateString("en-US");

//   return (
//     <div className="h-screen w-[calc(screen-1px)] bg-background font-SpaceGrotesk">
//       <div className="h-full w-full flex flex-col pt-12 items-center">
//         <Card className="relative" intent={"primary"} size={"large"}>
//           <img
//             className="size-full object-cover rounded-2xl"
//             src={vaultData.banner}
//           />
//           <div className="flex absolute bottom-3">
//             <img className="size-11 ml-4 mr-1" src={vaultData.logo} />
//             <div className="flex flex-col">
//               <div className="text-2xl font-bold">{vaultData.name}</div>
//               <div className="-mt-1 text-base">Sepolia</div>
//             </div>
//           </div>
//         </Card>

//         <div className="mt-4 flex gap-5 mr-56 mb-4">
//           <div>
//             <div className="text-sm text-white">Start date</div>
//             <div className="text-xs text-text-foreground">
//               {formatStartDate}
//             </div>
//           </div>
//           <div>
//             <div className="text-sm text-white">End date</div>
//             <div className="text-xs text-text-foreground">{formatEndDate}</div>
//           </div>
//           <div>
//             <div className="text-sm text-white">Max.deposit per wallet.</div>
//             <div className="text-xs text-text-foreground">
//               {formatUnits(maxDeposit, decimals)} {vaultData.name}
//             </div>
//           </div>
//           <div>
//             <div className="text-sm text-white">Min.deposit per wallet.</div>
//             <div className="text-xs text-text-foreground">
//               {formatUnits(minDeposit, decimals)} {vaultData.name}
//             </div>
//           </div>
//         </div>

//         <div className="flex gap-2.5">
//           <div className="flex flex-col">
//             <Card
//               className="rounded-t-xl text-xs flex"
//               intent={"primary"}
//               size={"mediumLong"}
//             >
//               <div className="w-20 ml-2">AMOUNT</div>
//               <div className="w-28">ACCOUNT</div>
//               <div className="w-32">TIME</div>
//               <div className="w-[70px]">TYPE</div>
//             </Card>
//             <TransactionTokens />
//           </div>
//           <CardTransaction />
//         </div>

//         <div className="text-white flex gap-2 text-[10px] mr-72 mt-2">
//           <button
//             onClick={previousPage}
//             className="h-5 w-5 bg-gray-600 hover:bg-gray-700 justify-center items-center flex rounded-lg"
//           >
//             {"<"}
//           </button>
//           <button className="h-5 w-5 bg-gray-600 hover:bg-gray-700 justify-center items-center flex rounded-lg">
//             {currentPage}
//           </button>
//           <button
//             onClick={nextPage}
//             className="h-5 w-5 bg-gray-600 hover:bg-gray-700 justify-center items-center flex rounded-lg"
//           >
//             {">"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
