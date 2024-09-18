"use client";

import receptRepository from "@/services/ReceptRepository";
import { useEffect, useState } from "react";
import { Assembler, Builder, Factory } from "smileComponents";

export default function Outpost() {
  const { getAllReceipts } = receptRepository;
  const [Dependencies, setDependencies] = useState<number[]>([]);
  useEffect(() => {
    setDependencies([1, 2]);
    const reciepts = getAllReceipts();
    console.log(reciepts);
  }, []);
  return (
    <div>
      <div>Outpost calculator</div>
      <div className="flex">
        <Builder />
        <Factory />
        <Assembler />
      </div>
      <div>Dependencies:</div>
      <div className="border">
        {Dependencies.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
    </div>
  );
}
