'use client';

import { Item } from '@/models';
import { ItemAndCount, Recipe } from '@/models/Recipe';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useRecipe() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  function addRecipe(recipe: Recipe) {
    const body = JSON.stringify({ recipe });
    fetch('/api/recipes', { method: 'POST', body: body })
      .then((response) => response.json())
      .then(() => {
        router.push('/admin/recipe/list');
      });
  }

  const getRecipes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/recipes', { method: 'GET' });
      const recipesFromDb = (await response.json()) as RecipeFromDb[];
      const recipes = mapRecipeFromDbToRecipe(recipesFromDb);
      return recipes;
    } catch (e) {
      return [];
    } finally {
      setLoading(false);
    }
  };

  function getRecipeByItemId(itemId: number): Promise<Recipe> {
    return fetch(`/api/recipes/${itemId}`, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        const recipesFromDb = data as RecipeFromDb[];

        const recipes = mapRecipeFromDbToRecipe(recipesFromDb);
        return recipes[0];
      });
  }

  function mapRecipeFromDbToRecipe(recipesFromDb: RecipeFromDb[]): Recipe[] {
    const recipes: Recipe[] = [];

    const recipeIds = _.uniq(recipesFromDb.map((x) => x.recipeid));
    recipeIds.forEach((recipeId) => {
      const currentRecipesFromDb = recipesFromDb.filter((x) => x.recipeid == recipeId);
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

  return {
    addRecipe,
    getRecipes,
    getRecipeByItemId,
    loading,
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
