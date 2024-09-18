'use client';

import { Item } from '@/models';
import { useItems } from '@/services/ItemRepository';
import { useEffect, useState } from 'react';
import { ListWrapper, ListItem } from 'smileComponents';

export default function List() {
  const [Recipes, setRecipes] = useState<Item[]>([]);
  const { getItems } = useItems();

  useEffect(() => {
    getItems(setRecipes);
  }, []);

  return (
    <ListWrapper>
      {Recipes.map((x) => (
        <ListItem key={x.id}>
          {x.name} ({x.id})
        </ListItem>
      ))}
    </ListWrapper>
  );
}
