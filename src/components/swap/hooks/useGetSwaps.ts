import { swap } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

type SwapsReponse = {
  swaps: swap[];
  total: number;
  limit: number;
};

async function fetchSwapData({
  page = 1,
  vaultId,
}: {
  page: number;
  vaultId: number;
}): Promise<SwapsReponse> {
  const res = await fetch(`/api/getSwaps?vaultId=${vaultId}&page=${page}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch swaps");
  }
  const data = await res.json();
  return data;
}

export function useGetSwaps({
  page = 1,
  vaultId,
}: {
  page: number;
  vaultId: number;
}) {
  return useQuery({
    queryKey: ["swaps", page, vaultId],
    queryFn: () => fetchSwapData({ page, vaultId }),
  });
}
