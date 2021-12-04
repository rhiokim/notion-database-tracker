/**
 * https://deno.land/x/notion_sdk@v0.4.4
 */
import {
  APIErrorCode,
  Client,
} from "https://deno.land/x/notion_sdk/src/mod.ts";
import { updatedDiff } from 'https://esm.sh/deep-object-diff'


const notion = new Client({
  auth: Deno.env.get("NOTION_TOKEN"),
});

/**
 * How to unwrap type of Promise<T>?
 * https://stackoverflow.com/questions/48011353/how-to-unwrap-the-type-of-a-promise */
type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
// let snapshot: Awaited<ReturnType<typeof notion.databases.query>>['results'] = []
let snapshot: {
  [key: string] : Awaited<ReturnType<typeof notion.databases.query>>['results'][0]
} = {
}

try {
  const dbId = Deno.env.get("NOTION_DATABASE_ID");
  if (!dbId) {
    throw Error("NO NOTION DATABASE ENVIRONMENT ID");
  }

  const { results, next_cursor } = await notion.databases.query({
    database_id: dbId,
  });

  const indexedPages = results.reduce((accu, p) => ({
    ...accu,
    [p.id]: p
  }), {})
  // const diff = updatedDiff(snapshot, results)
  const diff = updatedDiff(snapshot, indexedPages)
  console.log('diff:',diff)
  console.log('result:', indexedPages)

  snapshot = indexedPages

} catch (error) {
  if (error.code === APIErrorCode.ObjectNotFound) {
    console.log(error)
  } else {
    console.error(error);
  }
}
