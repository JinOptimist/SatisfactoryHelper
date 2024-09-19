"use client";

import { Item } from "@/models";
import { useItems } from "@/services/UseItems";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { RecipeItemSelector } from "smileComponents";

export default function CreateRecipe() {
  const [items, setItems] = useState<Item[]>([]);
  const { getItems } = useItems();

  const [producedId, setProducedId] = useState<number>();

  useEffect(() => {
    getItems().then(setItems);
  }, []);

  const onItemChange = useCallback((evt: ChangeEvent<HTMLSelectElement>) => {
    setProducedId(+evt.target.value);
  }, []);

  return (
    <div>
      <div>Создание рецепта</div>
      <div className="flex">
        <div className="flex-1">
          consumption
          <RecipeItemSelector
            onChange={(x) => console.log(x)}
          ></RecipeItemSelector>
        </div>
        <div className="flex-1 produce">
          <div>
            producedId:{producedId}
            <select onChange={onItemChange}>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input type="number" placeholder="Сколько в минуту" />
          </div>
        </div>
      </div>
    </div>
  );
}
