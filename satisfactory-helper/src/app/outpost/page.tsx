"use client";

import { ItemAndCount } from "@/models";
import { useCallback, useState } from "react";
import { RecipeItemSelector } from "smileComponents";

export default function Outpost() {
  const [producedOnOutpost, setProducedOnOutpost] = useState<ItemAndCount[]>(
    []
  );
  const [totalConsumption, setTotalConsumption] = useState<ItemAndCount[]>([]);

  const onChangeRecipe = useCallback((itemAndCount: ItemAndCount) => {
    console.log(itemAndCount);
  }, []);
  return (
    <div>
      <div>Outpost calculator</div>
      <div>
        <RecipeItemSelector onChange={onChangeRecipe}></RecipeItemSelector>
      </div>
    </div>
  );
}
