"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "./interface/button";
import { FaWallet } from "react-icons/fa";

const abbreviateAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 7)}...${address.slice(-5)}`.toLowerCase();
};

export const ButtonStyle = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <div className="flex">
                    <Button
                      intent={"primary"}
                      size={"large"}
                      onClick={openConnectModal}
                      type="button"
                    >
                      <FaWallet /> Connect Wallet
                    </Button>
                  </div>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex" style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                  ></button>

                  <Button
                    intent={"secondary"}
                    size={"large"}
                    onClick={openAccountModal}
                    type="button"
                  >
                    <FaWallet />
                    {account &&
                      account.address &&
                      abbreviateAddress(account.address)}
                    {/* {account.displayName} */}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
