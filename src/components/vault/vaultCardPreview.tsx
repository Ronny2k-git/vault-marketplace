"use client";

import { useAtom } from "jotai";
import { Card } from "../interface/card";
import {
  bannerUrlAtom,
  endDateAtom,
  maxDepositAtomCreate,
  minDepositAtomCreate,
  selectedNetworkAtom,
  startDateAtom,
  vaultLogoAtom,
  vaultNameAtom,
} from "@/utils/atom";

export function CardPreview() {
  const [selectedNetwork] = useAtom(selectedNetworkAtom);
  const [vaultName] = useAtom(vaultNameAtom);
  const [vaultLogo] = useAtom(vaultLogoAtom);
  const [bannerUrl] = useAtom(bannerUrlAtom);
  const [minDeposit] = useAtom(minDepositAtomCreate);
  const [maxDeposit] = useAtom(maxDepositAtomCreate);
  const [startDate] = useAtom(startDateAtom);
  const [endDate] = useAtom(endDateAtom);

  return (
    <div>
      <Card intent={"primary"} size={"small"}>
        <div className="relative w-full h-fit aspect-video overflow-hidden flex-grow-0">
          <img
            className="rounded-t-xl h-36 w-full object-cover bg-center"
            src={bannerUrl || "/backgroundCard.png"}
            onError={(e) => (e.currentTarget.src = "/backgroundCard.png")}
          />
          <div className="flex z-10 gap-2 left-2 absolute">
            <img
              className="size-8 rounded-full bg-center bg-cover"
              src={vaultLogo || "/icons/Frame.png"}
            />
            <div className=" font-normal text-white text-base -mb-6">
              {vaultName || "Unammed"}
              <br />
              <div className="text-[10px] -mt-2">
                {selectedNetwork || "No chain selected"}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col my-2 mx-2 gap-0.5">
          <div className="flex font-SpaceGrotesk justify-between">
            <h3>Minimum Deposit</h3>
            <div>{minDeposit}</div>
          </div>
          <div className="flex font-SpaceGrotesk justify-between">
            <h3>Max dep.per wallet</h3>
            <div>{maxDeposit}</div>
          </div>
          <div className="flex font-SpaceGrotesk justify-between">
            <h3>Start Date</h3>
            <div>{startDate?.toLocaleDateString("en-US")}</div>
          </div>
          <div className="flex font-SpaceGrotesk justify-between">
            <h3>End Date</h3>
            <div>{endDate?.toLocaleDateString("en-US")}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
