import { useAccount } from "wagmi";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react";

export function useMultiWallet() {
  const eth = useAccount();
  const sol = useSolanaWallet();
  const aptos = useAptosWallet();

  const connectedWallet = eth.isConnected
    ? { address: eth.address, type: "Ethereum" }
    : sol.connected
    ? { address: sol.publicKey?.toBase58(), type: "Solana" }
    : aptos.connected
    ? { address: aptos.account?.address, type: "aptos" }
    : null;

  return connectedWallet;
}
