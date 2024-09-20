"use client";

import { ItemAndCount } from "@/models";
import { Recipe } from "@/models/Recipe";
import { useRecipe } from "@/services/UseRecipe";
import { useCallback, useEffect, useState } from "react";
import { Button, RecipeItemSelector, Spinner } from "smileComponents";
import './print.css';

export default function Outpost() {
  const { getRecipeByItemId } = useRecipe();

  const [producedOnOutpost, setProducedOnOutpost] = useState<ItemDeepInfo[]>([
    {} as ItemDeepInfo,
  ]);

  const [totalConsumption, setTotalConsumption] = useState<ItemAndCount[]>([]);
  const [totalRemains, setTotalRemains] = useState<ItemAndCount[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

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

  const clearRecipe = useCallback(() => {
    setProducedOnOutpost([{} as ItemDeepInfo]);
  }, [setProducedOnOutpost]);

  useEffect(() => {
    const realProducing = producedOnOutpost.filter((x) => x.recipe);
    if (!realProducing || realProducing.length == 0) {
      return;
    }

    setLoading(true);
    const totalConsumption: ItemAndCount[] = [];
    const remains: ItemAndCount[] = [];

    producedOnOutpost
      .filter((x) => x.recipe)
      .forEach((itemInfo) => {
        const consumptionFromOneRecipe = itemInfo.recipe.consumption;
        consumptionFromOneRecipe.forEach((itemAndCount) => {
          const existedItem = totalConsumption.find(
            (x) => x.item.id == itemAndCount.item.id
          );
          if (existedItem) {
            existedItem.count += itemAndCount.count;
          } else {
            totalConsumption.push({
              item: itemAndCount.item,
              count: itemAndCount.count * itemInfo.factoryCount,
            });
          }
        });

        remains.push({
          item: itemInfo.recipe.produced,
          count: itemInfo.totalPerMinute,
        });
      });

    totalConsumption.forEach((consumption) => {
      var peaceOfRemains = remains.find(
        (x) => x.item.id == consumption.item.id
      );
      if (peaceOfRemains) {
        peaceOfRemains.count -= consumption.count;
      }

      const producing = realProducing.find(
        (x) => x.recipe.produced.id == consumption.item.id
      );
      if (producing) {
        consumption.count -= producing.totalPerMinute;
      }
    });

    const totalConsumptionMinusProducing = totalConsumption.filter(
      (c) => c.count > 0
    );
    const totalProducingMinusConsumption = remains.filter((c) => c.count > 0);

    setLoading(false);
    setTotalConsumption(totalConsumptionMinusProducing);
    setTotalRemains(totalProducingMinusConsumption);
  }, [producedOnOutpost]);

  const isProduceTargetSelected = producedOnOutpost.find(
    ({ recipe }) => !!recipe
  );

  const onPrint = useCallback(() => {
	print();
  }, []);

  return (
    <div className="flex flex-col gap-4 outpost">
      <h2 className="mb-4 flex items-center">
        <span className="text-2xl text-amber-500 text-center grow">
          Аванпост
        </span>
      </h2>
      <div className="flex gap-4">
        <div className="flex-1">
          <h3 className="text-lg mb-2">Производим на этой площадке</h3>
          {producedOnOutpost.map((itemInfo, index) => (
            <div key={itemInfo?.recipe?.produced.id ?? 1}>
              <RecipeItemSelector
                onChange={(itemAndCount) => onChangeRecipe(index, itemAndCount)}
                item={itemInfo?.recipe?.produced}
                count={itemInfo?.factoryCount ?? 1}
              ></RecipeItemSelector>

              {isProduceTargetSelected && (
                <h3 className="text-lg mb-4">
                  Производиться в минуту: {itemInfo?.totalPerMinute}
                </h3>
              )}
            </div>
          ))}

          <div className="flex gap-1 mt-2 print:hidden">
            <Button onClick={addProducing} className="bg-amber-500">
              +
            </Button>
            <Button
              onClick={clearRecipe}
              className="!bg-neutral-800 text-neutral-50"
            >
              Очистить
            </Button>
          </div>
        </div>

        {loading && (
          <div className="flex-1">
            <Spinner />
          </div>
        )}
        {isProduceTargetSelected && (
          <div className="flex-1">
            <h3 className="text-lg mb-2">Закидываем на эту площадку</h3>
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

            <h3 className="text-lg mb-2">Остаток</h3>
            <div>
              {totalRemains.map(({ item, count }) => (
                <RecipeItemSelector
                  key={item.id}
                  item={item}
                  count={count}
                  readonly
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="print:hidden">
        <Button onClick={onPrint} className="bg-amber-500">
          Распечатать
        </Button>
      </div>
    </div>
  );
}

type ItemDeepInfo = {
  recipe: Recipe;
  factoryCount: number;
  totalPerMinute: number;
};
