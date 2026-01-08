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
            <FaWallet color={connectedWallet ? "purple" : "white"} />
          </button>
        </div>
      )}

      {menuOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm " />

          <Card
            className="flex flex-col gap-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            size="high"
            intent="primary"
          >
            <div className="flex justify-between">
              <h1>Ecosystem</h1>
              <button
                className="bg-gray-glow text-xs rounded-full h-4 w-4 flex items-center justify-center text-black 
            font-semibold hover:bg-gray-200"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                x
              </button>
            </div>
            <Tabs.Root defaultValue="ethereum">
              <Tabs.List className="flex gap-4">
                {ECOSYSTEM.map((ecosystem, index) => (
                  <Tabs.Trigger
                    key={index}
                    value={ecosystem}
                    className="data-[state=active]:bg-gray-500 py-2 px-4 rounded-xl hover:bg-gray-500 data-[state=active]:text-white"
                  >
                    {ecosystem}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              <div className="flex items-center gap-4 py-4">
                <div className="w-1/2 h-px bg-gray-100" />
                Wallets
                <div className="w-1/2 h-px  bg-gray-100" />
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
