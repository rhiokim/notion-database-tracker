/**
 * How to use npm package in Deno? under
 * https://deno.land/manual@v1.15.3/npm_nodejs/cdns
 */
import { detailedDiff } from "https://cdn.skypack.dev/deep-object-diff@v1.1.0";
import getNotionDatabase from "./get-notion-database.ts";

/**
 * How to unwrap type of Promise<T> with Deno v4.x below?
 * https://stackoverflow.com/questions/48011353/how-to-unwrap-the-type-of-a-promise */
type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export default async function getLatestNotionDatabaseChanges(dbId: string) {
  /**
   * How to manage small persistent data in Deno
   * https://deno.land/manual@v1.15.1/runtime/web_storage_api
   *
   const snapshot: {
     [key: string]: Awaited<
       ReturnType<typeof notion.databases.query>
     >["results"][0];
   } = JSON.parse(localStorage.getItem("snapshot") || "{}");
   */

  try {
    const { result, raw } = await getNotionDatabase(dbId);
    const diff = detailedDiff({}, result);

    /**
     * Save latest changes
     * https://github.com/denoland/deploy_feedback/issues/110#issuecomment-945320356
     *
     * localStorage.setItem("snapshot", JSON.stringify(indexedPages || {}));
     */

    return { ...diff, raw };
  } catch (error) {
    console.error(error);
    return {};
  }
}
