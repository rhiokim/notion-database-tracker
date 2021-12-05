/**
 * https://deno.land/x/notion_sdk@v0.4.4
 */
import {
  APIErrorCode,
  Client,
} from "https://deno.land/x/notion_sdk/src/mod.ts";

const notion = new Client({
  auth: Deno.env.get("NOTION_TOKEN"),
});

export default async function (dbId: string) {
  try {
    const { results } = await notion.databases.query({
      database_id: dbId,
    });

    /**
     * To diff with deep object
     */
    const indexedPages = results.reduce((accu, p) => ({
      ...accu,
      [p.id]: p,
    }), {});

    return { result: indexedPages, raw: results };
  } catch (error) {
    if (error.code === APIErrorCode.ObjectNotFound) {
      console.error(error);
    } else {
      console.error(error);
    }

    return {};
  }
}
