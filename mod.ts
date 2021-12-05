import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import getLatestNotionDatabaseChanges from "./get-latest-notion-changes.ts";

async function handler(_req: Request) {
  const dbId = Deno.env.get("NOTION_DATABASE_ID");

  if (!dbId) {
    throw Error("NO NOTION DATABASE ENVIRONMENT ID");
  }

  const { added, updated, deleted, raw } =
    await getLatestNotionDatabaseChanges(dbId);

  /**
   * The JSON spec does not allow undefined values, but does allow null values.
   * https://stackoverflow.com/a/32179927/2689389
   */
  const response = new Response(
    JSON.stringify({ raw, added, updated, deleted }, function (_, v) {
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
