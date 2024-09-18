// app/actions.ts
"use server";
import { neon, Pool } from "@neondatabase/serverless";

async function createItem(name: string) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();
  const data = await client.query(`INSERT INTO items(name) values ($1)`, [name]);

//   const sql = neon(process.env.DATABASE_URL!);
//   const data = await sql`INSERT INTO items(name) values ('${name}')`;
  return data;
}

async function getItems() {
  const sql = neon(process.env.DATABASE_URL!);
  const data = await sql`SELECT * FROM items`;
  return data;
}

export async function POST(request: Request) {
  const name = (await request.json()).item.name;
  const data = await createItem(name);
  return Response.json(data);
}

export async function GET() {
  const data = await getItems();
  return Response.json(data);
}
