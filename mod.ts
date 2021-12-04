import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import getLastestNotionDatabaseChanges from "./get-lastest-notion-changes.ts";

async function handler(_req: Request) {
  const dbId = Deno.env.get("NOTION_DATABASE_ID");

  if (!dbId) {
    throw Error("NO NOTION DATABASE ENVIRONMENT ID");
  }

  const [diff, all] = await getLastestNotionDatabaseChanges(dbId);

  const response = new Response(JSON.stringify({ all, diff }), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });

  return response;
}

serve(handler);
