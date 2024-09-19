'use client';

import { Item, ItemAndCount } from '@/models';
import { Recipe } from '@/models/Recipe';
import { useRecipe } from '@/services/UseRecipe';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { isEqual } from 'lodash';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { Button, RecipeItemSelector } from 'smileComponents';

export default function CreateRecipe() {
  const { addRecipe } = useRecipe();
  const [produced, setProduced] = useState<Item>();
  const [producedCount, setProducedCount] = useState<number>();
  const [consumptions, setConsumptions] = useState<ItemAndCount[]>([{} as ItemAndCount]);

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
  }, [produced, producedCount, consumptions]);

  const clearRecipe = useCallback(() => {
    setConsumptions([{} as ItemAndCount]);
  }, [produced, producedCount, consumptions]);

  const disabled = consumptions.some(({ item, count }) => !item || !count) || !produced || !producedCount;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="mb-4 flex items-center">
        <span className="text-2xl text-amber-500 text-center grow">Создание Рецепта</span>
        <Link href="/admin/recipe/list">
          <XMarkIcon className="size-6" />
        </Link>
      </h2>

      <div className="flex">
        <div className="flex-1">
          <h3 className="text-lg mb-4">Требуется ({consumptions.length})</h3>

          {consumptions.map((consumption, index) => (
            <RecipeItemSelector
              key={index}
              item={consumption.item}
              count={consumption.count}
              onChange={(itemAndCount) => updateConsumption(index, itemAndCount)}
            ></RecipeItemSelector>
          ))}
          <div className="flex gap-1">
            <Button onClick={addConsumption}>+</Button>
            <Button onClick={clearRecipe} className="bg-neutral-800 text-neutral-50">
              Очистить
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg mb-4">Производим</h3>

          <RecipeItemSelector onChange={updateProduced}></RecipeItemSelector>
        </div>
      </div>
      <div className="self-center">
        <Button onClick={createRecipe} disabled={disabled} className="bg-amber-500">
          Создать
        </Button>
      </div>
    </div>
  );
}
