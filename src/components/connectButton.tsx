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
                  <button className="flex" onClick={openConnectModal}>
                    <FaWallet className="mt-4 ml-4 lg:hidden" color={"white"} />
                    <Button
                      className="hidden lg:flex"
                      intent={"primary"}
                      size={"large"}
                      type="button"
                    >
                      <FaWallet color={"white"} />
                      Connect Wallet
                    </Button>
                  </button>
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
                    className="hover:bg-purple-600 shadow-shadow"
                    intent={"secondary"}
                    size={"large"}
                    onClick={openAccountModal}
                    type="button"
                  >
                    <FaWallet />
                    <div className="hidden lg:block">
                      {account &&
                        account.address &&
                        abbreviateAddress(account.address)}
                      {/* {account.displayName} */}
                    </div>
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
