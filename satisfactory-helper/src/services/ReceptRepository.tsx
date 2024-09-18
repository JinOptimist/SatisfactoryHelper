import { Item } from "@/models";
import { Recipe } from "@/models/Recipe";
import { useRouter } from "next/navigation";

export function useRecipe() {
  const router = useRouter();

  function addRecipe(name: string) {
    const item = { name } as Item;
    const body = JSON.stringify({ item });
    fetch("/api/recipes", { method: "POST", body: body })
      .then((response) => response.json())
      .then(() => {
        router.push("/admin/recipe/list");
      });
  }

  function getRecipes(onDone: (items: Recipe[]) => void) {
    fetch("/api/recipes", { method: "GET" })
      .then((response) => response.json())
      .then((recipesFromDb) => {
        onDone(recipesFromDb as Recipe[]);
      });
  }

  return {
    addRecipe,
    getRecipes,
  };
}
