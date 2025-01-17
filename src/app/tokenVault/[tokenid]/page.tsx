"use client";

import { Card } from "@/components/card";

export default function Token() {
  return (
    <div className="h-screen w-screen bg-background">
      <div className="h-full w-full flex flex-col justify-center items-center">
        <Card intent={"primary"} size={"large"}></Card>
      </div>
    </div>
  );
}
