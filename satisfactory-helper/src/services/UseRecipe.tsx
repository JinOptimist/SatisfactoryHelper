"use client";

import { Item } from "@/models";
import { ItemAndCount, Recipe } from "@/models/Recipe";
import _ from "lodash";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "./client";

export const useGetRecipe = () =>
  useQuery<Recipe[]>({
    retry: 1,
    queryKey: ["recipe"],
    queryFn: () =>
      fetch("/api/recipes", { method: "GET" })
        .then((res) => res.json())
        .then(mapRecipeFromDbToRecipe)
        .catch(() => []),
  });

export const useAddRecipe = () =>
  useMutation({
    mutationFn: (recipe: Recipe) => {
      const body = JSON.stringify({ recipe });
      return fetch("/api/recipes", { method: "POST", body: body });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipe"] });
    },
  });

export const getRecipeByItemId = async (itemId: number) =>
  queryClient.getQueryData<Recipe[]>(["recipe"])?.find(
    ({
      produced: {
        id,
      },
    }) => id === itemId
  );

function mapRecipeFromDbToRecipe(recipesFromDb: RecipeFromDb[]): Recipe[] {
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
        id: recipeFromDb.produceditemid,
        name: recipeFromDb.produceditemname,
      } as Item,
      producingPerMinute: recipeFromDb.perminute,
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
