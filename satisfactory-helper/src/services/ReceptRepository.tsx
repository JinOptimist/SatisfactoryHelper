import { Item } from "@/models";
import { ItemAndCount, Recipe } from "@/models/Recipe";
import _ from "lodash";
import { useRouter } from "next/navigation";

export function useRecipe() {
  const router = useRouter();

  function addRecipe(recipe: Recipe) {
    const body = JSON.stringify({ recipe });
    fetch("/api/recipes", { method: "POST", body: body })
      .then((response) => response.json())
      .then(() => {
        router.push("/admin/recipe/list");
      });
  }

  function getRecipes() {
    return fetch("/api/recipes", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        const recipesFromDb = data as RecipeFromDb[];

        const recipes: Recipe[] = [];

        const recipeIds = _.uniq(recipesFromDb.map((x) => x.recipeid));
        recipeIds.forEach((recipeId) => {
          const currentRecipesFromDb = recipesFromDb.filter(
            (x) => x.recipeid == recipeId
          );
          const recipeFromDb = currentRecipesFromDb[0];
          const recipe = {
            id: recipeId,
            produced: {
              id: recipeFromDb.consumptionitemid,
              name: recipeFromDb.consumptionitemname,
            } as Item,
            producingPerMinute: recipeFromDb.consumptioncount,
            consumption: [],
          } as Recipe;

          currentRecipesFromDb.forEach((currentRecipeFromDb) => {
            const itemAndCount = {
              item: {
                id: currentRecipeFromDb.consumptionitemid,
                name: currentRecipeFromDb.consumptionitemname,
              } as Item,
              count: currentRecipeFromDb.consumptioncount,
            } as ItemAndCount;
            recipe.consumption.push(itemAndCount);
          });

          recipes.push(recipe);
        });

        return recipes;
      });
  }

  return {
    addRecipe,
    getRecipes,
  };
}

type RecipeFromDb = {
  recipeid: number;
  produceditemid: number;
  produceditemname: string;
  perminute: number;
  consumptionitemid: number;
  consumptionitemname: string;
  consumptioncount: number;
};
