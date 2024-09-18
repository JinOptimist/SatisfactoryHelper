"use client";

import { Item } from "@/models";
import { useItems } from "@/services/ItemRepository";
import { useEffect, useState } from "react";

export default function List() {
  const [Recipes, setRecipes] = useState<Item[]>([]);
  const { getItems } = useItems();

  useEffect(() => {
    getItems(setRecipes);
  }, []);

  return (
    <div>
      {Recipes.map((x) => (
        <div key={x.id}>
          {x.name} ({x.id})
        </div>
      ))}
    </div>
  );
}
