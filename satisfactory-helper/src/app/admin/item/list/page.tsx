"use client";

import { Item } from "@/models";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function List() {
  const [Recipes, setRecipes] = useState<Item[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/items", { method: "GET" })
      .then((response) => response.json())
      .then((receiptsFromDb) => {
        setRecipes(receiptsFromDb as Item[]);
      });
  }, []);

  return (
    <div>
      <div>
        <Link href={"/admin/item/create"}>Create</Link>
      </div>
      {Recipes.map((x) => (
        <div key={x.id}>
          {x.name} ({x.id})
        </div>
      ))}
    </div>
  );
}
