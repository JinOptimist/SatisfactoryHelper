// app/actions.ts
"use server";
import { Recipe } from "@/models/Recipe";
import { neon, Pool } from "@neondatabase/serverless";

async function createItem(recipe: Recipe) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();
  const insertRecipeResponse = await client.query(
    `INSERT INTO persons (producedId, producingPerMinute) VALUES ($1, $2) RETURNING id;`,
    [recipe.produced.id, recipe.producingPerMinute]
  );
  const recipeId = insertRecipeResponse.rows[0].id;

  for (let i = 0; i < recipe.consumption.length; i++) {
    const consumption = recipe.consumption[i];
    await client.query(
      `INSERT INTO recipe_consumption (recipeId, itemId, count) VALUES ($1, $2, $4)`,
      [recipeId, consumption.item.id, consumption.count]
    );
  }

  return insertRecipeResponse;
}

async function getRecipe() {
  const sql = neon(process.env.DATABASE_URL!);
  const data = await sql`
SELECT 
	R.id as recipeId,
	IR.id as producedItemId, 
	IR.name as producedItemName, 
	R.producingPerMinute as PerMinute, 
	RC.itemId as consumptionItemId,
	IRC.name as consumptionItemName,
	RC.count as consumptionCount
FROM recipe R
	LEFT JOIN recipe_consumption RC ON R.id = RC.recipeId
	LEFT JOIN items IR ON R.producedId = IR.id
	LEFT JOIN items IRC ON RC.itemId = IRC.id`;

  return data;
}

export async function POST(request: Request) {
  const name = (await request.json()).item.name;
  const data = await createItem(name);
  return Response.json(data);
}

export async function GET() {
  const data = await getRecipe();
  return Response.json(data);
}
