import { Client } from "https://deno.land/x/postgres@v0.14.0/mod.ts";
import type { Snapshot } from "./get-notion-database.ts";

export type NotionSnapshotRow = {
  id: number;
  diff: { added: any; deleted: any; updated: any };
  raw: Snapshot;
  last_updated_at: string;
};

/**
 * postgres://postgres:[PASSWORD]@db.[YOUR_SUPABASE_PROJECT_UUID].supabase.co:5432/postgres?sslmode=disable
 * https://deno-postgres.com/#/?id=password-encoding
 */
const databaseUrl = Deno.env.get("POSTGRES_DATABASE_URL")!;
const client = new Client(databaseUrl);
const dbId = Deno.env.get("NOTION_DATABASE_ID");
const table = Deno.env.get('DATABASE_TABLE');

// Connect to the database
await client.connect();

try {
  // Create the table
  await client.queryObject`
    CREATE TABLE IF NOT EXISTS ${table} (
      id uuid DEFAULT uuid_generate_v4(),
      diff json NOT NULL,
      raw json NOT NULL,
      last_updated_at TIMESTAMP NOT NULL
    )
  `;

  await client.queryObject`
    INSERT INTO ${table} (id, diff, raw, last_updated_at) VALUES (${dbId}, '{}', '{}', current_timestamp)
  `;
} finally {
  // Release the connection back into the pool
  await client.end();
}

export default client;
