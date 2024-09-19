// app/actions.ts
"use server";
import { Pool } from "@neondatabase/serverless";
import { GetRecipeSql } from "../SqlQueries/Sql";

async function getRecipe(itemId: string) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();
  const data = await client.query(`${GetRecipeSql} AND IR.id = $1`, [itemId]);
  return data;
}

export async function GET(
  request: Request,
  { params }: { params: { itemId: string } }
) {
  const data = await getRecipe(params.itemId);
  return Response.json(data);
}
