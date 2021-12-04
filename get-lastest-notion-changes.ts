/**
 * https://deno.land/x/notion_sdk@v0.4.4
 */
import {
  APIErrorCode,
  Client,
} from "https://deno.land/x/notion_sdk/src/mod.ts";
/**
 * How to use npm package in Deno?
 * https://deno.land/manual@v1.15.3/npm_nodejs/cdns
 */
import {
  addedDiff,
  deletedDiff,
  updatedDiff,
} from "https://esm.sh/deep-object-diff";

const notion = new Client({
  auth: Deno.env.get("NOTION_TOKEN"),
});

/**
 * How to unwrap type of Promise<T>?
 * https://stackoverflow.com/questions/48011353/how-to-unwrap-the-type-of-a-promise */
type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export default async function getLastestNotionDatabaseChanges(dbId: string) {
  /**
   * How to manage small persistent data in Deno
   * https://deno.land/manual@v1.15.1/runtime/web_storage_api
   */
  const snapshot: {
    [key: string]: Awaited<
      ReturnType<typeof notion.databases.query>
    >["results"][0];
  } = JSON.parse(localStorage.getItem("snapshot") || "{}");

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

    const added = addedDiff(snapshot, indexedPages);
    const updated = updatedDiff(snapshot, indexedPages);
    const deleted = deletedDiff(snapshot, indexedPages);

    /** Save lastest changes */
    localStorage.setItem("snapshot", JSON.stringify(indexedPages || {}));

    return { added, updated, deleted, results };

    // snapshot = indexedPages
  } catch (error) {
    if (error.code === APIErrorCode.ObjectNotFound) {
      console.error(error);
    } else {
      console.error(error);
    }

    return {};
  }
}
