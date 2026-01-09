"use client";

import { EthereumConnectors } from "@/connection/components/EthereumConnectors";
import { MoveConnectors } from "@/connection/components/MoveConnectors";
import { SolanaConnectors } from "@/connection/components/SolanaConnectors";
import { useMultiWallet } from "@/connection/hooks/useWallet";
import { ECOSYSTEM } from "@/global/constants";
import { abreviateAddress } from "@/global/utils";
import { Tabs } from "radix-ui";
import { useState } from "react";
import { FaWallet } from "react-icons/fa";
import { Button } from "./interface/button";
import { Card } from "./interface/card";

export default function WalletConnection() {
  const [menuOpen, setMenuOpen] = useState(false);

  const connectedWallet = useMultiWallet();

  return (
    <div className="relative z-30">
      {!menuOpen && (
        <div className="flex transition-shadow duration-300">
          <Button
            className="hidden lg:flex"
            intent={connectedWallet ? "secondary" : "primary"}
            size={"large"}
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaWallet color={"white"} />
            {connectedWallet
              ? `${abreviateAddress(connectedWallet.address?.toString())}`
              : "Connect Wallet"}
          </Button>
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <FaWallet
              className="w-5 h-5"
              color={connectedWallet ? "purple" : "white"}
            />
          </button>
        </div>
      )}

      {menuOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm " />

          <Card
            className="flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            size="high"
            intent="primary"
          >
            <div className="flex justify-between">
              <h1 className="text-xl">Ecosystem</h1>

              <Button
                className="text-base rounded-full h-5 w-5 p-4 text-black 
            font-semibold"
                onClick={() => setMenuOpen(!menuOpen)}
                intent={"primary"}
              >
                x
              </Button>
            </div>
            <Tabs.Root defaultValue="ethereum">
              <Tabs.List className="flex gap-4">
                {ECOSYSTEM.map((ecosystem, index) => (
                  <Tabs.Trigger
                    key={index}
                    value={ecosystem}
                    className="data-[state=active]:bg-gray-800/50 py-2 px-4 data-[state=active]:border border-gray-500 rounded-xl data-[state=active]:text-gray-300"
                  >
                    {ecosystem}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              <div className="flex items-center gap-4 py-4">
                <div className="w-1/2 h-px bg-gray-400/80" />
                Wallets
                <div className="w-1/2 h-px  bg-gray-400/80" />
              </div>
              <Tabs.Content value="ethereum">
                <EthereumConnectors />
              </Tabs.Content>
              <Tabs.Content value="solana">
                <SolanaConnectors />
              </Tabs.Content>
              <Tabs.Content value="move">
                <MoveConnectors />
              </Tabs.Content>
            </Tabs.Root>
          </Card>
        </>
      )}
    </div>
  );
}
