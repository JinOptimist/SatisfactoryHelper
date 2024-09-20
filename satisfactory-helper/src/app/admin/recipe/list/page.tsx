'use client';

import { useGetRecipe } from '@/services/UseRecipe';
import Link from 'next/link';
import { Button, ListItem, ListWrapper, RecipeItemSelector, Spinner } from 'smileComponents';

export default function List() {
  const { data: recipes, isLoading } = useGetRecipe();

  return (
    <div className="flex flex-col gap-2 h-full">
      <Link href="/admin/recipe/create" className="self-end">
        <Button>Создать</Button>
      </Link>
      <div className="grow overflow-y-auto">
        {!isLoading ? (
          <ListWrapper>
            {recipes?.map((recipe) => (
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
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
