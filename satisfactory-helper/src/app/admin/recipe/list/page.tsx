"use client";

import { Recipe } from "@/models/Recipe";
import { useRecipe } from "@/services/UseRecipe";
import { useEffect, useState } from "react";
import { ListItem, ListWrapper, RecipeItemSelector } from "smileComponents";

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
          <div className="recipe flex flex-1">
            <div className="consumption flex-1">
              {recipe.consumption.map((itemAndCount) => (
                <RecipeItemSelector
                  key={itemAndCount.item.id}
                  item={itemAndCount.item}
                  count={itemAndCount.count}
                  readonly
                ></RecipeItemSelector>
              ))}
            </div>
            <div className="produced flex-1">
              <RecipeItemSelector
                item={recipe.produced}
                count={recipe.producingPerMinute}
                readonly
              ></RecipeItemSelector>
            </div>
          </div>
        </ListItem>
      ))}
    </ListWrapper>
  );
}
