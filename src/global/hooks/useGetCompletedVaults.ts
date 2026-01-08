import { vault } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

type CompletedVaultsResponse = {
  vaults: vault[];
  total: number;
  limit: number;
};

async function fetchCompletedVaults(
  page: number
): Promise<CompletedVaultsResponse> {
  const res = await fetch(`/api/getEndVaults?page=${page}`);

  if (!res.ok) {
    throw new Error("Failed to fetch completed vaults");
  }

  const data = await res.json();
  return data.endVaults;
}

export function useGetCompletedVaults(page: number) {
  return useQuery({
    queryKey: ["completed-vaults", page],
    queryFn: () => fetchCompletedVaults(page),
  });
}
