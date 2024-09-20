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
    const realProducing = producedOnOutpost
      .filter(x => x.recipe);
    if (!realProducing || realProducing.length == 0) {
      return;
    }

    const totalConsumption: ItemAndCount[] = producedOnOutpost
      .filter(x => x.recipe)
      //.map(x => x.recipe.consumption)
      .reduce((total: ItemAndCount[], itemInfo) => {
        const consumptionFromOneRecipe = itemInfo.recipe.consumption;
        consumptionFromOneRecipe.forEach(itemAndCount => {
          const existedItem = total.find(x => x.item.id == itemAndCount.item.id);
          if (existedItem) {
            existedItem.count += itemAndCount.count
          } else {
            total.push({
              item: itemAndCount.item,
              count: itemAndCount.count * itemInfo.factoryCount
            });
          }
        });

        return total
      }, []);

    totalConsumption.forEach(consumption => {
      const producing = realProducing.find(x => x.recipe.produced.id == consumption.item.id);
      if (producing) {
        consumption.count -= producing.totalPerMinute;
      }
    })

    const totalConsumptionMinusProducing = totalConsumption.filter(c => c.count > 0);

    setTotalConsumption(totalConsumptionMinusProducing);
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
