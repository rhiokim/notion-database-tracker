import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import getLastestNotionDatabaseChanges from "./get-lastest-notion-changes.ts";

async function handler(_req: Request) {
  const dbId = Deno.env.get("NOTION_DATABASE_ID");

  if (!dbId) {
    throw Error("NO NOTION DATABASE ENVIRONMENT ID");
  }

  const { added, updated, deleted, results } =
    await getLastestNotionDatabaseChanges(dbId);

  /**
   * The JSON spec does not allow undefined values, but does allow null values.
   * https://stackoverflow.com/a/32179927/2689389
   */
  const response = new Response(
    JSON.stringify({ all: results, added, updated, deleted }, function (k, v) {
      return v === undefined ? null : v;
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    },
  );

  return response;
}

serve(handler);
