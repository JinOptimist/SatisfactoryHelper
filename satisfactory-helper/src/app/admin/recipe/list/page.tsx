"use client";

import { Recipe } from "@/models/Recipe";
import { useRecipe } from "@/services/UseRecipe";
import { useEffect, useState } from "react";
import { ListItem, ListWrapper } from "smileComponents";

export default function List() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { getRecipes } = useRecipe();

  useEffect(() => {
    getRecipes().then(setRecipes);
  }, []);

  return (
    <ListWrapper>
      {recipes.map((recipe) => (
        <ListItem key={recipe.id}>
          <div className="recipe flex">
            <div className="consumption flex-1">
              {recipe.consumption.map((itemAndCount) => (
                <div key={itemAndCount.item.id}>
                  {itemAndCount.item.name}: {itemAndCount.count}
                </div>
              ))}
            </div>
            <div className="produced flex-1">
              {recipe.produced.name} ({recipe.id})
            </div>
          </div>
        </ListItem>
      ))}
    </ListWrapper>
  );
}
