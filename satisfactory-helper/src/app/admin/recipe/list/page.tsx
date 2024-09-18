"use client";

import { Recept } from "@/models";
import receptRepository from "@/services/ReceptRepository";
import { useEffect, useState } from "react";

export default function List() {
  const { getAllReceipts } = receptRepository;
  const [Recipes, setRecipes] = useState<Recept[]>([]);
  useEffect(() => {
    const receiptsFromDb = getAllReceipts();
    setRecipes(receiptsFromDb);
  }, []);
  return (
    <div>
      {Recipes.map((x) => (
        <div key={x.id}>{x.produced.name}</div>
      ))}
    </div>
  );
}
