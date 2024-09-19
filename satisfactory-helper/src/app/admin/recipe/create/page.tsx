"use client";

import { Item, ItemAndCount } from "@/models";
import { Recipe } from "@/models/Recipe";
import { useRecipe } from "@/services/UseRecipe";
import { isEqual } from "lodash";
import { useCallback, useState } from "react";
import { Button, RecipeItemSelector } from "smileComponents";

export default function CreateRecipe() {
  const { addRecipe } = useRecipe();

  const [produced, setProduced] = useState<Item>();
  const [producedCount, setProducedCount] = useState<number>();
  const [consumptions, setConsumptions] = useState<ItemAndCount[]>([]);

  const updateProduced = useCallback(
    (itemAndCount: ItemAndCount) => {
      setProduced(itemAndCount.item);
      setProducedCount(itemAndCount.count);
      console.log(itemAndCount.count);
    },
    [produced, producedCount, setProduced, setProducedCount]
  );

  const updateConsumption = useCallback(
    (index: number, itemAndCount: ItemAndCount) => {
      if (isEqual(consumptions[index], itemAndCount)) {
        return false;
      }

      setConsumptions((old) => {
        const newArray = [...old];
        newArray[index] = itemAndCount;
        return newArray;
      });
    },
    [consumptions, setConsumptions]
  );

  const addConsumption = useCallback(() => {
    setConsumptions((old) => [...old, {} as ItemAndCount]);
  }, [setConsumptions]);

  const createRecipe = useCallback(() => {
    const recipe = {
      produced,
      consumption: consumptions,
      producingPerMinute: producedCount,
    } as Recipe;
    addRecipe(recipe);
    // console.log(recipe);
  }, [produced, producedCount, consumptions]);

  return (
    <div>
      <div>Создание рецепта</div>
      <div className="flex border">
        <div className="flex-1">
          Требуется {consumptions.length}
          {consumptions.map((consumption, index) => (
            <RecipeItemSelector
              key={index}
              item={consumption.item}
              count={consumption.count}
              onChange={(itemAndCount) =>
                updateConsumption(index, itemAndCount)
              }
            ></RecipeItemSelector>
          ))}
          <Button onClick={addConsumption}>+</Button>
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
