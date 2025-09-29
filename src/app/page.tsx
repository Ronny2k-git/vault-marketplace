"use client";

import { TokenVaults } from "@/components/TokenVaults";

export default function ExploreVaults() {
  return (
    <div className="min-h-screen w-[calc(screen-1px)] bg-background">
      <div className="h-full w-full items-center flex flex-col gap-2">
        <TokenVaults />
      </div>
    </div>
  );
}
