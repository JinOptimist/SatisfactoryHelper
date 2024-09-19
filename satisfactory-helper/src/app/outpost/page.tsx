"use client";

import { ItemAndCount } from "@/models";
import { Recipe } from "@/models/Recipe";
import { useRecipe } from "@/services/UseRecipe";
import { useCallback, useEffect, useState } from "react";
import { Button, RecipeItemSelector } from "smileComponents";

export default function Outpost() {
  const { getRecipeByItemId } = useRecipe();

  const [producedOnOutpost, setProducedOnOutpost] = useState<ItemDeepInfo[]>(
    []
  );

  const [totalConsumption, setTotalConsumption] = useState<ItemAndCount[]>([]);

  //   const [itemDeepInfo, setItemDeepInfo] = useState<ItemDeepInfo>(
  //     {} as ItemDeepInfo
  //   );

  const onChangeRecipe = useCallback(
    (index: number, itemAndCount: ItemAndCount) => {
      const itemInfo = producedOnOutpost[index];

      if (itemAndCount.item.id !== itemInfo?.recipe?.produced?.id) {
        getRecipeByItemId(itemAndCount.item.id).then((recipe) => {
          setProducedOnOutpost((oldProducedOnOutpost) => {
            const newProducedOnOutpost = [...oldProducedOnOutpost];
            newProducedOnOutpost[index] = {
              recipe,
              factoryCount: itemAndCount.count,
              totalPerMinute: recipe.producingPerMinute * itemAndCount.count,
            } as ItemDeepInfo;

            return newProducedOnOutpost;
          });
        });
      } else {
        setProducedOnOutpost((oldProducedOnOutpost) => {
          const newProducedOnOutpost = [...oldProducedOnOutpost];
          const old = newProducedOnOutpost[index];
          const newProduce = {
            ...old,
            factoryCount: itemAndCount.count,
            totalPerMinute: old.recipe.producingPerMinute * itemAndCount.count,
          };
          newProducedOnOutpost[index] = newProduce;

          return newProducedOnOutpost;
        });
      }
    },
    [getRecipeByItemId, producedOnOutpost]
  );

  const addProducing = useCallback(() => {
    setProducedOnOutpost((old) => [...old, {} as ItemDeepInfo]);
  }, [setProducedOnOutpost]);

    useEffect(() => {
      if (producedOnOutpost) {
		const totalConsumption:ItemAndCount[] = [];

		producedOnOutpost.map(x=>x.recipe.consumption);

        setTotalConsumption(totalConsumption);
      }
    }, [producedOnOutpost]);

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div>Производим на этой площадке</div>
        <Button onClick={addProducing}>+</Button>
        {producedOnOutpost.map((itemInfo, index) => (
          <div key={itemInfo?.recipe?.produced.id ?? 1}>
            <RecipeItemSelector
              onChange={(itemAndCount) => onChangeRecipe(index, itemAndCount)}
              item={itemInfo?.recipe?.produced}
              count={itemInfo?.factoryCount ?? 1}
            ></RecipeItemSelector>
            Производиться в минуту {itemInfo?.totalPerMinute}
          </div>
        ))}
      </div>
      <div className="flex-1">
        Закидываем на эту площадку
        <div>
          {totalConsumption.map(({ item, count }) => (
            <RecipeItemSelector
              key={item.id}
              item={item}
              count={count}
              readonly
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type ItemDeepInfo = {
  recipe: Recipe;
  factoryCount: number;
  totalPerMinute: number;
};
