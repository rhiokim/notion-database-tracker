import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
/**
 * How to use npm package in Deno? under
 * https://deno.land/manual@v1.15.3/npm_nodejs/cdns
 */
import { detailedDiff } from "https://cdn.skypack.dev/deep-object-diff@v1.1.0";
import getNotionDatabase from "./get-notion-database.ts";
import client, { NotionSnapshotRow } from "./pool.ts";

const dbId = Deno.env.get("NOTION_DATABASE_ID");
// const table = Deno.env.get('DATABASE_TABLE');

async function handler(_req: Request) {

  if (!dbId) {
    throw Error("NO NOTION DATABASE ENVIRONMENT ID");
  }

  try {
    await client.connect();
    const results = await client.queryObject<NotionSnapshotRow>`
          SELECT * FROM notion WHERE id = ${dbId}
        `;

    /** fetch notion database */
    const { result, raw } = await getNotionDatabase(dbId);
    const diff = detailedDiff(results.rows[0]?.raw || {}, result);

    /** save latest notion database into postgres */
    await client.queryObject`
      UPDATE notion SET diff=${JSON.stringify(diff)}, raw=${
      JSON.stringify(result)
    }, last_updated_at=current_timestamp WHERE id = ${dbId}
    `;
    client.end();

    /**
     * The JSON spec does not allow undefined values, but does allow null values.
     * https://stackoverflow.com/a/32179927/2689389
     */
    const response = new Response(
      JSON.stringify({ raw, ...diff }, function (_, v) {
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
  } catch (error) {
    console.error(error);
    return new Response(undefined, { status: 204 });
  }
}

serve(handler);
