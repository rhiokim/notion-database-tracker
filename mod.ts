/**
 * https://deno.land/x/notion_sdk@v0.4.4
 */
import { Client, APIErrorCode } from "https://deno.land/x/notion_sdk/src/mod.ts";

const notion = new Client({
  auth: Deno.env.get("NOTION_TOKEN"),
})

try {
  const dbId = Deno.env.get("NOTION_DATABASE_ID")
  if (!dbId) {
    throw Error('NO NOTION DATABASE ENVIRONMENT ID')
  }

  const page = await notion.databases.query({
    database_id: dbId,
  })
} catch(error) {
  if (error.code === APIErrorCode.ObjectNotFound) {

  } else {
    console.error(error)
  }
}
