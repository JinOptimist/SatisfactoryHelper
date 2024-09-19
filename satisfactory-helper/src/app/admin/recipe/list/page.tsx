"use client";

import { Recipe } from "@/models/Recipe";
import { useRecipe } from "@/services/UseRecipe";
import { useEffect, useState } from "react";

export default function List() {
  const [Recipes, setRecipes] = useState<Recipe[]>([]);
  const { getRecipes } = useRecipe();

  useEffect(() => {
    getRecipes().then(response => {
		setRecipes(response);
		console.log(response);
	});
  }, []);

  return (
    <div>
      {Recipes.map((recipe) => (
        <div key={recipe.id}>
          {recipe.produced.name} ({recipe.id})
        </div>
      ))}
    </div>
  );
}
