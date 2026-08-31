import { neon } from "@neondatabase/serverless";
import crypto from "node:crypto";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  featured: boolean;
  inStock: boolean;
  createdAt: number;
};

function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) throw new Error("DATABASE_URL is not set. Add a Postgres database in your Vercel project.");
  return neon(url, { fetchOptions: { cache: "no-store" } });
}

let ensured = false;
async function ensureTable() {
  if (ensured) return;
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price NUMERIC NOT NULL,
      category TEXT NOT NULL,
      image TEXT NOT NULL,
      featured BOOLEAN NOT NULL DEFAULT false,
      in_stock BOOLEAN NOT NULL DEFAULT true,
      created_at BIGINT NOT NULL
    )
  `;
  ensured = true;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    category: row.category,
    image: row.image,
    featured: row.featured,
    inStock: row.in_stock,
    createdAt: Number(row.created_at),
  };
}

export async function listProducts(): Promise<Product[]> {
  await ensureTable();
  const sql = getSql();
  const rows = await sql`SELECT * FROM products ORDER BY created_at DESC`;
  return rows.map(toProduct);
}

export async function getProduct(id: string): Promise<Product | undefined> {
  await ensureTable();
  const sql = getSql();
  const rows = await sql`SELECT * FROM products WHERE id = ${id}`;
  return rows[0] ? toProduct(rows[0]) : undefined;
}

export async function getProductImage(id: string): Promise<string | undefined> {
  await ensureTable();
  const sql = getSql();
  const rows = await sql`SELECT image FROM products WHERE id = ${id}`;
  return rows[0]?.image;
}

/** Swaps the heavy base64 image payload for a lightweight, cacheable URL. */
export function toPublicProduct(p: Product): Product {
  return { ...p, image: `/api/images/${p.id}` };
}

export async function createProduct(input: Omit<Product, "id" | "createdAt">): Promise<Product> {
  await ensureTable();
  const sql = getSql();
  const id = crypto.randomUUID();
  const createdAt = Date.now();
  await sql`
    INSERT INTO products (id, name, description, price, category, image, featured, in_stock, created_at)
    VALUES (${id}, ${input.name}, ${input.description}, ${input.price}, ${input.category}, ${input.image}, ${input.featured}, ${input.inStock}, ${createdAt})
  `;
  return { ...input, id, createdAt };
}

export async function updateProduct(
  id: string,
  patch: Partial<Omit<Product, "id" | "createdAt">>
): Promise<Product | undefined> {
  await ensureTable();
  const existing = await getProduct(id);
  if (!existing) return undefined;

  const merged = { ...existing, ...patch };
  const sql = getSql();
  await sql`
    UPDATE products
    SET name = ${merged.name}, description = ${merged.description}, price = ${merged.price},
        category = ${merged.category}, image = ${merged.image}, featured = ${merged.featured},
        in_stock = ${merged.inStock}
    WHERE id = ${id}
  `;
  return merged;
}

export async function deleteProduct(id: string): Promise<boolean> {
  await ensureTable();
  const sql = getSql();
  const rows = await sql`DELETE FROM products WHERE id = ${id} RETURNING id`;
  return rows.length > 0;
}
