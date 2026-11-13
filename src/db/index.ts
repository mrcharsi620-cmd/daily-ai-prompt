import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, type PoolClient } from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool({
    connectionString: databaseUrl,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

const CREATE_SQL = `
CREATE TABLE IF NOT EXISTS articles (
  id serial PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  prompt text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'General',
  meta_description text NOT NULL DEFAULT '',
  cover_image text NOT NULL DEFAULT '',
  reading_minutes integer NOT NULL DEFAULT 1,
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
`;

let schemaReady: Promise<void> | null = null;

const originalConnect = pool.connect.bind(pool);

pool.connect = (async (...args: unknown[]) => {
  if (typeof args[0] === "function") {
    return originalConnect(
      args[0] as (err: Error, client: PoolClient, done: (release?: unknown) => void) => void,
    );
  }

  const client = await originalConnect();
  if (!schemaReady) {
    schemaReady = client
      .query(CREATE_SQL)
      .then(() => undefined)
      .catch((error: unknown) => {
        schemaReady = null;
        throw error;
      });
  }

  try {
    await schemaReady;
  } catch (error) {
    client.release();
    throw error;
  }

  return client;
}) as typeof pool.connect;

export const db = drizzle(pool);
