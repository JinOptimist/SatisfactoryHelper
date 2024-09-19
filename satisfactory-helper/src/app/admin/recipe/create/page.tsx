"use client";

import { ItemAndCount } from "@/models";
import { useCallback, useState } from "react";
import { Button, RecipeItemSelector } from "smileComponents";

export default function CreateRecipe() {
  const [producedId, setProducedId] = useState<number>();
  const [producedCount, setProducedCount] = useState<number>();

  const updateProduced = useCallback((itemAndCount: ItemAndCount) => {
    setProducedId(itemAndCount.item.id);
    setProducedCount(itemAndCount.count);
  }, []);

  const createRecipe = useCallback(() => {
	
  }, []);

  return (
    <div>
      <div>Создание рецепта</div>
      <div className="flex border">
        <div className="flex-1">
          Требуется
          <RecipeItemSelector
            onChange={(x) => console.log(x)}
          ></RecipeItemSelector>
		  
		  <Button onClick={createRecipe}>+</Button>
        </div>
        <div className="flex-1 produce">
          Производим
          <RecipeItemSelector onChange={updateProduced}></RecipeItemSelector>
        </div>
      </div>
      <div>
        <Button onClick={createRecipe}>Создать</Button>
      </div>
    </div>
  );
}
