"use client";

import { Recipe } from "@/models/Recipe";
import { useRecipe } from "@/services/ReceptRepository";
import { useEffect, useState } from "react";

export default function List() {
  const [Recipes, setRecipes] = useState<Recipe[]>([]);
  const { getRecipes } = useRecipe();

  useEffect(() => {
    getRecipes().then((r) => console.log(r));
    setRecipes([]);
  }, []);

  return (
    <div>
      {Recipes.map((x) => (
        <div key={x.id}>
          {x.id} ({x.id})
        </div>
      ))}
    </div>
  );
}
