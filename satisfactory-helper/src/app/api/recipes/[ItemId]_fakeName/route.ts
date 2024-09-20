// app/actions.ts
"use server";
import { Pool } from "@neondatabase/serverless";

async function getRecipe(itemId: string) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();
  const data = await client.query(
    `
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
	LEFT JOIN items IRC ON RC.itemId = IRC.id
WHERE 1 = 1 AND IR.id = $1`,
    [itemId]
  );
  return data;
}

export async function GET(
  request: Request,
  { params }: { params: { itemId: string } }
) {
  const data = await getRecipe(params.itemId);
  return Response.json(data.rows);
}
