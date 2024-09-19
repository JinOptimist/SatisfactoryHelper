'use client';

import { Recipe } from '@/models/Recipe';
import { useRecipe } from "@/services/UseRecipe";
import { useEffect, useState } from 'react';
import { ListItem, ListWrapper } from 'smileComponents';

export default function List() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { getRecipes } = useRecipe();

  useEffect(() => {
    getRecipes().then(setRecipes);
  }, []);

  return (
    <ListWrapper>
      {recipes.map((x) => (
        <ListItem key={x.id}>
          {x.id} ({x.id})
        </ListItem>
      ))}
    </ListWrapper>
  );
}
