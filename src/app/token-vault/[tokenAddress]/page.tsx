import { getVaultInDb } from "@/app/api/getTokenAddress/getPrisma.ts/prisma";
import { PageView } from "./PageView";

export default async function HomePage({
  params,
}: {
  params: Promise<{ tokenAddress: string }>;
}) {
  const tokenAddress = (await params).tokenAddress;

  const vault = await getVaultInDb(tokenAddress);

  if (!vault) return;

  return <PageView vault={vault}></PageView>;
}
