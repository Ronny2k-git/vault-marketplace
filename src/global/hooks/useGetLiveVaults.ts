import { useQuery } from "@tanstack/react-query";

async function fetchLiveVaults() {
  const res = await fetch("/api/getLiveVaults");

  if (!res.ok) {
    throw new Error("Failed to fetch live vaults");
  }

  const data = await res.json();
  return data.vaults;
}

export function useGetLiveVaults() {
  return useQuery({
    queryKey: ["live-vaults"],
    queryFn: fetchLiveVaults,
  });
}
